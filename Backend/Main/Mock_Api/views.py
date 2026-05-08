from django.shortcuts import render
from django.conf import settings

from .models import MockAPI, RequestAPI

from rest_framework import serializers
from rest_framework.response import Response

from .serializers import RegisterSerializer, RequestSerializer, MockSerializer

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError


# Cookie settings adapt to environment:
#   DEBUG=True  (local http://localhost) -> SameSite=Lax, Secure=False
#   DEBUG=False (production cross-domain HTTPS) -> SameSite=None, Secure=True
COOKIE_SECURE = not settings.DEBUG
COOKIE_SAMESITE = "Lax" if settings.DEBUG else "None"


class CheckAuth(APIView):
    permission_classes=[IsAuthenticated]

    def get(self, request):
        return Response({"authenticated": True})



class LoginView(TokenObtainPairView):
    permission_classes=[AllowAny]

    def post(self, request):
        response = super().post(request)

        if response.status_code == 200:
            access_token = response.data.get("access")
            refresh_token = response.data.get("refresh")

            # use SameSite=None (and Secure in prod) so cookies are visible to cross-site frontend
            response.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=COOKIE_SECURE,
                samesite=COOKIE_SAMESITE,
                max_age=60 * 5,
            )

            response.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=COOKIE_SECURE,
                samesite=COOKIE_SAMESITE,
                max_age=60 * 60 * 24 * 7,
            )

            response.data = ({"message": "Logged in successfully"})

        return response

    
class LogOut(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            refresh = request.COOKIES.get("refresh_token")

            if refresh:
                # blacklist the refresh token if it exists
                token = RefreshToken(refresh)
                token.blacklist()

            response = Response({"message": "Logged out"}, status=status.HTTP_200_OK)
            

            response.delete_cookie("access_token", path="/")
            response.delete_cookie("refresh_token", path="/")


            return response

        except Exception as e:
            # on error, still clear cookies and return the error message
            response = Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
            response.delete_cookie("access_token")
            response.delete_cookie("refresh_token")
            return response





class Register(APIView):
    permission_classes=[AllowAny]
    
    def post(self, request):
        data = request.data

        serializer = RegisterSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)




class RefreshCookie(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response({"error": "No refresh token"}, status=401)

        try:
            refresh = RefreshToken(refresh_token)
            
            response = Response({"message": "Refreshed"}, status=200)

            
            response.set_cookie(
                key="access_token",
                value=str(refresh.access_token),
                httponly=True, secure=COOKIE_SECURE, samesite=COOKIE_SAMESITE
            )


            response.set_cookie(
                key="refresh_token",
                value=str(refresh), 
                httponly=True, secure=COOKIE_SECURE, samesite=COOKIE_SAMESITE,
                max_age=24 * 60 * 60 
            )

            return response

        except TokenError:
            return Response({"error": "Invalid/Expired refresh token"}, status=401)




class Mock(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        data = request.data

        print(data)

        serializer = MockSerializer(data=data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class Request(APIView):

    permission_classes=[AllowAny]
    
    def handle_request(self, request, endpoint_id, *args, **kwargs):
        try:
            mock = MockAPI.objects.get(endpoint_id=endpoint_id, 
                                       method=request.method)
            
        except MockAPI.DoesNotExist:
            return Response({"error":"In_valid url"}, status=status.HTTP_400_BAD_REQUEST)

        RequestAPI.objects.create(user=mock.user, 
                                  endpoint=mock, 
                                  method=request.method, 
                                  status=mock.status_code, 
                                  headers=dict(request.headers.items()),
                                  body=request.data)

        response = Response(mock.response_body, status=mock.status_code)

        if isinstance(mock.headers, dict):
            for key, value in mock.headers.items():
                response[key] = value

        return response

    
    def get(self, request, endpoint_id):
        return self.handle_request(request, endpoint_id)

    def post(self, request, endpoint_id):
        return self.handle_request(request, endpoint_id)

    def put(self, request, endpoint_id):
        return self.handle_request(request, endpoint_id)

    def patch(self, request, endpoint_id):
        return self.handle_request(request, endpoint_id)

    def delete(self, request, endpoint_id):
        return self.handle_request(request, endpoint_id)





class DashboardView(APIView):

    permission_classes=[IsAuthenticated]

    def get(self, request):
        
        total_apis = MockAPI.objects.filter(user=request.user).count()

        total_requests= RequestAPI.objects.filter(user=request.user).count()

        recent_logs=RequestAPI.objects.filter(user=request.user).order_by("-created_at")[:5]

        data=[]

        for log in recent_logs:
            data.append({
                "endpoint": log.endpoint.endpoint_id,
                "method": log.method,
                "status": log.status,
                "time": log.created_at
            })
        
        count = {
            "total_apis":total_apis,
            "total_requests": total_requests
        }

        return Response({"total_apis": total_apis, "total_requests": total_requests, "recent_logs": data})




class LogsView(APIView):

    permission_classes=[IsAuthenticated]

    def get(self, request):

        logs= RequestAPI.objects.filter(user=request.user).order_by("-created_at")

        data=[]

        for log in logs:
            data.append({
                "endpoint": log.endpoint.endpoint_id,
                "method": log.method,
                "status": log.status,
                "headers": log.headers,
                "body": log.body,
                "time": log.created_at
            })

        return Response(data)


class MyMocks(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        mocks = MockAPI.objects.filter(user=request.user)

        data = []

        for mock in mocks:
            data.append({
                "endpoint": mock.endpoint_id,
                "method": mock.method,
                "status": mock.status_code,
                "created": mock.created_at
            })

        return Response(data)

        
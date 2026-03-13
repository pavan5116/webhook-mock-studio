from django.urls import path
from .views import LoginView, LogOut, Register, RefreshCookie, CheckAuth, Mock, Request, LogsView, DashboardView, MyMocks

urlpatterns = [

    path("login/", LoginView.as_view()),
    path("logout/", LogOut.as_view()),
    path("refresh/", RefreshCookie.as_view()),
    path("register/", Register.as_view()),
    path("check/", CheckAuth.as_view()),
    path("mock/", Mock.as_view()),
    path("dashboard/", DashboardView.as_view()),
    path("logs/", LogsView.as_view()),
    path("mymocks/", MyMocks.as_view()),
    path("mock/<str:endpoint_id>/", Request.as_view()),
]
    
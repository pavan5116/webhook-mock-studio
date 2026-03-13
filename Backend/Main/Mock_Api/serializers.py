from rest_framework import serializers
from django.contrib.auth.models import User
from .models import MockAPI, RequestAPI


class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)


    class Meta:
        model=User
        fields=["id","username","email","password","confirm_password"]
        extra_kwargs={"password": {"write_only": True}}
        

    
    def validate(self, data):
        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError({"error":"passwords must be same"})
        
        return data

    
    def create(self, validated_data):
        validated_data.pop("confirm_password", None)

        user = User.objects.create_user(**validated_data)

        return user



class MockSerializer(serializers.ModelSerializer):

    class Meta:
        model=MockAPI
        fields="__all__"
        read_only_fields=["user", "created_at"]
        

class RequestSerializer(serializers.ModelSerializer):

    class Meta:
        model=RequestAPI
        fields="__all__"
        read_only_fields=["user", "created_at"]
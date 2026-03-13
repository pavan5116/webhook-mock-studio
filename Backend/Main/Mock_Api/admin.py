from django.contrib import admin
from .models import MockAPI, RequestAPI

# Register your models here.

admin.site.register(MockAPI)
admin.site.register(RequestAPI)


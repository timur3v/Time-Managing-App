from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from rest_framework import generics, viewsets, mixins, permissions
from .models import *
from .serializers import *


class UnscheduledTasksList(generics.ListAPIView):
    serializer_class = UnscheduledTasksSerializer
    queryset = UnscheduledTask.objects.all()

class MyUnscheduledTasksList(viewsets.ReadOnlyModelViewSet):
    serializer_class = UnscheduledTasksSerializer
    queryset = UnscheduledTask.objects.all()

    def get_queryset(self):
        return UnscheduledTask.objects.filter(user=self.request.user)

class UnscheduledTaskViewSet(viewsets.ModelViewSet):
    serializer_class = UnscheduledTasksSetSerializer
    queryset = UnscheduledTask.objects.all()

    def perform_create(self, serializer):
        serializer.validated_data['user'] = self.request.user
        
        return super().perform_create(serializer)

    def perform_update(self, serializer):
        return super().perform_update(serializer)

class UnscheduledTaskSetDone(viewsets.ModelViewSet):
    serializer_class = UnscheduledTasksSetDoneSerializer
    queryset = UnscheduledTask.objects.all()

    def perform_update(self, serializer):
        return super().perform_update(serializer)

class UserViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        user = User.objects.create_user(**serializer.validated_data)
        user.set_password(serializer.validated_data['password'])
        return user


# test
class Hello(View): 
    def get(self, request):
        return HttpResponse('<h1>Hello</h1>')

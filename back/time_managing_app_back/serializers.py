from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *


class UnscheduledTasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnscheduledTask
        fields = '__all__'

class UnscheduledTasksSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnscheduledTask
        fields = ["task_description", "comment", "important_flg", "done_flg"]

class UnscheduledTasksSetDoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnscheduledTask
        fields = ["done_flg"]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

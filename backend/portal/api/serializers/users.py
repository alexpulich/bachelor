from rest_framework import serializers

from portal import models


class UserSerializer(serializers.ModelSerializer):
    """User serializer"""
    class Meta:
        model = models.User
        fields = ('id', 'email', 'first_name', 'last_name')


class ShortUserSerializer(serializers.ModelSerializer):
    """Just user full name serializer"""
    class Meta:
        model = models.User
        fields = ('id', 'first_name', 'last_name')
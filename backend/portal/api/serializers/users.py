from rest_framework import serializers

from portal import models
from .utils import Base64ImageField


class UserSerializer(serializers.ModelSerializer):
    """User serializer"""

    class Meta:
        model = models.User
        fields = ('id', 'email', 'first_name', 'last_name', 'profile')


class ShortUserSerializer(serializers.ModelSerializer):
    """Just user full name serializer"""

    class Meta:
        model = models.User
        fields = ('id', 'first_name', 'last_name')


class ProfileSerializer(serializers.ModelSerializer):
    """ User profile serializer"""
    id = serializers.IntegerField(source='pk', read_only=True)
    user = serializers.ReadOnlyField(source='user.id')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.CharField(source='user.email', read_only=True)
    photo = Base64ImageField(
        max_length=None, use_url=True,
    )

    class Meta:
        model = models.Profile
        fields = ('id', 'user', 'first_name', 'last_name', 'email', 'photo', 'networks', 'description')

    def update(self, instance, validated_data):
        # retrieve the User
        user_data = validated_data.pop('user', None)
        for attr, value in user_data.items():
            setattr(instance.user, attr, value)

        # retrieve Profile
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.user.save()
        instance.save()
        return instance
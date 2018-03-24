from rest_framework import serializers

from portal import models
from .utils import Base64ImageField


class ClimbingKindSerializer(serializers.ModelSerializer):
    """Serializer for full climbing kind"""
    class Meta:
        model = models.ClimbingKind
        fields = ('id', 'name')


class ClimbingKindNameSerializer(serializers.ModelSerializer):
    """Serializer for just name of climbing kind"""
    class Meta:
        model = models.ClimbingKind
        fields = ('name',)


class ClimbingWallSerializer(serializers.ModelSerializer):
    """Serializer for full climbingwall view"""
    # kinds = ClimbingKindSerializer(many=True)
    logo = Base64ImageField(
        max_length=None, use_url=True,
    )

    class Meta:
        model = models.ClimbingWall
        # TODO добавить kinds
        fields = ('id', 'name', 'logo', 'description',
                  'address', 'website', 'kinds', 'pictures',
                  'contacts', 'networks', 'open_time', 'routes')


class ClimbingWallShortSerializer(serializers.ModelSerializer):
    """Short climbingwall serializer for list views"""
    kinds = ClimbingKindSerializer(many=True)
    logo = Base64ImageField(
        max_length=None, use_url=True,
    )

    class Meta:
        model = models.ClimbingWall
        fields = ('id', 'name', 'logo', 'kinds')


class ClimbingwallNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ClimbingWall
        fields = ('id', 'name')


class ClimbingwallPictureSerializer(serializers.ModelSerializer):
    """Full route's picture serializer"""
    image = Base64ImageField(
        max_length=None, use_url=True,
    )

    class Meta:
        model = models.ClimbingwallPicture
        fields = ('id', 'climbingwall', 'image', 'active')
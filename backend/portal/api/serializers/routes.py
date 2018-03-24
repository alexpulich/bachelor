from rest_framework import serializers

from portal import models
from portal.api.serializers import users, climbingwalls
from .utils import Base64ImageField


class RoutePictureSerializer(serializers.ModelSerializer):
    """Full route's picture serializer"""
    image = Base64ImageField(
        max_length=None, use_url=True,
    )

    class Meta:
        model = models.RoutePicture
        fields = ('id', 'route', 'image', 'active')


class RoutePictureShortSerializer(serializers.ModelSerializer):
    """Only route's picture serializer"""
    class Meta:
        model = models.RoutePicture
        fields = ('image',)


class RouteSerializer(serializers.ModelSerializer):
    # TODO: temporary read_only
    # pictures = RoutePictureShortSerializer(many=True, read_only=True)
    # author = users.ShortUserSerializer()
    # kind = climbingwalls.ClimbingKindSerializer()

    class Meta:
        model = models.Route
        fields = ('id', 'name', 'description', 'author',
                  'color', 'rank', 'climbingwall', 'grade',
                  'pictures', 'active', 'kind')


class RouteRatingSerializer(serializers.ModelSerializer):
    # TODO: temporary read_only
    author = users.ShortUserSerializer
    climbingwall = climbingwalls.ClimbingwallNameSerializer()

    class Meta:
        model = models.Route
        fields = ('id', 'name', 'author', 'color', 'rank', 'climbingwall', 'grade')

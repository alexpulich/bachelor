from rest_framework import serializers

from portal import models
from portal.api.serializers import users, climbingwalls


class RoutePictureSerializer(serializers.ModelSerializer):
    """Full route's picture serializer"""
    class Meta:
        model = models.RoutePicture
        fields = ('id', 'route', 'image')


class RoutePictureShortSerializer(serializers.ModelSerializer):
    """Only route's picture serializer"""
    class Meta:
        model = models.RoutePicture
        fields = ('image',)


class RouteSerializer(serializers.ModelSerializer):
    # TODO: temporary read_only
    pictures = RoutePictureShortSerializer(many=True, read_only=True)
    author = users.ShortUserSerializer()
    kind = climbingwalls.KindNameSerializer()

    class Meta:
        model = models.Route
        fields = ('id', 'name', 'description', 'author',
                  'color', 'rank', 'climbing_wall', 'grade',
                  'pictures', 'active', 'kind')


class RouteRatingSerializer(serializers.ModelSerializer):
    # TODO: temporary read_only
    author = users.ShortUserSerializer
    climbing_wall = climbingwalls.ClimbingwallNameSerializer()

    class Meta:
        model = models.Route
        fields = ('id', 'name', 'author', 'color', 'rank', 'climbing_wall', 'grade')
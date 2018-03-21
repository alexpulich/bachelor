from rest_framework import serializers

from portal import models


class ClimbingWallSerializer(serializers.ModelSerializer):
    """Serializer for full climbingwall view"""
    class Meta:
        model = models.ClimbingWall
        # TODO добавить kinds
        fields = ('id', 'name', 'logo', 'description',
                  'address', 'website',
                  'contacts', 'networks', 'open_time', 'routes')


class ClimbingWallShortSerializer(serializers.ModelSerializer):
    """Short climbingwall serializer for list views"""
    class Meta:
        model = models.ClimbingWall
        fields = ('id', 'name', 'logo')


class ClimbingwallNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ClimbingWall
        fields = ('id', 'name')
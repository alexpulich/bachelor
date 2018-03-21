from rest_framework import serializers

from portal import models


class KindNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ClimbingKind
        fields = ('name',)


class ClimbingWallSerializer(serializers.ModelSerializer):
    """Serializer for full climbingwall view"""
    kinds = KindNameSerializer(many=True)

    class Meta:
        model = models.ClimbingWall
        # TODO добавить kinds
        fields = ('id', 'name', 'logo', 'description',
                  'address', 'website', 'kinds',
                  'contacts', 'networks', 'open_time', 'routes')


class ClimbingWallShortSerializer(serializers.ModelSerializer):
    """Short climbingwall serializer for list views"""
    kinds = KindNameSerializer(many=True)

    class Meta:
        model = models.ClimbingWall
        fields = ('id', 'name', 'logo', 'kinds')


class ClimbingwallNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ClimbingWall
        fields = ('id', 'name')

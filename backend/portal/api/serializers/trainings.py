from rest_framework import serializers

from portal import models


class TrainingDayRouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TrainingDayRoute
        fields = ('id', 'training_day', 'route', 'attempts', 'result')


class TrainingDaySerializer(serializers.ModelSerializer):
    training_routes = TrainingDayRouteSerializer(many=True)

    class Meta:
        model = models.TrainingDay
        fields = ('id', 'user', 'start_date', 'end_date', 'comments', 'training_routes')
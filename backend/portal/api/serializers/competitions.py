from rest_framework import serializers

from portal import models


class CompetitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Competition
        fields = ('id', 'name', 'description', 'climbingwall', 'date')


class CompetitionParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CompetitionParticipant
        fields = ('id', 'competition', 'user')


class CompetitionResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CompetitionResult
        fields = ('id', 'participant', 'route', 'result')


class CompetitionResultsListSerializer(serializers.ModelSerializer):
    results = serializers.ListField(source='get_results')

    class Meta:
        model = models.Competition
        fields = ('id', 'results')
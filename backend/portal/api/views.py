from django.contrib.auth.models import User

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import detail_route, list_route

from rest_auth.views import LoginView
from rest_auth.registration.views import RegisterView

from portal import models

from portal.api.serializers import auth as auth_serializers
from portal.api.serializers import climbingwalls as climbingwalls_serializers
from portal.api.serializers import routes as routes_serializers
from portal.api.serializers import trainings as trainings_serializers
from portal.api.serializers import users as users_serializers




# class LoginViewCustom(LoginView):
#     authentication_classes = (TokenAuthentication,)


class RegisterViewCustom(RegisterView):
    authentication_classes = (TokenAuthentication,)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = users_serializers.UserSerializer

    @detail_route(methods=['get'], )
    def routes(self, request, pk=None):
        user = self.get_object()  # retrieve an object by pk provided
        routes = models.Route.objects.filter(author=user)
        routes_json = routes_serializers.RouteSerializer(routes, many=True)
        return Response(routes_json.data)


class ClimbingWallViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows climbing walls to be viewed or edited.
    """
    queryset = models.ClimbingWall.objects.all()
    serializer_class = climbingwalls_serializers.ClimbingWallSerializer

    @detail_route(methods=['get'],)
    def routes(self, request, pk=None):
        climbing_wall = self.get_object()  # retrieve an object by pk provided
        routes = models.Route.objects.filter(climbing_wall=climbing_wall, active=True)
        routes_json = routes_serializers.RouteSerializer(routes, many=True, context={'request': request})
        return Response(routes_json.data)

    @list_route(methods=['get'],)
    def short(self, request):
        queryset = models.ClimbingWall.objects.all()
        json = climbingwalls_serializers.ClimbingWallShortSerializer(queryset, many=True, context={'request': request})
        return Response(json.data)



class RouteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows routes to be viewed or edited.
    """
    queryset = models.Route.objects.filter(active=True)
    serializer_class = routes_serializers.RouteSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    '''
    @detail_route(methods=['get'], )
    def pictures(self, request, pk=None):
        route = self.get_object()  # retrieve an object by pk provided
        pictures = RoutePicture.objects.filter(route=route)
        pictures_json = RouteSerializer(pictures, many=True, context={'request': request})
        return Response(pictures_json.data)
    '''

    @list_route(methods=['get'], )
    def rating(self, request):
        routes = models.Route.objects.filter(active=True).order_by('-rank')
        routes_json = routes_serializers.RouteRatingSerializer(routes, many=True, context={'request': request})
        return Response(routes_json.data)


class RoutePictureViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows route pictures to be viewed or edited.
    """
    queryset = models.RoutePicture.objects.all()
    serializer_class = routes_serializers.RoutePictureSerializer


class TrainingDayViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows training days to be viewed or edited.
    """
    queryset = models.TrainingDay.objects.all()
    serializer_class = trainings_serializers.TrainingDaySerializer

class TrainingDayRoutesViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows training days routes to be viewed or edited.
    """
    queryset = models.TrainingDayRoute.objects.all()
    serializer_class = trainings_serializers.TrainingDayRouteSerializer

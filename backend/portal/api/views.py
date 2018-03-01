from django.contrib.auth.models import User

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import detail_route, list_route

from rest_auth.views import LoginView
from rest_auth.registration.views import RegisterView

from portal.models import ClimbingWall, Route, RoutePicture, \
    TrainingDay, TrainingDayRoute

from .serializers import UserSerializer, ClimbingWallSerializer, RouteSerializer, RoutePictureSerializer, \
    RouteRatingSerializer, TrainingDaySerializer, TrainingDayRouteSerializer


# class LoginViewCustom(LoginView):
#     authentication_classes = (TokenAuthentication,)


class RegisterViewCustom(RegisterView):
    authentication_classes = (TokenAuthentication,)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

    @detail_route(methods=['get'], )
    def routes(self, request, pk=None):
        user = self.get_object()  # retrieve an object by pk provided
        routes = Route.objects.filter(author=user)
        routes_json = RouteSerializer(routes, many=True)
        return Response(routes_json.data)


class ClimbingWallViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows climbing walls to be viewed or edited.
    """
    queryset = ClimbingWall.objects.all()
    serializer_class = ClimbingWallSerializer

    @detail_route(methods=['get'],)
    def routes(self, request, pk=None):
        climbing_wall = self.get_object()  # retrieve an object by pk provided
        routes = Route.objects.filter(climbing_wall=climbing_wall, active=True)
        routes_json = RouteSerializer(routes, many=True, context={'request': request})
        return Response(routes_json.data)


class RouteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows routes to be viewed or edited.
    """
    queryset = Route.objects.filter(active=True)
    serializer_class = RouteSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @list_route(methods=['get'], )
    def rating(self, request):
        routes = Route.objects.filter(active=True).order_by('-rank')
        routes_json = RouteRatingSerializer(routes, many=True, context={'request': request})
        return Response(routes_json.data)


class RoutePictureViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows route pictures to be viewed or edited.
    """
    queryset = RoutePicture.objects.all()
    serializer_class = RoutePictureSerializer


class TrainingDayViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows training days to be viewed or edited.
    """
    queryset = TrainingDay.objects.all()
    serializer_class = TrainingDaySerializer

class TrainingDayRoutesViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows training days routes to be viewed or edited.
    """
    queryset = TrainingDayRoute.objects.all()
    serializer_class = TrainingDayRouteSerializer

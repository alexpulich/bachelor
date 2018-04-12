from rest_framework_jwt.views import ObtainJSONWebToken
from django.conf.urls import url, include

from rest_framework import routers
from .views import UserViewSet, ClimbingWallViewSet, ClimbingwallPictureViewSet, \
    RouteViewSet, RoutePictureViewSet, TrainingDayViewSet, \
    TrainingDayRoutesViewSet, RegisterViewCustom, \
    ClimbingKindViewSet, ProfileViewSet, \
    CompetitionViewSet, CompetitionResultViewSet, CompetitionParticipantViewSet
from .serializers.auth import CustomJWTSerializer

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'climbingwalls', ClimbingWallViewSet)
router.register(r'routes', RouteViewSet)
router.register(r'routepictures', RoutePictureViewSet)
router.register(r'climbingwallpictures', ClimbingwallPictureViewSet)
router.register(r'trainingdays', TrainingDayViewSet)
router.register(r'trainingdaysroutes', TrainingDayRoutesViewSet)
router.register(r'climbingkinds', ClimbingKindViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'competitions', CompetitionViewSet)
router.register(r'competitionresults', CompetitionResultViewSet)
router.register(r'competitionparticipants', CompetitionParticipantViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^auth/', include('rest_framework.urls', namespace='rest_framework')),
    # url(r'^rest-auth/login/$', LoginViewCustom.as_view(), name='rest_login'),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/$', RegisterViewCustom.as_view(), name='rest_register'),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^api-token-auth/', ObtainJSONWebToken.as_view(serializer_class=CustomJWTSerializer)),
]
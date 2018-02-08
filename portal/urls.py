from django.conf import settings
from django.conf.urls import url, include

from rest_framework import routers

from .api import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'climbingwalls', views.ClimbingWallViewSet)
router.register(r'routes', views.RouteViewSet)
router.register(r'routepictures', views.RoutePictureViewSet)
router.register(r'trainingdays', views.TrainingDayViewSet)
router.register(r'trainingdaysroutes', views.TrainingDayRoutesViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^rest-auth/login/$', views.LoginViewCustom.as_view(), name='rest_login'),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/$', views.RegisterViewCustom.as_view(), name='rest_register'),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
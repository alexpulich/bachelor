from django.conf.urls import url, include
from .views import IndexView, ClimbingWallView

urlpatterns = [
    url(r'^api/v1/', include('portal.api.urls')),
    url(r'^climbing_wall/(?P<id>[0-9]+)/$', ClimbingWallView.as_view(), name='climbing_wall'),
    url(r'^$', IndexView.as_view(), name='index'),
]


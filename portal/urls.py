from django.conf.urls import url, include
from .views import IndexView

urlpatterns = [
    url(r'^api/v1/', include('portal.api.urls')),
    url(r'^$', IndexView.as_view()),
]


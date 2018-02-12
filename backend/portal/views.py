from django.shortcuts import render
from django.views import generic
from .models import ClimbingWall
import portal.api.views as api_views

# class IndexView(generic.ListView):
class IndexView(generic.TemplateView):
    template_name = 'portal/index.html'
    # model = ClimbingWall
    # context_object_name = 'items'


class ClimbingWallView(generic.TemplateView):
    data = api_views.ClimbingWallViewSet()
    template_name = 'portal/climbing_wall.html'
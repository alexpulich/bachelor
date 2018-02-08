from django.shortcuts import render
from django.views import generic
from .models import ClimbingWall

# class IndexView(generic.ListView):
class IndexView(generic.TemplateView):
    template_name = 'portal/index.html'
    # model = ClimbingWall
    # context_object_name = 'items'

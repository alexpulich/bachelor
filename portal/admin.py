from django.contrib import admin
from .models import ClimbingWall, Route, RoutePicture
from .models import TrainingDay, TrainingDayRoute

admin.site.register(ClimbingWall)
admin.site.register(Route)
admin.site.register(RoutePicture)
admin.site.register(TrainingDay)
admin.site.register(TrainingDayRoute)

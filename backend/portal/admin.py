from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import ClimbingWall, ClimbingKind
from .models import Route, RoutePicture
from .models import TrainingDay, TrainingDayRoute
from .models import Profile
from .models import Competition, CompetitionResult, CompetitionParticipant


class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False


class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline, )


admin.site.register(ClimbingWall)
admin.site.register(Route)
admin.site.register(RoutePicture)
admin.site.register(TrainingDay)
admin.site.register(TrainingDayRoute)
admin.site.register(ClimbingKind)
admin.site.register(Profile)
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(Competition)
admin.site.register(CompetitionResult)
admin.site.register(CompetitionParticipant)

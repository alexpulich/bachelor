from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _

from rest_framework import serializers

from allauth.account import app_settings as allauth_settings
from allauth.utils import email_address_exists
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email

from portal.models import ClimbingWall, Route, RoutePicture, TrainingDay, TrainingDayRoute


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name')


class RoutePictureSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RoutePicture
        fields = ('id', 'route', 'image')


class AuthorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name')


class RouteSerializer(serializers.HyperlinkedModelSerializer):
    # TODO: temporary read_only
    pictures = RoutePictureSerializer(many=True, read_only=True)
    author = AuthorSerializer()
    class Meta:
        model = Route
        fields = ('id', 'name', 'author', 'color', 'rank', 'climbing_wall', 'grade', 'pictures', 'active')


class ClimbingWallSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ClimbingWall
        # TODO добавить kinds
        fields = ('id', 'name', 'logo', 'description',
                'address', 'website',
                  'contacts', 'networks', 'open_time', 'routes')


class TrainingDayRouteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TrainingDayRoute
        fields = ('training_day', 'route', 'comments')


class TrainingDaySerializer(serializers.HyperlinkedModelSerializer):
    training_routes = TrainingDayRouteSerializer(many=True)

    class Meta:
        model = TrainingDay
        fields = ('id', 'user', 'start_date', 'end_date', 'comments', 'training_routes')


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField(required=allauth_settings.EMAIL_REQUIRED)
    first_name = serializers.CharField(required=True, write_only=True)
    last_name = serializers.CharField(required=True, write_only=True)
    password1 = serializers.CharField(required=True, write_only=True)
    password2 = serializers.CharField(required=True, write_only=True)

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address.")
                )
        return email

    def validate_password1(self, password):
        return get_adapter().clean_password(password)

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError(
                _("The two password fields didn't match.")
            )
        return data

    def get_cleaned_data(self):
        return {
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        setup_user_email(request, user, [])
        return user
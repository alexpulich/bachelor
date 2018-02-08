from .base import *


DEBUG = True

ALLOWED_HOSTS = ['138.68.150.219', 'climbingfor.me']

# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'bachelor',
        'USER': 'alexp',
        'PASSWORD': '89606353932',
        'HOST': 'localhost',
        'PORT': '',
    }
}

INSTALLED_APPS += (
        'debug_toolbar',
)

MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']

EMAIL_BACKEND = 'django.core.mail.backends.dummy.EmailBackend'
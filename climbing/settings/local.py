from .base import *

DEBUG = True

EMAIL_BACKEND = 'django.core.mail.backends.dummy.EmailBackend'

INSTALLED_APPS += (
        'debug_toolbar',
)

MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']
ALLOWED_HOSTS = ['*']

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

INTERNAL_IPS = ['127.0.0.1']

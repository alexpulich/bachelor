from .base import *


DEBUG = False

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

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

EMAIL_HOST = 'smtp.yandex.ru'
EMAIL_HOST_USER = 'admin@climbingfor.me'
EMAIL_HOST_PASSWORD = 'SmWkDn?Y9a5'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

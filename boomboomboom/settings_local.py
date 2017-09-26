import os
     
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '6vm$+1i*&j52%dp_4#w7uzicsvuh)_j=su=td!xy4c)s9^lyi4'
     
DEBUG = True
# ALLOWED_HOSTS = ['*']

# TEMPLATE_DEBUG = True
THUMBNAIL_DEBUG = True
     
#SESSION_COOKIE_SECURE = True
#CSRF_COOKIE_SECURE = True
#SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTOCOL', 'https')
     
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
PROJECT_PATH = os.path.join(BASE_DIR, os.pardir)
PROJECT_PATH = os.path.abspath(PROJECT_PATH)
TEMPLATE_PATH = os.path.join(BASE_DIR, 'templates')
STATIC_PATH = os.path.join(BASE_DIR, 'static')
PROJECT_ROOT = os.path.realpath(os.path.dirname(__file__))
     
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'
ADMIN_MEDIA_PREFIX = '/media/admin/'
     
STATIC_URL = '/static/'
STATIC_ROOT = "/var/www/static/"
STATICFILES_DIRS = (
   STATIC_PATH,
)
LOGIN_REDIRECT_URL='/acc/'
     
DATABASES = {
   'default': {
      'ENGINE': 'django.db.backends.sqlite3', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracl$
      'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),    # Or path to database file if using 
# The following settings are not used with sqlite3:
#        'USER': 'imc',
#        'PASSWORD': '',
#        'HOST': '',                      # Empty for localhost through domain sockets or   '127.0.0.1' $
#        'PORT': '',                      # Set to empty string for default.
    }
}
     
# SOUTH_DATABASE_ADAPTERS = {
# 'default': "south.db.mysql"
# } 

# HAYSTACK_CONNECTIONS = {
#     'default': {
#         'ENGINE': 'elasticsearch2_backend.ElasticsearchSearchEngine',
#         'URL': 'http://127.0.0.1:9200/',
#         'INDEX_NAME': 'haystack',
#     },
# }

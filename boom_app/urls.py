from django.conf.urls import url
# from django.views.generic import RedirectView

from django.views.generic.base import TemplateView
from django.views.decorators.cache import cache_page
# from boom_app import views
from boom_app.views import *
from .import views
import django.contrib.auth.views as auth_views

from django.conf import settings
from django.conf.urls import include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
	url(r'^$',(IndexView.as_view()), name='index'),
	url(r'^songs/$',(SongView.as_view()), name='songs'),
]	


if settings.DEBUG:
  urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


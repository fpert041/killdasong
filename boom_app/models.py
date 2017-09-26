from __future__ import unicode_literals
import os

from django.db import models


class Song(models.Model):
	title = models.CharField(max_length=100)
	artist = models.CharField(max_length=100)
	is_alive = models.BooleanField(default=True)
	x = models.PositiveIntegerField(default=0)
	y = models.PositiveIntegerField(default=0)
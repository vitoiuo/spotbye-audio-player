from django.db import models

from ..accounts.models import User


class Song(models.Model):
    title = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
    cover = models.URLField(max_length=200)
    file = models.FileField(null=True, blank=True)

    def to_dict_json(self):
        return {
            'id': self.id,
            'artist': self.artist,
            'cover': self.cover,
            'path': self.file.path
        }

class Playlist(models.Model):
    name = models.CharField(max_length=100)
    songs = models.ManyToManyField(Song)
    created_at = models.DateTimeField('criado em', auto_now_add=True)
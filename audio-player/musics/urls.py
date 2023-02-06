from django.urls import path

from . import views

urlpatterns = [
    path("addSong", views.add_song),
    path("listSongs", views.list_songs),
]
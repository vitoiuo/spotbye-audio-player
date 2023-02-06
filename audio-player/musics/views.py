import json

from django.http import JsonResponse

# from ..commons.django_views_utils import ajax_login_required
from .service import song_svc

# from django.views.decorators.csrf import csrf_exempt


# @csrf_exempt
# @ajax_login_required
def add_song(request):
    song = song_svc.add_song(request.POST)
    return JsonResponse(song)


# @ajax_login_required
def list_songs(request):
    songs = song_svc.list_songs()
    return JsonResponse({"songs": songs})

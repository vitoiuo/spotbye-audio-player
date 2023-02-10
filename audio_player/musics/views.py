from django.http import JsonResponse, QueryDict
from django.views.decorators.csrf import csrf_exempt

from .service import song_svc


@csrf_exempt
def add_song(request):
    song_qrdct = QueryDict("", mutable=True)
    song_qrdct.update(request.POST)
    song_qrdct.update(request.FILES)
    song = song_svc.add_song(song_qrdct)

    return JsonResponse(song)


def list_songs(request):
    songs = song_svc.list_songs()
    return JsonResponse({"songs": songs})

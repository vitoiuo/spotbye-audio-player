from ..models import Song


def add_song(new_song):
    song = Song(
        title=new_song["title"],
        artist=new_song["artist"],
        cover=new_song["cover"],
        file=new_song["file"],
    )
    song.save()
    return song.to_dict_json()


def list_songs():
    songs = Song.objects.all()

    return [song.to_dict_json() for song in songs]

import pytest
from django.core.files.uploadedfile import SimpleUploadedFile

from audio_player.musics.models import Song


@pytest.fixture
def file(db):
    music_file = SimpleUploadedFile(
        "tonylampkins.mp3", b"Tonylampkins music for a new album"
    )

    return music_file


def test_list_songs_retur_songs_listl(client, db, file):
    song = Song.objects.create(
        title="Tonylamkins e seus teclados",
        artist="Tonylamkins",
        cover="url",
        file=file,
    )

    resp = client.post("/api/musics/list_songs")
    assert resp.json() == {"songs": [song.to_dict_json()]}


def test_add_song_create_a_song(client, db, file):
    data = (
        {
            "title": "We are the djavue",
            "artist": "Tonylampkins",
            "cover": "https://www.lumitecfoto.com.br/media/catalog/product/cache/1/image/578x/9df78eab33525d08d6e5fb8d27136e95/l/a/lampada-incandescente-100w-1_1.jpg",
            "file": file,
        },
    )

    resp = client.post("/api/musics/add_song", data)
    assert resp.json() == data

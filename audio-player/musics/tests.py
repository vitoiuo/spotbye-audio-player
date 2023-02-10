import pytest
from django.core.files.uploadedfile import SimpleUploadedFile

# from musics.models import Song


@pytest.fixture
def file(db):
    music_file = SimpleUploadedFile(
        "tonylampkins.mp3", b"Tonylampkins music for a new album"
    )

    return music_file


def test_list_songs_retur_songs_listl(client, db, file):
    # content = {
    #     "title": "Tonylamkins e seus teclados",
    #     "artist": "Tonylamkins",
    #     "cover": "url",
    #     "file": file,
    # }

    # songs = Song.objects.bulk_create([content for i in range(5)])

    resp = client.post("/api/musics/list_songs")
    assert resp.status_code == 200


def test_add_song_create_a_song(client, db, file):

    resp = client.post(
        "/api/musics/add_song",
        {
            "title": "We are the djavue",
            "artist": "Tonylampkins",
            "cover": "https://www.lumitecfoto.com.br/media/catalog/product/cache/1/image/578x/9df78eab33525d08d6e5fb8d27136e95/l/a/lampada-incandescente-100w-1_1.jpg",
            "file": file,
        },
    )
    assert resp.status_code == 200

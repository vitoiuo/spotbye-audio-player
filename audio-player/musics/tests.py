from django.core.files.uploadedfile import SimpleUploadedFile

# from .models import Song


def test_list_songs_retur_songs_listl(client, db):
    # Song.ocreate(
    #     title = "Tonylamkins e seus teclados"
    #     artist = models.CharField(max_length=100)
    #     cover = models.URLField(max_length=200)
    #     file = models.FileField(null=True, blank=True)
    # )

    resp = client.post("/api/musics/list_songs")
    assert resp.status_code == 200


def test_add_song_create_a_song(client, db):
    music_file = SimpleUploadedFile(
        "tonylampkins.mp3", b"Tonylampkins music for a new album"
    )

    resp = client.post(
        "/api/musics/add_song",
        {
            "title": "We are the djavue",
            "artist": "Tonylampkins",
            "cover": "https://www.lumitecfoto.com.br/media/catalog/product/cache/1/image/578x/9df78eab33525d08d6e5fb8d27136e95/l/a/lampada-incandescente-100w-1_1.jpg",
            "file": music_file,
        },
    )
    assert resp.status_code == 200

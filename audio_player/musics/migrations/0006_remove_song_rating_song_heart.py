# Generated by Django 4.0.5 on 2023-03-23 20:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('musics', '0005_song_rating'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='song',
            name='rating',
        ),
        migrations.AddField(
            model_name='song',
            name='heart',
            field=models.BooleanField(default=False),
        ),
    ]
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    # path('explorer/', include('explorer.urls')),
    path("api/", include("audio_player.base.urls")),
    path("api/accounts/", include("audio_player.accounts.urls")),
    path("api/tasks/", include("audio_player.tasks.urls")),
    path("api/musics/", include("audio_player.musics.urls")),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

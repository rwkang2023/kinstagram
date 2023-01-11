from django.conf.urls.static import static
from django.urls import path

from kinstagram import settings
from content.views import Main, FeedUpload

urlpatterns = [
    path('', Main.as_view()),
    path('content/upload', FeedUpload.as_view()),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_URL)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
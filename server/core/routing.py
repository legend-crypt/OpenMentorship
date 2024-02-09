from django.urls import re_path

from core.consumers import *

websocket_urlpatterns = [
    re_path(r"meeting/(?P<meeting_id>\w+)/$", CallConsumer.as_asgi()),
]
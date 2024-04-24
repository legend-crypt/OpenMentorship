# """
# ASGI config for server project.

# It exposes the ASGI callable as a module-level variable named ``application``.

# For more information on this file, see
# https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
# """

# from channels.auth import AuthMiddlewareStack
# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.security.websocket import AllowedHostsOriginValidator
# from django.core.asgi import get_asgi_application

# from core.routing import websocket_urlpatterns
# import os
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
# django_asgi_app = get_asgi_application()

# application = get_asgi_application()
# application = ProtocolTypeRouter({
#     "http": django_asgi_app,
#     "websocket": AllowedHostsOriginValidator(
#     AuthMiddlewareStack(URLRouter(websocket_urlpatterns))
#     ),
# })
from django.contrib import admin
from core.models import *

# Register your models here.
admin.site.register(YelloUser)
admin.site.register(YelloUserProfile)
admin.site.register(VerificationCode)
admin.site.register(PasswordResetCode)
admin.site.register(MentorSession)
admin.site.register(Meeting)
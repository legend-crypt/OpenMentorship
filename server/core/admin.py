from django.contrib import admin
from core.models import *

# Register your models here.
admin.site.register(AccountUser)
admin.site.register(AccountUserProfile)
admin.site.register(VerificationCode)
admin.site.register(PasswordResetCode)
admin.site.register(MentorRequest)
admin.site.register(Meeting)
admin.site.register(Project)
admin.site.register(Blog)

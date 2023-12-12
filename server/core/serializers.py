from rest_framework import serializers
from core.models import *

class YelloUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = YelloUser
        fields = '__all__'
        
        
class YelloUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = YelloUserProfile
        fields = '__all__'
        
class PasswordResetSerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordResetCode
        fields = '__all__'

class VerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = VerificationCode
        fields = '__all__'
from rest_framework import serializers
from core.models import *


class YelloUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = YelloUserProfile
        fields = '__all__'

class YelloUserSerializer(serializers.ModelSerializer):
    profile = YelloUserProfileSerializer()
    class Meta:
        model = YelloUser
        fields = ['user_id', 'email', 'profile', 'created_at', 'verified', 'role']
        
        
        
class PasswordResetSerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordResetCode
        fields = '__all__'

class VerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = VerificationCode
        fields = '__all__'
        
class MentorSessionSerializer(serializers.ModelSerializer):
    # user = serializers.SerializerMethodField()
    mentor = YelloUserSerializer()
    student = YelloUserSerializer()

    class Meta:
        model = MentorSession
        fields = ['mentor_session_id', 'status', 'mentor', 'time','student', 'created_at']

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
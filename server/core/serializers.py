from rest_framework import serializers
from core.models import *


class AccountUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountUserProfile
        fields = '__all__'

class AccountUserSerializer(serializers.ModelSerializer):
    profile = AccountUserProfileSerializer()
    class Meta:
        model = AccountUser
        fields = ['user_id', 'email', 'profile', 'created_at', 'verified', 'role']
        
        
        
class PasswordResetSerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordResetCode
        fields = '__all__'

class VerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = VerificationCode
        fields = '__all__'
        
class MentorRequestSerializer(serializers.ModelSerializer):
    # user = serializers.SerializerMethodField()
    mentor = AccountUserSerializer()
    student = AccountUserSerializer()

    class Meta:
        model = MentorRequest
        fields = ['mentor_request_id', 'status', 'mentor', 'student', 'created_at']

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'

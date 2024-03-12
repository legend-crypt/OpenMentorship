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

    # def get_user(self, obj):
    #     user_role = self.context['request'].user.role  # Assuming you have a 'role' attribute in your user model
    #     if user_role == 'Mentor':
    #         user_data = AccountUserSerializer(obj.student).data
    #     elif user_role == 'Mentee':
    #         user_data = AccountUserSerializer(obj.mentor).data
    #     return {
    #         'user_id': user_data.get('user_id'),
    #         'email': user_data.get('email'),
    #         'profile': user_data.get('profile'),
    #         'created_at': user_data.get('created_at'),
    #         'verified': user_data.get('verified'),
    #         'role': user_data.get('role'),
    #     }

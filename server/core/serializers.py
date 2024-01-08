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
    user = serializers.SerializerMethodField()
    # mentor = YelloUserSerializer()
    # student = YelloUserSerializer()

    class Meta:
        model = MentorSession
        fields = ['mentor_session_id', 'status', 'user', 'time', 'created_at', 'meeting_id']

    def get_user(self, obj):
        user_role = self.context['request'].user.role  # Assuming you have a 'role' attribute in your user model
        if user_role == 'Mentor':
            user_data = YelloUserSerializer(obj.student).data
        elif user_role == 'Mentee':
            user_data = YelloUserSerializer(obj.mentor).data
        return {
            'user_id': user_data.get('user_id'),
            'email': user_data.get('email'),
            'profile': user_data.get('profile'),
            'created_at': user_data.get('created_at'),
            'verified': user_data.get('verified'),
            'role': user_data.get('role'),
        }

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
# from unittest.mock import patch
from core.models import AccountUser, VerificationCode
from core.views.accounts import AccountCreationViewSet, SignIn
from datetime import datetime, timedelta
from pytz import UTC

class AccountCreationViewSetTests(APITestCase):

    def setUp(self):
        self.create_url = reverse('accountcreation-create')
        self.send_verification_url = reverse('accountcreation-send-verification-email')
        self.verify_email_url = reverse('accountcreation-verify-email')
        self.user_data = {
            'email': 'test@example.com',
            'password': 'strong_password',
            'role': 'Mentor'
        }

    def test_create_user_success(self):
        response = self.client.post(self.create_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('detail', response.data)
        self.assertIn('user', response.data)

    def test_create_user_missing_email(self):
        data = self.user_data.copy()
        del data['email']
        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], "Please provide both email and password")

    def test_create_user_existing_email(self):
        AccountUser.objects.create_user(email=self.user_data['email'], password=self.user_data['password'])
        response = self.client.post(self.create_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_208_ALREADY_REPORTED)
        self.assertEqual(response.data['error'], "Email already exists")



class SignInTests(APITestCase):

    def setUp(self):
        self.sign_in_url = reverse('login')
        self.user = AccountUser.objects.create_user(email='test@example.com', password='strong_password', role='user')
        self.user_data = {
            'email': 'test@example.com',
            'password': 'strong_password'
        }

    def test_sign_in_success(self):
        response = self.client.post(self.sign_in_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('detail', response.data)
        self.assertIn('user', response.data)
        self.assertIn('token', response.data)

    def test_sign_in_missing_credentials(self):
        response = self.client.post(self.sign_in_url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_sign_in_invalid_credentials(self):
        response = self.client.post(self.sign_in_url, {'email': 'test@example.com', 'password': 'wrong_password'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data['error'], "Invalid credentials")

    def test_sign_in_user_not_found(self):
        response = self.client.post(self.sign_in_url, {'email': 'nonexistent@example.com', 'password': 'password'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], "User not found")
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from unittest.mock import patch
from core.models import Blog, AccountUser
from core.views.blog import BlogViewSet
from datetime import datetime
from django.utils.timezone import make_aware
from django.core.files.uploadedfile import SimpleUploadedFile
from uuid import uuid4
from django.contrib.auth import get_user_model

User = get_user_model()

class BlogViewSetTests(APITestCase):
    
    
    def setUp(self):
        self.blog_id = uuid4()
        self.list_url = reverse('blog-list')
        self.detail_url = reverse('blog-detail', args=[str(self.blog_id)])
        self.create_url = reverse('blog-create')
        self.update_url = reverse('blog-update', args=[str(self.blog_id)])
        self.user = User.objects.create_user(email='fazaniya@tinyios.com', role='Mentor', password='1234')
        self
        self.mentor_jwt_token = self.generate_jwt_token(self.user)
        self.blog = Blog.objects.create(
            blog_id=self.blog_id,
            title='Test Blog',
            content='This is a test blog.',
            author=self.user,
        )


    def generate_jwt_token(self, user):
        return RefreshToken.for_user(user).access_token

    def test_list_blogs(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('detail', response.data)
        self.assertIn('data', response.data)

    def test_retrieve_existing_blog(self):
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('detail', response.data)
        self.assertIn('data', response.data)

    def test_retrieve_nonexistent_blog(self):
        non_existent_detail_url = reverse('blog-detail', args=[str(uuid4())])  # Non-existent blog id
        response = self.client.get(non_existent_detail_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn('error', response.data)

    def test_create_blog_as_mentor(self):
        data = {
            'title': 'New Blog',
            'content': 'This is a new blog',
            'thumbnail': SimpleUploadedFile('test_image.jpg', b'content', content_type='image/jpeg')
        }
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.mentor_jwt_token}')
        response = self.client.post(self.create_url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('detail', response.data)

    def test_create_blog_as_non_mentor(self):
        data = {
            'title': 'New Blog',
            'content': 'This is a new blog',
            'thumbnail': SimpleUploadedFile('test_image.jpg', b'content', content_type='image/jpeg')
        }
        non_mentor = User.objects.create_user(email='guarami@sigmachiumass.com', role='Mentee')
        non_mentor_jwt_token = self.generate_jwt_token(non_mentor)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {non_mentor_jwt_token}')
        response = self.client.post(self.create_url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertIn('error', response.data)

    def test_update_blog_as_mentor(self):
        data = {
            'title': 'Updated Blog Title',
            'content': 'Updated content',
            'thumbnail': SimpleUploadedFile('test_image.jpg', b'content', content_type='image/jpeg')
        }
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.mentor_jwt_token}')
        response = self.client.put(self.update_url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('detail', response.data)

    def test_update_blog_as_non_mentor(self):
        data = {
            'title': 'Updated Blog Title',
            'content': 'Updated content',
            'thumbnail': SimpleUploadedFile('test_image.jpg', b'content', content_type='image/jpeg')
        }
        non_mentor = User.objects.create_user(email='vitasik@clonevnmail.com', role='Mentee')
        non_mentor_jwt_token = self.generate_jwt_token(non_mentor)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {non_mentor_jwt_token}')
        response = self.client.put(self.update_url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('error', response.data)
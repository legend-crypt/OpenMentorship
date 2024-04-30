from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from core.retrievers.blog import *
from core.senders.blog import *
from core.utils import get_user_from_jwttoken

class BlogViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    
    def list(self, request):
        """List all request"""
        blogs = get_all_blogs()
        data = get_all_blogs_information(blogs)
        context = {
            "detail": "Blogs retrieved successfully",
            'data': data
        }
        return Response(context, status=status.HTTP_200_OK)
    
    
    def retrieve(self, request, id):
        """Retrieve a blogs"""
        blog = get_blog_by_id(id)
        if blog:
            data = get_blog_information(blog)
            context = {
            "detail": "Blog retrieved successfully",
            "data": data

            }
            return Response(context, status=status.HTTP_200_OK)
        context = {
            "error": "Blog not found",
        }
        return Response(context, status=status.HTTP_404_NOT_FOUND)
    

    def create(self, request):
        """Create a blog"""
        title = request.data.get('title')
        content = request.data.get('content')
        thumnail = request.FILES.get('thumbnail')
        user = get_user_from_jwttoken(request)
        if user.role == "Mentor":
            data = {
                "title": title,
                "content": content,
                "thumbnail": thumnail,
                "author": user}
            blog = create_blog(**data)
            if blog:
                context = {
                    "detail": "Blog created successfully",
                }
                return Response(context, status=status.HTTP_201_CREATED)
            else:
                context = {
                    "error": "Something went wrong try again"
                }
                return Response(context, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        context = {
            "error": "Creator must be a mentor"
        }
        
        return Response(context, status=status.HTTP_403_FORBIDDEN)
    

    def update(self, request, id):
        """update a blog"""
        user = get_user_from_jwttoken(request)
        title = request.data.get('title')
        content = request.data.get('content')
        thumbnail = request.FILES.get('thumbnail')
        if user.role == "Mentor":
            blog = get_blog_by_id(id)
            if blog:
                data = {
                    "title": title,
                    "content": content,
                    "thumbnail": thumbnail
                }
                blog = update_blog(blog, **data)
                context = {
                    "detail": "Blog updated successfully",
                }
                return Response(context, status=status.HTTP_200_OK)
            else:
                context = {
                    "error": "Blog not found"
                }
                return Response(context, status=status.HTTP_404_NOT_FOUND)
        context = {
            "error": "User must be a mentor"
        }
        return Response(context, status=status.HTTP_401_UNAUTHORIZED)
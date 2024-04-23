from rest_framework import viewsets, status
from rest_framework.response import Response
from core.models import Project
from core.serializers import ProjectSerializer

class ProjectViewset(viewsets.ViewSet):
    
    def list(self, request):
        queryset = Project.objects.all()
        serializer = ProjectSerializer(queryset, many=True)
        return Response(serializer.data)
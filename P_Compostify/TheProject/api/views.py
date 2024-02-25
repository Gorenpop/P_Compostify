from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework import status
from .serializers import TaskSerializer
from .models import Task

@api_view(['GET'])
def hello_world(request):
    tasks = Task.objects.all()  # Obtiene todos los objetos Task
    serializer = TaskSerializer(tasks, many=True)  # Serializa los objetos
    return Response(serializer.data)  # Devuelve los datos serializados como parte de la respuesta


@api_view(['POST'])
def create_task(request):
    data = request.data
    serializer = TaskSerializer(data=data)
    try:
        serializer.is_valid(raise_exception=True)
    except ValidationError as err:
        return Response({'message': 'Invalid data', 'errors': err.detail}, status=status.HTTP_400_BAD_REQUEST)
    task = serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_task(request, pk):
    try:
        task = Task.objects.get(pk=pk)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
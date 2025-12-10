from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import FileResponse, Http404
from django.conf import settings
import os
from .models import Document
from .serializers import DocumentSerializer


@api_view(['POST'])
def upload_document(request):
    """Upload a PDF document"""
    if 'file' not in request.FILES:
        return Response(
            {'error': 'No file provided'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    file = request.FILES['file']
    
    # Validate PDF file
    if not file.name.lower().endswith('.pdf'):
        return Response(
            {'error': 'Only PDF files are allowed'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Create document instance
    document = Document(file=file)
    document.save()
    
    serializer = DocumentSerializer(document)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def list_documents(request):
    """List all documents"""
    documents = Document.objects.all()
    serializer = DocumentSerializer(documents, many=True)
    return Response(serializer.data)


@api_view(['GET', 'DELETE'])
def document_detail(request, pk):
    """Handle GET (download) and DELETE for a specific document"""
    try:
        document = Document.objects.get(pk=pk)
    except Document.DoesNotExist:
        if request.method == 'DELETE':
            return Response(
                {'error': 'Document not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        raise Http404("Document not found")
    
    if request.method == 'DELETE':
        document.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    # GET request - download file
    if not document.file:
        raise Http404("File not found")
    
    response = FileResponse(
        document.file.open('rb'),
        content_type='application/pdf'
    )
    response['Content-Disposition'] = f'attachment; filename="{document.filename}"'
    return response

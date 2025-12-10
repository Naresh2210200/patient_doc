from rest_framework import serializers
from .models import Document


class DocumentSerializer(serializers.ModelSerializer):
    """Serializer for Document model"""
    class Meta:
        model = Document
        fields = ['id', 'filename', 'uploaded_at', 'file_size']
        read_only_fields = ['id', 'uploaded_at', 'file_size']

from django.contrib import admin
from .models import Document


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ['id', 'filename', 'file_size', 'uploaded_at']
    list_filter = ['uploaded_at']
    search_fields = ['filename']
    readonly_fields = ['uploaded_at', 'file_size']

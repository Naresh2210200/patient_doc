from django.db import models
import os


def upload_path(instance, filename):
    """Generate upload path for PDF files"""
    return os.path.join('uploads', filename)


class Document(models.Model):
    """Model to store PDF document metadata"""
    file = models.FileField(upload_to=upload_path)
    filename = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    file_size = models.PositiveIntegerField(help_text="File size in bytes")

    class Meta:
        ordering = ['-uploaded_at']

    def __str__(self):
        return self.filename

    def save(self, *args, **kwargs):
        if self.file:
            self.filename = self.file.name
            self.file_size = self.file.size
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        """Override delete to remove file from disk"""
        if self.file:
            if os.path.isfile(self.file.path):
                os.remove(self.file.path)
        super().delete(*args, **kwargs)

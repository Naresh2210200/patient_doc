from django.urls import path
from . import views

urlpatterns = [
    path('upload', views.upload_document, name='upload_document'),
    path('', views.list_documents, name='list_documents'),
    path('<int:pk>', views.document_detail, name='document_detail'),
]

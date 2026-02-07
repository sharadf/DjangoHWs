from django.urls import path
from . import views

urlpatterns = [
    path('', views.note_list, name='note_list'),
    path('search/', views.search_notes, name='search_notes'),
    path('create/', views.note_create, name='note_create'),
    path('<int:pk>/', views.note_detail, name='note_detail'),
    path('<int:pk>/edit/', views.note_edit, name='note_edit'),
    path('<int:pk>/delete/', views.note_delete, name='note_delete'),
    path('tags/<slug:slug>/', views.notes_by_tag, name='notes_by_tag'),
]


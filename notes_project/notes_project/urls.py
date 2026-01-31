from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from notes import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('notes.urls')),

    # 🔐 Авторизация
    path('signup/', views.signup_view, name='signup'),
    path('login/', auth_views.LoginView.as_view(template_name='notes/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='login'), name='logout'),
]
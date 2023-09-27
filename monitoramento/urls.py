
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path, include

urlpatterns = [
    # path('login/', auth_views.LoginView.as_view(), name='login'),
   
    path('reservatorio/', include('monitoramento.reservatorio.urls')),
    path('', include('monitoramento.base.urls')),
    path('admin/', admin.site.urls),
     path('logout/', auth_views.LogoutView.as_view(), name='logout'),
]

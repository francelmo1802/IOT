from django.urls import path

from . import views as v

app_name = 'monitoramento.reservatorio'

urlpatterns = [
    path('',v.resevatorio, name = 'resevatorio')
]

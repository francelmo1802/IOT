from django.urls import path

from . import views as v

app_name = 'monitoramento.reservatorio'

urlpatterns = [
    path('',v.reservatorio, name = 'reservatorio'),
    path('liquid/', v.liquid, name = 'liquid'),
    path('linha/', v.linha, name='linha'),
]

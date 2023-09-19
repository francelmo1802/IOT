from django.urls import path
from . import views as v

app_name = 'monitoramento.base'

urlpatterns = [
    path('', v.index, name='index'),
]

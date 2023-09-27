from django.contrib import admin

from monitoramento.reservatorio.models import Reservatorio


# Register your models here.


@admin.register(Reservatorio)
class ReservatorioAdmin(admin.ModelAdmin):
    list_display = ('data','hora','name','value',)

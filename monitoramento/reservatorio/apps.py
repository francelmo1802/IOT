from django.apps import AppConfig


class ReservatorioConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'monitoramento.reservatorio'

    def ready(self):
        from .agenda import start
        start()
        
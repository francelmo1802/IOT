from django.db import models


class TimeStampsModel(models.Model):
    data = models.DateField(
        'data',
        null=True,
        blank=True,
        auto_now_add=True,
        auto_now=False,
    )
    hora = models.TimeField(
        'hora',
        null=True,
        blank=True,
        auto_now_add=True,
        auto_now=False,
    )


    def __str__(self):
        return f'{self.data.strftime("%d-%m-%Y")} - {self.hora}'

    class Meta:
        abstract = True

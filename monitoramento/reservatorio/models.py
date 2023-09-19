from django.db import models
from django.contrib.auth.models import User

from monitoramento.base.models import TimeStampsModel

class Reservatorio(TimeStampsModel):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    active = models.BooleanField('ativo', default=True)
    name = models.CharField('nome', max_length=30)
    valor = models.FloatField('valor', null=True, blank=True)

    class Meta:
        ordering = ('data', 'hora')

    def __str__(self):
        return f'{self.nome}-{self.valor:.2f}'

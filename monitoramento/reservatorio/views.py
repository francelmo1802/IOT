import random
from datetime import date, datetime
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

from monitoramento.reservatorio.models import Reservatorio

@login_required
def reservatorio(request):
    template_name = 'reservatorio.html'
    # context = {'scopo': aplication_iot.get_data_device()}
    return render(request, template_name)

# simular os dados que vem do microcontrolador
async def liquid(request):
    data = date.today()
    hora = datetime.now().strftime('%H:%M')
    num = round(random.random(), 2)
    nome = ['CASA', 'MAE']
    data = [
        {'date': data},
        {'name': nome[0]},
        {'hora': hora},
        {'valor': num}
    ]
    context = {'data': data}
    # await enviar_dados_telegram(num)
    return JsonResponse(context, safe=False)

# Traz os dados do banco de dados para Json do gráfico de linhas
def linha(request):
    lista = Reservatorio.objects.values('data', 'name', 'hora', 'value')
    data = [{
        'date': item['data'].strftime('%d/%m'),
        'name': item['name'],
        'time': item['hora'].strftime('%H:%M'),
        'value': item['value'] * 100
    }
        for item in lista
    ]
    return JsonResponse(data, safe=False)
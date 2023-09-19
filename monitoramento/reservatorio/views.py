from django.shortcuts import render
from django.contrib.auth.decorators import login_required



@login_required
def reservatorio(request):
    template_name = 'reservatorio.html'
    # context = {'scopo': aplication_iot.get_data_device()}
    return render(request, template_name)

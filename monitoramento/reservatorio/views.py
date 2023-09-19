from django.shortcuts import render



def reservatorio(request):
    template_name = 'reservatorio.html'
    return render(request, template_name)

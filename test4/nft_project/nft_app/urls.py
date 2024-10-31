from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'), # Page d'accueil
    path('student_form', views.student_info, name='student_info'),
    path('generate_nft/', views.generate_nft, name='generate_nft'),
]

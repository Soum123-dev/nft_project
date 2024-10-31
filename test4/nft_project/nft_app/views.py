from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Etudiant, NFT

# Page d'accueil
def home(request): return render(request, 'home.html')

# Vue pour afficher le formulaire de l'étudiant
def student_info(request):
    if request.method == 'POST':
        # Traiter les données du formulaire de l'étudiant
        # Sauvegarder les données ou faire d'autres traitements ici
        return redirect('generate_nft')  # Redirige vers la page de génération de NFT
    return render(request, 'student_form.html')

# Vue pour générer le NFT
def generate_nft(request):
    if request.method == 'POST':
        # Traiter les données pour générer le NFT
        # Logique pour générer le NFT
        return render(request, 'generate_nft.html')  # Afficher la page de génération de NFT
    return HttpResponse("Erreur lors de la génération du NFT.")

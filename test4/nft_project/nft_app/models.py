from django.db import models

# Modèle pour l'étudiant
class Etudiant(models.Model):
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    numero_ine = models.CharField(max_length=15, unique=True)

    def __str__(self):
        return f"{self.nom} {self.prenom}"

# Modèle pour le NFT
class NFT(models.Model):
    etudiant = models.ForeignKey(Etudiant, on_delete=models.CASCADE)
    token_id = models.CharField(max_length=100, unique=True)
    date_emission = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"NFT {self.token_id} - {self.etudiant.nom}"

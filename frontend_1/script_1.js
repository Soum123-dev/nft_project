// Écouter la soumission du formulaire pour l'INE
document.getElementById('ine-form').addEventListener('submit', async function(event) {
    event.preventDefault();  // Empêcher le comportement par défaut de la soumission du formulaire
  
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = true;  // Désactiver le bouton d'envoi pour éviter les soumissions multiples
  
    // Récupérer les données du formulaire
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Vérification du format du numéro INE : il doit commencer par "N" ou "n" suivi de chiffres
    if (!/^N\d+$/i.test(data['ineNumber'])) {
        alert('Le numéro INE doit commencer par la lettre "N" ou "n" suivie de chiffres.');
        submitButton.disabled = false;  // Réactiver le bouton d'envoi
        return;  // Arrêter l'exécution du code
    }
  
    try {
        // Envoi des données au backend pour vérification via une requête POST
        const response = await fetch('/api/verifyStudentInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)  // Convertir les données en JSON pour les envoyer au serveur
        });
  
        if (response.ok) {
            const responseData = await response.json();  // Extraire la réponse JSON du serveur
            alert(responseData.message);  // Afficher le message de succès retourné par le backend
            
            // Afficher le second formulaire après la vérification réussie de l'INE
            document.getElementById('ine-form').style.display = 'none';
            document.getElementById('verification-form').style.display = 'block';
        } else {
            // Gérer les erreurs renvoyées par le serveur
            alert('Une erreur est survenue lors de la soumission.');
            console.error('Erreur de réponse du serveur:', await response.text());
        }
    } catch (error) {
        // Gérer les erreurs réseau ou autres problèmes non liés à la réponse du serveur
        console.error('Erreur:', error);
        alert('Une erreur s\'est produite lors de la soumission.');
    } finally {
        submitButton.disabled = false;  // Réactiver le bouton d'envoi après le traitement
    }
});

// Gestion de la soumission du second formulaire
document.getElementById('verification-form').addEventListener('submit', async function(event) {
    event.preventDefault();  // Empêcher la soumission par défaut du formulaire

    const submitButton = document.querySelector('#verification-form button[type="submit"]');
    submitButton.disabled = true;  // Désactiver le bouton d'envoi pour éviter les soumissions multiples

    // Récupérer les données du formulaire
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        // Envoi des données au backend pour générer le NFT via une requête POST
        const response = await fetch('/generate-nft', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)  // Convertir les données en JSON pour les envoyer au serveur
        });

        if (response.ok) {
            const responseData = await response.json();  // Extraire la réponse JSON du serveur
            alert('NFT généré avec succès. Un email de confirmation vous a été envoyé.');
            // Réinitialiser les formulaires ou rediriger si nécessaire
        } else {
            // Gérer les erreurs renvoyées par le serveur
            alert('Une erreur est survenue lors de la génération du NFT.');
            console.error('Erreur de réponse du serveur:', await response.text());
        }
    } catch (error) {
        // Gérer les erreurs réseau ou autres problèmes non liés à la réponse du serveur
        console.error('Erreur:', error);
        alert('Une erreur s\'est produite lors de la génération du NFT.');
    } finally {
        submitButton.disabled = false;  // Réactiver le bouton d'envoi après le traitement
    }
});

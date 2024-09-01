
// Cette fonction sera appelée lorsque le QR code est scanné avec succès
async function onScanSuccess(decodedText, decodedResult) {
    document.getElementById(`Code QR scanné: ${decodedText}`);

    try {
        // On suppose que le decodedText est une URL
        const response = await fetch(decodedText);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données du QR code');
        }

        const qrData = await response.json();

        // Récupérer les informations saisies par l'utilisateur
        const formData = new FormData(document.getElementById('ine-form'));
        const data = Object.fromEntries(formData.entries());

        // Vérifier que les informations correspondent
        if (data['student-name'] === qrData.name &&
            data['date-de-naissance'] === qrData.birthDate &&
            data['ineNumber'] === qrData.ineNumber &&
            data['annee'] === qrData.academicYear) {

            alert('Les informations sont correctes !');

            // Afficher le deuxième formulaire
            document.getElementById('second-form').style.display = 'block';
        } else {
            alert('Les informations ne correspondent pas. Veuillez réessayer.');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur s\'est produite lors du traitement.');
    }
}

// Cette fonction sera appelée en cas d'échec du scan
function onScanFailure(error) {
    console.warn(`Échec du scan: ${error}`);
}

// Appeler cette fonction pour démarrer le scanner lorsque la page est chargée
document.addEventListener("DOMContentLoaded", function() {
    startQrScanner();
});

// Ajout de l'événement pour la soumission du formulaire INE
document.getElementById('ine-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Veuillez scanner le code QR de la carte etudiant pour continuer.");
});

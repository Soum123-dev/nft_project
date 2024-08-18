// Initialisation de QuaggaJS
Quagga.init({
    inputStream: {
        type: "live",
        target: document.querySelector('#video')
    },
    decoder: {
        readers: ["code_128_reader"]
    }
}, function(err) {
    if (err) {
        console.error(err);
        return;
    }
    Quagga.start();
});

// Événement déclenché lorsqu'un code QR est détecté
Quagga.onDetected(function(result) {
    // Extraire les données du QR code (exemple : JSON)
    const data = JSON.parse(result.codeResult.code);

    // Validation basique des données (ajoutez vos propres règles de validation)
    if (!data.nom || !data.ine) {
        alert('Données du QR code incomplètes');
        return;
    }

    // ... (votre code QuaggaJS existant)

// Sélectionner le premier formulaire et le deuxième formulaire
const premierFormulaire = document.getElementById('ine-form');
const secondFormulaire = document.getElementById('verification-form');

// Écouter l'événement de soumission du premier formulaire
premierFormulaire.addEventListener('submit', (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les données du formulaire (à adapter en fonction de votre structure)
    const nom = document.getElementById('student-name').value;
    const ine = document.getElementById('ine-number').value;
    // ...

    // Validation des données (à adapter en fonction de vos besoins)
    if (!nom || !ine) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
    }

    // Envoyer les données au serveur pour vérification (si nécessaire)
    // ...

    // Si les données sont valides (simuler ici pour l'exemple)
    if (true) { // Remplacer par votre logique de validation
        // Afficher le deuxième formulaire et masquer le premier
        secondFormulaire.style.display = 'block';
        premierFormulaire.style.display = 'none';
    } else {
        alert('Les données sont invalides');
    }
});

    // Envoyer les données au backend (avec protection CSRF, à adapter)
    fetch('/verifier', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken // Remplacer par votre token CSRF
        },
        body: JSON.stringify({
            formData: data
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.valide) {
            // Afficher le deuxième formulaire et un message de succès
            document.getElementById('verification-form').style.display = 'block';
            document.getElementById('result').innerHTML = 'Informations valides !';
        } else {
            // Afficher un message d'erreur
            document.getElementById('result').innerHTML = 'Erreur : Les informations ne sont pas valides.';
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        document.getElementById('result').innerHTML = 'Une erreur s\'est produite.';
    });
});
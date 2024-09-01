window.addEventListener('load', function() {
    const qrReader = new Html5Qrcode("qr-reader");

    // Démarrer le scanner QR code
    qrReader.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: { width: 250, height: 250 }
        },
        onScanSuccess,
        onScanError
    );

    function onScanSuccess(decodedText, decodedResult) {
        console.log(`QR Code Scanné: ${decodedText}`);
        
        // Vérifiez si l'URL scannée commence par "https://"
        if (!decodedText.startsWith('https://')) {
            alert('Le QR code scanné ne contient pas une URL valide.');
            return;
        }

        // Ouvrir l'URL et récupérer les données
        fetch(decodedText)
            .then(response => response.json())
            .then(data => {
                // Vérifier les informations du formulaire avec les données récupérées
                const studentName = document.getElementById('student-name').value;
                const ineNumber = document.getElementById('ine-number').value;
                const birthDate = document.getElementById('birth-date').value;
                const academicYear = document.getElementById('academic-year').value;

                if (studentName === data.name &&
                    ineNumber === data.ine &&
                    birthDate === data.birthDate &&
                    academicYear === data.academicYear) {
                    alert('Les informations sont correctes. Veuillez remplir le deuxième formulaire.');
                    // Afficher le deuxième formulaire ici
                } else {
                    alert('Les informations ne correspondent pas. Veuillez réessayer.');
                }
            })
            .catch(error => {
                console.error('Erreur:', error);
                alert('Une erreur s\'est produite lors du traitement.');
            });
    }

    function onScanError(error) {
        console.warn(`Erreur de scan: ${error}`);
    }

    document.getElementById('student-form').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Formulaire soumis avec succès.');
        // Logique pour soumettre le formulaire
    });
});
window.addEventListener('load', function() {
    // Initialisation du lecteur de QR Code
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        console.log(`QR Code décodé: ${decodedText}`);
        // Supposons que le texte QR soit un JSON avec les infos {name: "Nom", ine: "NXXXXXX"}
        const qrData = JSON.parse(decodedText);
        const studentNameInput = document.getElementById('student-name').value;
        const ineNumberInput = document.getElementById('ine-number').value;

        // Comparer les données extraites avec les informations saisies
        if (qrData.name === studentNameInput && qrData.ine === ineNumberInput) {
            alert('Informations vérifiées avec succès.');
            document.getElementById('second-form').style.display = 'block';
            document.getElementById('submit-button').disabled = false;
        } else {
            alert('Les informations ne correspondent pas. Veuillez réessayer.');
        }
    };

    const qrCodeErrorCallback = (errorMessage) => {
        // Erreur lors de la lecture du QR Code
        console.error(`Erreur QR Code: ${errorMessage}`);
    };

    const qrCodeScanner = new Html5Qrcode("qr-reader");
    qrCodeScanner.start({ facingMode: "environment" }, {
        fps: 10,    // fréquence d'images par seconde pour le scan
        qrbox: { width: 250, height: 250 }  // taille de la boîte de scan
    }, qrCodeSuccessCallback, qrCodeErrorCallback);
});

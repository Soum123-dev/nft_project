 // Initialiser le scanner de code QR
 var html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
 html5QrcodeScanner.render(onScanSuccess);

 // Fonction appelée lors de la réussite du scan du QR code
 function onScanSuccess(decodedText) {
     console.log(`Code QR scanné: ${decodedText}`);
     alert('Les informations sont correctes !');
     document.getElementById('studentNFT-form').style.display = 'block';
 }

 // Fonction pour soumettre le formulaire principal
 document.getElementById('submit-button').addEventListener('click', function () {
     document.getElementById('studentNFT-form').style.display = 'block';
 });
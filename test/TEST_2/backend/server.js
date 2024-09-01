const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors()); // Activer CORS pour permettre les requêtes provenant d'autres domaines

// Middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint pour la vérification des informations scannées
app.post('/api/verify', (req, res) => {
    const { name, birthDate, ineNumber, academicYear } = req.body;

    // Simuler la récupération des informations depuis le QR code
    const qrData = {
        name: 'John Doe',
        birthDate: '1999-01-01',
        ineNumber: 'N123456789',
        academicYear: '2023-2024'
    };

    // Vérification des données
    if (name === qrData.name &&
        birthDate === qrData.birthDate &&
        ineNumber === qrData.ineNumber &&
        academicYear === qrData.academicYear) {
        return res.json({ success: true, message: 'Les informations sont correctes.' });
    } else {
        return res.json({ success: false, message: 'Les informations ne correspondent pas.' });
    }
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Le serveur tourne sur http://localhost:${PORT}`);
});

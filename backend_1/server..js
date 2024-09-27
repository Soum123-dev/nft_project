const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Route pour traiter le formulaire et vérifier les données scannées
app.post('/verify-student', async (req, res) => {
    const { studentName, ineNumber, dateOfBirth, academicYear, qrUrl } = req.body;

    try {
        // Récupérer les informations à partir de l'URL contenue dans le QR code
        const qrResponse = await axios.get(qrUrl);
        const qrData = qrResponse.data;

        // Vérification des données du formulaire contre celles du QR code
        if (
            studentName === qrData.name &&
            ineNumber === qrData.ineNumber &&
            dateOfBirth === qrData.birthDate &&
            academicYear === qrData.academicYear
        ) {
            return res.json({ success: true, message: "Les informations correspondent." });
        } else {
            return res.json({ success: false, message: "Les informations ne correspondent pas." });
        }
    } catch (error) {
        console.error("Erreur lors de la vérification:", error);
        return res.status(500).json({ success: false, message: "Erreur lors de la vérification." });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Configuration du transporteur d'emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation des données
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'Tous les champs sont requis' });
        }

        // Configuration de l'email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // L'email où vous voulez recevoir les messages
            subject: `Nouveau message de contact: ${subject}`,
            html: `
                <h3>Nouveau message de contact</h3>
                <p><strong>Nom:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Sujet:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };

        // Envoi de l'email
        await transporter.sendMail(mailOptions);

        // Email de confirmation à l'expéditeur
        const confirmationMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Confirmation de votre message - Hay School',
            html: `
                <h3>Merci de nous avoir contacté !</h3>
                <p>Cher(e) ${name},</p>
                <p>Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
                <p>Cordialement,</p>
                <p>L'équipe Hay School</p>
            `
        };

        await transporter.sendMail(confirmationMailOptions);

        res.status(200).json({ message: 'Message envoyé avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message:', error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi du message' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

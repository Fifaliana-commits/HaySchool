// Fonction pour basculer l'affichage du chatbot
function toggleChat() {
    const chatbot = document.getElementById('chatbot');
    chatbot.classList.toggle('active');
}

// Fonction pour envoyer un message
async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    
    if (message === '') return;

    // Afficher le message de l'utilisateur
    appendMessage('user', message);
    userInput.value = '';

    try {
        // Simuler une réponse du chatbot
        const response = await getBotResponse(message);
        appendMessage('bot', response);
    } catch (error) {
        console.error('Erreur:', error);
        appendMessage('bot', 'Désolé, je ne peux pas répondre pour le moment.');
    }
}

// Fonction pour ajouter un message dans la conversation
function appendMessage(sender, text) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Fonction pour obtenir la réponse du chatbot
async function getBotResponse(message) {
    // Simuler un délai de réponse
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Liste de réponses simples basées sur des mots-clés
    const responses = {
        'corps': 'Le corps humain est une machine incroyable ! Que voudrais-tu savoir sur le corps humain ?',
        'espace': 'L\'espace est fascinant ! Il y a tellement de choses à découvrir sur les planètes, les étoiles et les galaxies.',
        'animaux': 'Les animaux sont des créatures extraordinaires ! Chaque espèce a ses propres caractéristiques uniques.',
        'planetes': 'Notre système solaire compte 8 planètes principales : Mercure, Vénus, Terre, Mars, Jupiter, Saturne, Uranus et Neptune.',
        'cerveau': 'Le cerveau est l\'organe le plus complexe du corps humain. Il contrôle toutes nos fonctions et nos pensées !',
        'coeur': 'Le cœur est un muscle qui bat environ 100 000 fois par jour pour faire circuler le sang dans tout ton corps !',
        'poumons': 'Les poumons te permettent de respirer. Tu inspires environ 15 000 litres d\'air chaque jour !'
    };

    // Chercher une réponse correspondante
    const messageLower = message.toLowerCase();
    for (const [keyword, response] of Object.entries(responses)) {
        if (messageLower.includes(keyword)) {
            return response;
        }
    }

    // Réponse par défaut
    return 'Je suis là pour t\'aider à en apprendre plus sur les sciences ! Pose-moi une question sur le corps humain, l\'espace ou les animaux.';
}

// Écouter la touche Entrée dans le champ de saisie
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Afficher un message de bienvenue au chargement
window.addEventListener('load', function() {
    appendMessage('bot', 'Bonjour ! Je suis ton assistant sciences. Pose-moi des questions sur le corps humain, l\'espace ou les animaux !');
});

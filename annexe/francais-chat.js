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
        'conjugaison': 'La conjugaison des verbes est importante ! Quel temps voudrais-tu réviser ?',
        'verbe': 'Les verbes peuvent être réguliers ou irréguliers. Lesquels te posent des difficultés ?',
        'grammaire': 'La grammaire française a beaucoup de règles ! Sur quel point as-tu besoin d\'aide ?',
        'accord': 'Les accords en français suivent des règles précises. As-tu des questions sur les accords des adjectifs ou des participes passés ?',
        'synonyme': 'Les synonymes enrichissent ton vocabulaire ! Quel mot voudrais-tu enrichir ?',
        'expression': 'Le français est riche en expressions imagées ! Veux-tu en découvrir quelques-unes ?',
        'orthographe': 'L\'orthographe est importante pour bien écrire. Quelle difficulté rencontres-tu ?',
        'lecture': 'La lecture est une excellente façon d\'améliorer ton français ! Quel genre d\'histoire aimes-tu ?'
    };

    // Chercher une réponse correspondante
    const messageLower = message.toLowerCase();
    for (const [keyword, response] of Object.entries(responses)) {
        if (messageLower.includes(keyword)) {
            return response;
        }
    }

    // Réponse par défaut
    return 'Je suis là pour t\'aider à apprendre le français ! Pose-moi des questions sur la grammaire, la conjugaison, le vocabulaire ou la lecture.';
}

// Écouter la touche Entrée dans le champ de saisie
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Afficher un message de bienvenue au chargement
window.addEventListener('load', function() {
    appendMessage('bot', 'Bonjour ! Je suis ton assistant français. Je peux t\'aider avec la grammaire, la conjugaison, le vocabulaire et la lecture !');
});

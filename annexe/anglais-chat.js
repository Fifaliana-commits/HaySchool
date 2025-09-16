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
        console.error('Error:', error);
        appendMessage('bot', 'Sorry, I cannot answer right now.');
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
        'hello': 'Hi there! Ready to learn English? 😊',
        'hi': 'Hello! Let\'s learn English together! 🌟',
        'food': 'I can help you learn food vocabulary! For example: apple 🍎, banana 🍌, orange 🍊',
        'color': 'Let\'s learn colors! Red 🔴, Blue 🔵, Yellow 💛, Green 💚',
        'animal': 'Animals are fun! Cat 🐱, Dog 🐕, Bird 🐦, Fish 🐠',
        'help': 'I can help you with: \n- Vocabulary\n- Colors\n- Animals\n- Greetings\n- Numbers\nWhat would you like to learn?',
        'number': 'Let\'s count together: One, Two, Three, Four, Five! 🔢',
        'song': 'Would you like to learn the ABC song? 🎵 A-B-C-D-E-F-G...',
        'story': 'I know many fun stories! Would you like to hear about "The Happy Cat" or "The Magic Tree"? 📚',
        'game': 'Let\'s play a word game! I\'ll say a word, and you can tell me what it means! 🎮'
    };

    // Chercher une réponse correspondante
    const messageLower = message.toLowerCase();
    for (const [keyword, response] of Object.entries(responses)) {
        if (messageLower.includes(keyword)) {
            return response;
        }
    }

    // Réponse par défaut
    return 'I\'m here to help you learn English! You can ask me about colors, animals, food, or we can play a fun game! 🌈';
}

// Écouter la touche Entrée dans le champ de saisie
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Afficher un message de bienvenue au chargement
window.addEventListener('load', function() {
    appendMessage('bot', 'Hello! I\'m your English learning friend! Would you like to learn about colors, animals, or play a fun game? 🌟');
});

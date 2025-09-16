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
        // Obtenir la réponse du chatbot
        const response = await getBotResponse(message);
        appendMessage('bot', response);
    } catch (error) {
        console.error('Error:', error);
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

// Fonction pour résoudre des calculs simples
function solveSimpleMath(expression) {
    try {
        // Sécuriser l'évaluation en vérifiant que l'expression ne contient que des chiffres et opérateurs basiques
        if (/^[0-9+\-*/\s()]+$/.test(expression)) {
            return eval(expression);
        }
        return null;
    } catch {
        return null;
    }
}

// Fonction pour obtenir la réponse du chatbot
async function getBotResponse(message) {
    // Simuler un délai de réponse
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const messageLower = message.toLowerCase();

    // Vérifier si c'est un calcul
    const calculPattern = /^[0-9+\-*/\s()]+$/;
    if (calculPattern.test(message)) {
        const result = solveSimpleMath(message);
        if (result !== null) {
            return `Le résultat est : ${result} 🎯`;
        }
    }

    // Liste de réponses basées sur des mots-clés
    const responses = {
        'bonjour': 'Bonjour ! Je suis là pour t\'aider avec les mathématiques ! 🎯',
        'salut': 'Salut ! Prêt à faire des maths ? 🎮',
        'addition': 'L\'addition, c\'est quand on ajoute des nombres ! Par exemple : 2 + 2 = 4 ➕',
        'soustraction': 'La soustraction, c\'est quand on enlève un nombre d\'un autre ! Par exemple : 5 - 3 = 2 ➖',
        'multiplication': 'La multiplication, c\'est l\'addition qui se répète ! Par exemple : 3 × 4 = 12 ✖️',
        'division': 'La division, c\'est partager en parts égales ! Par exemple : 6 ÷ 2 = 3 ➗',
        'forme': 'Les formes principales sont : le cercle ⭕, le carré ⬛, et le triangle 🔺',
        'cercle': 'Le cercle est une forme ronde, comme une balle ! ⭕',
        'carré': 'Le carré a 4 côtés égaux et 4 angles droits ! ⬛',
        'triangle': 'Le triangle a 3 côtés et 3 angles ! 🔺',
        'nombre': 'Je peux t\'aider à compter ! 1, 2, 3, 4, 5... 🔢',
        'calcul': 'Je peux t\'aider à calculer ! Donne-moi une opération simple ! 🧮',
        'aide': 'Je peux t\'aider avec :\n- Les calculs simples\n- Les formes géométriques\n- Les nombres\n- Les additions et soustractions\nQue veux-tu apprendre ? 📚',
        'jeu': 'Tu veux jouer aux maths ? Super ! Je peux te poser des questions amusantes ! 🎮'
    };

    // Chercher une réponse correspondante
    for (const [keyword, response] of Object.entries(responses)) {
        if (messageLower.includes(keyword)) {
            return response;
        }
    }

    // Réponse par défaut
    return 'Je suis là pour t\'aider avec les maths ! Tu peux me poser des questions sur les nombres, les formes, ou me demander de faire des calculs ! 🎯';
}

// Écouter la touche Entrée dans le champ de saisie
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Afficher un message de bienvenue au chargement
window.addEventListener('load', function() {
    appendMessage('bot', 'Bonjour ! Je suis ton assistant en mathématiques ! Je peux t\'aider avec les calculs, les formes, et les nombres. Que veux-tu apprendre ? 🎯');
});

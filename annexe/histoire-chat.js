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

// Base de connaissances historiques
const historicalFacts = {
    prehistoire: {
        periode: "La Préhistoire s'étend de l'apparition des premiers hommes jusqu'à l'invention de l'écriture.",
        decouvertes: "Les grandes découvertes incluent le feu, les outils en pierre, et l'art rupestre.",
        vie: "Les hommes préhistoriques vivaient de la chasse et de la cueillette."
    },
    antiquite: {
        egypte: "L'Égypte antique était dirigée par des pharaons et a construit les pyramides.",
        grece: "La Grèce antique a vu naître la démocratie et de grands philosophes.",
        rome: "L'Empire romain était l'une des plus grandes civilisations de l'histoire."
    },
    moyenage: {
        periode: "Le Moyen Âge est marqué par la féodalité et la construction des châteaux forts.",
        vie: "Les gens vivaient dans des villages autour des châteaux pour se protéger.",
        chevaliers: "Les chevaliers suivaient un code d'honneur appelé la chevalerie."
    }
};

// Fonction pour obtenir la réponse du chatbot
async function getBotResponse(message) {
    // Simuler un délai de réponse
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const messageLower = message.toLowerCase();

    // Réponses basées sur les mots-clés
    if (messageLower.includes('préhistoire')) {
        if (messageLower.includes('feu')) {
            return "La découverte du feu est l'une des plus importantes de la Préhistoire ! Elle a permis de se chauffer, cuire les aliments et se protéger des animaux. 🔥";
        }
        return historicalFacts.prehistoire.periode + " " + historicalFacts.prehistoire.decouvertes + " 🦕";
    }

    if (messageLower.includes('egypte') || messageLower.includes('pharaon')) {
        return historicalFacts.antiquite.egypte + " Les pyramides sont parmi les plus anciennes merveilles du monde ! 🔮";
    }

    if (messageLower.includes('grèce') || messageLower.includes('grece')) {
        return historicalFacts.antiquite.grece + " Savais-tu que les Jeux Olympiques ont été inventés en Grèce antique ? 🏺";
    }

    if (messageLower.includes('rome') || messageLower.includes('romain')) {
        return historicalFacts.antiquite.rome + " As-tu déjà entendu parler du Colisée ? 🏛️";
    }

    if (messageLower.includes('moyen') && messageLower.includes('âge')) {
        return historicalFacts.moyenage.periode + " " + historicalFacts.moyenage.chevaliers + " 🏰";
    }

    if (messageLower.includes('château')) {
        return "Les châteaux forts étaient construits pour protéger les seigneurs et les villageois. Ils avaient des douves, des ponts-levis et de hautes tours ! 🏰";
    }

    if (messageLower.includes('chevalier')) {
        return "Les chevaliers étaient des guerriers qui suivaient un code d'honneur. Ils protégeaient leur seigneur et participaient à des tournois ! ⚔️";
    }

    if (messageLower.includes('pyramide')) {
        return "Les pyramides d'Égypte sont d'immenses tombeaux construits pour les pharaons. La plus grande est la pyramide de Khéops ! 🔮";
    }

    if (messageLower.includes('quand') || messageLower.includes('date')) {
        return "Voici les grandes périodes de l'Histoire :\n- Préhistoire : jusqu'à -3000\n- Antiquité : -3000 à 476\n- Moyen Âge : 476 à 1492\n- Temps Modernes : 1492 à 1789\n- Époque Contemporaine : 1789 à nos jours 📅";
    }

    // Réponse par défaut
    return "Je peux t'aider à découvrir l'Histoire ! Tu peux me poser des questions sur :\n- La Préhistoire 🦕\n- L'Antiquité 🏺\n- Le Moyen Âge 🏰\n- Les grandes découvertes ⚔️\nQue veux-tu savoir ?";
}

// Écouter la touche Entrée dans le champ de saisie
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Afficher un message de bienvenue au chargement
window.addEventListener('load', function() {
    appendMessage('bot', 'Bonjour ! Je suis ton guide dans l\'Histoire ! Quelle période t\'intéresse ? La Préhistoire 🦕, l\'Antiquité 🏺, ou le Moyen Âge 🏰 ?');
});

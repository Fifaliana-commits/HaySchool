class Chatbot {
    constructor() {
        this.container = null;
        this.messages = null;
        this.input = null;
        this.isTyping = false;
        this.apiKey = null; // Clé API à configurer
        this.useAI = false; // Flag pour utiliser l'IA externe
        
        // Base de connaissances locale
        this.knowledgeBase = {
            // Thèmes principaux
            'géographie_physique': {
                keywords: ['montagne', 'volcan', 'rivière', 'lac', 'océan', 'glacier', 'plage', 'île'],
                topics: ['relief', 'hydrographie', 'géologie', 'climat']
            },
            'géographie_humaine': {
                keywords: ['ville', 'population', 'culture', 'économie', 'transport', 'agriculture'],
                topics: ['démographie', 'urbanisation', 'migration', 'développement']
            },
            'environnement': {
                keywords: ['pollution', 'écologie', 'protection', 'biodiversité', 'climat', 'développement durable'],
                topics: ['changement climatique', 'conservation', 'énergies renouvelables']
            },
            'pays_et_régions': {
                keywords: ['pays', 'capitale', 'continent', 'région', 'frontière', 'europe', 'asie', 'afrique'],
                topics: ['pays', 'capitales', 'frontières', 'unions régionales']
            }
        };

        // Réponses de base
        this.basicResponses = {
            greeting: [
                "Salut ! Je suis Géo, ton assistant en géographie ! ",
                "Coucou ! Prêt à explorer le monde avec moi ? ",
                "Hello ! Envie de découvrir des choses passionnantes sur notre planète ? "
            ],
            farewell: [
                "À bientôt pour de nouvelles découvertes ! ",
                "N'oublie pas de revenir pour en apprendre plus ! ",
                "Au revoir et continue d'explorer le monde ! "
            ],
            default: [
                "Je peux t'aider à découvrir plein de choses sur la Terre et ses habitants ! Que veux-tu savoir ?",
                "Il y a tant de choses fascinantes à apprendre sur notre monde ! Par quoi veux-tu commencer ?",
                "La géographie est passionnante ! Je peux te parler des pays, du climat, des cultures..."
            ]
        };
    }

    async initialize() {
        // Créer l'interface du chatbot
        this.createInterface();
        
        // Charger les configurations
        await this.loadConfig();
        
        // Afficher le message de bienvenue
        this.showWelcomeMessage();
    }

    async loadConfig() {
        // Ici on pourrait charger la configuration depuis un fichier
        // Pour l'instant, on utilise des valeurs par défaut
        this.useAI = false;
        this.apiKey = null;
    }

    createInterface() {
        // Créer l'icône du chatbot
        const icon = document.createElement('div');
        icon.className = 'chatbot-icon';
        icon.innerHTML = '<i class="fas fa-robot"></i>';
        icon.onclick = () => this.toggleChat();
        document.body.appendChild(icon);

        // Créer le conteneur du chat
        this.container = document.createElement('div');
        this.container.className = 'chatbot-container';
        this.container.innerHTML = `
            <div class="chatbot-header">
                <h3>Géo - Assistant Géographie </h3>
                <button class="close-chat" onclick="chatbot.toggleChat()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="chatbot-messages"></div>
            <div class="chatbot-input">
                <input type="text" placeholder="Pose-moi une question sur la géographie...">
                <button class="send-message">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        `;
        document.body.appendChild(this.container);

        // Initialiser les références
        this.messages = this.container.querySelector('.chatbot-messages');
        this.input = this.container.querySelector('input');
        const sendButton = this.container.querySelector('.send-message');

        // Ajouter les événements
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        sendButton.addEventListener('click', () => this.sendMessage());
    }

    showWelcomeMessage() {
        const welcome = this.getRandomResponse('greeting');
        this.addMessage(welcome, 'bot');
        setTimeout(() => {
            this.addMessage("Je peux t'aider à découvrir le monde ! Tu peux me poser des questions sur :", 'bot');
            this.addMessage("", 'bot');
            this.addMessage("", 'bot');
            this.addMessage("", 'bot');
            this.addMessage("", 'bot');
        }, 1000);
    }

    async sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;

        // Afficher le message de l'utilisateur
        this.addMessage(message, 'user');
        this.input.value = '';

        // Simuler la réflexion
        this.showTypingIndicator();

        try {
            let response;
            if (this.useAI && this.apiKey) {
                // Si l'IA est configurée, utiliser l'API
                response = await this.getAIResponse(message);
            } else {
                // Sinon, utiliser la base de connaissances locale
                response = this.getLocalResponse(message);
            }

            setTimeout(() => {
                this.hideTypingIndicator();
                this.addMessage(response, 'bot');

                // Suggérer d'autres sujets parfois
                if (Math.random() < 0.3) {
                    setTimeout(() => {
                        this.suggestRelatedTopic(message);
                    }, 1000);
                }
            }, 1000 + Math.random() * 1000);
        } catch (error) {
            console.error('Erreur lors de la génération de la réponse:', error);
            this.hideTypingIndicator();
            this.addMessage("Désolé, j'ai eu un petit problème. Peux-tu reformuler ta question ?", 'bot');
        }
    }

    async getAIResponse(message) {
        // Cette fonction sera implémentée plus tard pour utiliser une API d'IA
        // Pour l'instant, on utilise la réponse locale
        return this.getLocalResponse(message);
    }

    getLocalResponse(message) {
        message = message.toLowerCase();
        
        // Chercher dans la base de connaissances
        for (const [category, data] of Object.entries(this.knowledgeBase)) {
            if (data.keywords.some(keyword => message.includes(keyword))) {
                return this.generateResponseForCategory(category, message);
            }
        }

        // Réponse par défaut
        return this.getRandomResponse('default');
    }

    generateResponseForCategory(category, message) {
        // Ici on pourrait avoir des réponses plus spécifiques par catégorie
        const responses = {
            'géographie_physique': [
                "La Terre est pleine de merveilles naturelles ! Savais-tu que le Mont Everest grandit chaque année ?",
                "Les océans couvrent plus de 70% de notre planète ! C'est fascinant, non ?",
                "Le Grand Canyon s'est formé sur des millions d'années. La nature est incroyable !"
            ],
            'géographie_humaine': [
                "Il y a plus de 7 milliards de personnes sur Terre, réparties dans près de 200 pays !",
                "Chaque culture a ses traditions uniques. C'est ça qui rend notre monde si intéressant !",
                "Les grandes villes sont comme des fourmilières géantes, pleines de vie et d'activité !"
            ],
            'environnement': [
                "Protéger notre planète est très important. Chaque petit geste compte !",
                "La biodiversité est essentielle pour l'équilibre de notre planète.",
                "Le changement climatique est un défi majeur pour notre génération."
            ],
            'pays_et_régions': [
                "Chaque pays a son histoire et sa culture unique à découvrir !",
                "Les frontières ont beaucoup changé au fil du temps.",
                "Il y a tellement de beaux endroits à découvrir dans le monde !"
            ]
        };

        const categoryResponses = responses[category];
        return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
    }

    suggestRelatedTopic(message) {
        const suggestions = [
            "Tu veux en savoir plus sur un autre sujet ? N'hésite pas ! ",
            "Je peux aussi te parler d'autres aspects de la géographie si tu veux !",
            "Il y a tellement d'autres choses passionnantes à découvrir !"
        ];
        this.addMessage(suggestions[Math.floor(Math.random() * suggestions.length)], 'bot');
    }

    getRandomResponse(category) {
        const responses = this.basicResponses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    addMessage(text, sender) {
        const message = document.createElement('div');
        message.className = `message ${sender}-message`;
        message.textContent = text;
        this.messages.appendChild(message);
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    showTypingIndicator() {
        if (this.isTyping) return;
        this.isTyping = true;
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        this.messages.appendChild(indicator);
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const indicator = this.messages.querySelector('.typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    toggleChat() {
        this.container.classList.toggle('active');
        if (this.container.classList.contains('active')) {
            this.input.focus();
        }
    }
}

// Initialiser le chatbot
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new Chatbot();
    chatbot.initialize();
});

// Système de progression et de niveaux
const LEVELS = {
    1: { xpRequired: 0, title: "Explorateur Débutant" },
    2: { xpRequired: 100, title: "Voyageur Curieux" },
    3: { xpRequired: 250, title: "Géographe Amateur" },
    4: { xpRequired: 500, title: "Expert en Géographie" },
    5: { xpRequired: 1000, title: "Maître du Monde" }
};

// Gestion du stockage local
class UserProgress {
    constructor() {
        this.loadProgress();
    }

    loadProgress() {
        const savedProgress = localStorage.getItem('geoProgress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            this.xp = progress.xp;
            this.level = progress.level;
            this.completedLessons = progress.completedLessons || [];
        } else {
            this.xp = 0;
            this.level = 1;
            this.completedLessons = [];
        }
    }

    saveProgress() {
        localStorage.setItem('geoProgress', JSON.stringify({
            xp: this.xp,
            level: this.level,
            completedLessons: this.completedLessons
        }));
    }

    addXP(amount) {
        this.xp += amount;
        const newLevel = this.calculateLevel();
        if (newLevel > this.level) {
            this.levelUp(newLevel);
        }
        this.saveProgress();
    }

    calculateLevel() {
        let currentLevel = 1;
        for (let level in LEVELS) {
            if (this.xp >= LEVELS[level].xpRequired) {
                currentLevel = parseInt(level);
            } else {
                break;
            }
        }
        return currentLevel;
    }

    levelUp(newLevel) {
        const oldLevel = this.level;
        this.level = newLevel;
        this.showLevelUpAnimation(oldLevel, newLevel);
    }

    showLevelUpAnimation(oldLevel, newLevel) {
        const animation = document.createElement('div');
        animation.className = 'level-up-animation';
        animation.innerHTML = `
            <div class="level-up-content">
                <h2>Niveau ${newLevel} Atteint!</h2>
                <p>Félicitations! Vous êtes maintenant un ${LEVELS[newLevel].title}</p>
                <div class="level-up-rewards">
                    <h3>Récompenses débloquées:</h3>
                    <ul>
                        <li>Nouveau titre: ${LEVELS[newLevel].title}</li>
                        <li>Nouveaux défis disponibles</li>
                        <li>+${(newLevel - oldLevel) * 50} points bonus!</li>
                    </ul>
                </div>
            </div>
        `;
        document.body.appendChild(animation);
        setTimeout(() => animation.remove(), 3000);
    }
}

// Système de quiz
class Quiz {
    constructor(questions, category) {
        this.questions = this.prepareQuestions(questions);
        this.category = category;
        this.currentQuestion = 0;
        this.score = 0;
        this.userProgress = new UserProgress();
        this.askedQuestions = new Set();
        this.userPerformance = {
            correct: 0,
            total: 0
        };
    }

    prepareQuestions(questions) {
        return questions.map((q, index) => ({
            ...q,
            id: index + 1,
            lastAsked: null,
            timesAsked: 0,
            difficulty: q.difficulty || 'moyen'
        }));
    }

    start() {
        this.score = 0;
        this.currentQuestion = 0;
        this.askedQuestions.clear();
        this.userPerformance = {
            correct: 0,
            total: 0
        };
        this.showQuestion();
    }

    getNextQuestion() {
        if (this.questions.length === 0) return null;
        
        // Si toutes les questions ont été posées, réinitialiser
        if (this.askedQuestions.size === this.questions.length) {
            this.askedQuestions.clear();
        }

        // Calculer le niveau de difficulté approprié
        const userSuccessRate = this.userPerformance.total === 0 ? 0.5 : 
            this.userPerformance.correct / this.userPerformance.total;

        // Filtrer les questions non posées
        let availableQuestions = this.questions.filter(q => !this.askedQuestions.has(q.id));

        // Trier les questions selon plusieurs critères
        availableQuestions.sort((a, b) => {
            // Facteur de difficulté
            const difficultyScore = (q) => {
                const targetDifficulty = userSuccessRate < 0.3 ? 'facile' : 
                                       userSuccessRate > 0.7 ? 'difficile' : 'moyen';
                return q.difficulty === targetDifficulty ? 1 : 0;
            };

            // Facteur de fréquence
            const frequencyScore = (q) => {
                if (!q.lastAsked) return 1;
                const daysSinceLastAsked = (Date.now() - q.lastAsked) / (1000 * 60 * 60 * 24);
                return Math.min(daysSinceLastAsked / 7, 1); // Maximum score après 7 jours
            };

            // Score combiné
            const scoreA = difficultyScore(a) + frequencyScore(a);
            const scoreB = difficultyScore(b) + frequencyScore(b);

            return scoreB - scoreA;
        });

        // Sélectionner une question avec un peu de hasard parmi les meilleures
        const topQuestions = availableQuestions.slice(0, 3);
        const selectedQuestion = topQuestions[Math.floor(Math.random() * topQuestions.length)];

        // Mettre à jour les statistiques
        selectedQuestion.lastAsked = Date.now();
        selectedQuestion.timesAsked++;
        this.askedQuestions.add(selectedQuestion.id);

        return selectedQuestion;
    }

    showQuestion() {
        const question = this.getNextQuestion();
        if (!question) {
            this.showResults();
            return;
        }

        const quizContainer = document.querySelector('.quiz-content') || document.getElementById('quiz-container');
        if (!quizContainer) return;

        quizContainer.innerHTML = `
            <div class="quiz-question">
                <h3>${question.question}</h3>
                <div class="quiz-options">
                    ${question.options.map((option, index) => `
                        <button class="quiz-option" onclick="window.currentQuiz.checkAnswer(${index})">
                            ${option}
                        </button>
                    `).join('')}
                </div>
                <div id="explanation" class="explanation" style="display: none;"></div>
            </div>
        `;

        // Rendre l'instance du quiz accessible globalement pour les gestionnaires d'événements
        window.currentQuiz = this;
    }

    checkAnswer(selectedIndex) {
        const question = this.questions[this.currentQuestion];
        const correct = selectedIndex === question.correct;
        
        // Mettre à jour les performances
        this.userPerformance.total++;
        if (correct) {
            this.userPerformance.correct++;
            this.score++;
        }

        // Afficher l'explication
        const explanationElement = document.getElementById('explanation');
        if (explanationElement) {
            explanationElement.innerHTML = `
                <h4>${correct ? 'Correct !' : 'Incorrect'}</h4>
                <p>${question.explanation || 'Pas d\'explication disponible.'}</p>
            `;
            explanationElement.className = `explanation ${correct ? 'correct' : 'incorrect'}`;
            explanationElement.style.display = 'block';
        }

        // Désactiver les boutons
        const buttons = document.querySelectorAll('.quiz-option');
        buttons.forEach(button => {
            button.disabled = true;
            if (button === buttons[selectedIndex]) {
                button.classList.add(correct ? 'correct' : 'incorrect');
            }
        });

        // Ajouter de l'XP en fonction de la difficulté
        if (correct) {
            const xpGain = {
                'facile': 10,
                'moyen': 20,
                'difficile': 30
            }[question.difficulty] || 10;
            this.userProgress.addXP(xpGain);
        }

        // Passer à la question suivante après un délai
        setTimeout(() => {
            this.currentQuestion++;
            this.showQuestion();
        }, 2000);
    }

    showResults() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        const xpEarned = this.calculateXP(percentage);
        this.userProgress.addXP(xpEarned);

        const quizContainer = document.querySelector('.quiz-content') || document.getElementById('quiz-container');
        quizContainer.innerHTML = `
            <div class="quiz-results">
                <div class="results-circle">
                    <div class="percentage">${percentage}%</div>
                    <div class="score">${this.score}/${this.questions.length}</div>
                </div>
                <h3 class="results-message">${this.getResultMessage(percentage)}</h3>
                <div class="results-rewards">
                    <h4>Récompenses:</h4>
                    <ul>
                        <li>+${xpEarned} XP gagnés</li>
                        ${percentage === 100 ? '<li>+50 XP bonus pour score parfait!</li>' : ''}
                        <li>Quiz ${this.category} complété!</li>
                    </ul>
                </div>
                <button class="close-quiz" onclick="location.reload()">Retour aux leçons</button>
            </div>
        `;
    }

    calculateXP(percentage) {
        let xp = Math.round(percentage * 0.5); // Base XP
        if (percentage === 100) xp += 50; // Bonus pour score parfait
        return xp;
    }

    getResultMessage(percentage) {
        if (percentage === 100) return "Parfait! Tu es un véritable génie de la géographie! 🌟";
        if (percentage >= 80) return "Excellent travail! Continue comme ça! 🎉";
        if (percentage >= 60) return "Bon travail! Tu peux encore t'améliorer! 👍";
        return "Continue à pratiquer, tu vas y arriver! 💪";
    }
}

// Exemple de questions pour les différentes catégories
const continentsQuestions = [
    {
        question: "Quel est le plus grand continent du monde?",
        answers: ["Asie", "Afrique", "Amérique du Nord", "Europe"],
        correct: 0,
        explanation: "L'Asie est le plus grand continent avec une superficie de 44,5 millions de km²."
    },
    {
        question: "Combien y a-t-il de continents sur Terre?",
        answers: ["5", "6", "7", "8"],
        correct: 2,
        explanation: "Il y a 7 continents: Asie, Afrique, Amérique du Nord, Amérique du Sud, Antarctique, Europe et Océanie."
    }
];

const climatQuestions = [
    {
        question: "Quel climat trouve-t-on principalement en Amazonie?",
        answers: ["Tropical", "Désertique", "Méditerranéen", "Polaire"],
        correct: 0,
        explanation: "L'Amazonie a un climat tropical caractérisé par des températures chaudes et des précipitations abondantes."
    },
    {
        question: "Quelle zone climatique se trouve aux pôles?",
        answers: ["Tempérée", "Tropicale", "Polaire", "Équatoriale"],
        correct: 2,
        explanation: "Les pôles ont un climat polaire avec des températures très basses toute l'année."
    }
];

const reliefQuestions = [
    {
        question: "Quelle est la plus haute montagne du monde?",
        answers: ["Mont Blanc", "K2", "Mont Kilimandjaro", "Mont Everest"],
        correct: 3,
        explanation: "Le Mont Everest est la plus haute montagne du monde avec 8 848 mètres d'altitude."
    },
    {
        question: "Quel est le plus grand désert du monde?",
        answers: ["Sahara", "Antarctique", "Gobi", "Kalahari"],
        correct: 1,
        explanation: "L'Antarctique est considéré comme un désert froid et est le plus grand désert du monde."
    }
];

// Initialisation des quiz
function startQuiz(category) {
    let questions;
    switch(category) {
        case 'continents':
            questions = continentsQuestions;
            break;
        case 'climat':
            questions = climatQuestions;
            break;
        case 'relief':
            questions = reliefQuestions;
            break;
        default:
            questions = continentsQuestions;
    }
    window.quiz = new Quiz(questions, category);
    quiz.start();
}

// Initialisation du progrès utilisateur
const userProgress = new UserProgress();

// Mise à jour de l'affichage du niveau
function updateLevelDisplay() {
    const levelDisplay = document.getElementById('level-display');
    if (levelDisplay) {
        levelDisplay.innerHTML = `
            <h3>Niveau ${userProgress.level}</h3>
            <p>${LEVELS[userProgress.level].title}</p>
            <p>XP: ${userProgress.xp}</p>
        `;
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    updateLevelDisplay();
});

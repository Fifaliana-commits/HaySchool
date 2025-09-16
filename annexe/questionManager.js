// Gestionnaire de questions intelligent
class QuestionManager {
    constructor() {
        this.questions = [];
        this.askedQuestions = new Set();
        this.userPerformance = {
            correct: 0,
            total: 0
        };
    }

    // Ajouter une nouvelle question
    addQuestion(question) {
        this.questions.push({
            ...question,
            lastAsked: null,
            timesAsked: 0,
            successRate: 0
        });
    }

    // Obtenir la prochaine question en fonction de plusieurs critères
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

    // Mettre à jour les performances de l'utilisateur
    updatePerformance(correct) {
        this.userPerformance.total++;
        if (correct) {
            this.userPerformance.correct++;
        }
    }

    // Réinitialiser les statistiques de l'utilisateur
    resetPerformance() {
        this.userPerformance = {
            correct: 0,
            total: 0
        };
        this.askedQuestions.clear();
    }
}

export default QuestionManager;

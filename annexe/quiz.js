import QuestionManager from './questionManager.js';
import questions from './questions.js';

class Quiz {
    constructor() {
        this.questionManager = new QuestionManager();
        this.currentQuestion = null;
        this.score = 0;
        
        // Initialiser le gestionnaire avec les questions
        questions.forEach(question => {
            this.questionManager.addQuestion(question);
        });
    }

    // Démarrer un nouveau quiz
    start() {
        this.score = 0;
        this.questionManager.resetPerformance();
        this.loadNextQuestion();
    }

    // Charger la prochaine question
    loadNextQuestion() {
        this.currentQuestion = this.questionManager.getNextQuestion();
        if (this.currentQuestion) {
            this.displayQuestion();
        } else {
            this.endQuiz();
        }
    }

    // Afficher la question courante
    displayQuestion() {
        const questionElement = document.getElementById('question');
        const optionsContainer = document.getElementById('options');
        
        if (!questionElement || !optionsContainer) return;

        // Afficher la question
        questionElement.textContent = this.currentQuestion.question;

        // Vider et remplir les options
        optionsContainer.innerHTML = '';
        this.currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'quiz-option';
            button.textContent = option;
            button.addEventListener('click', () => this.checkAnswer(index));
            optionsContainer.appendChild(button);
        });
    }

    // Vérifier la réponse
    checkAnswer(selectedIndex) {
        const correct = selectedIndex === this.currentQuestion.correctAnswer;
        
        // Mettre à jour les performances
        this.questionManager.updatePerformance(correct);
        
        if (correct) {
            this.score++;
        }

        // Afficher l'explication
        this.showExplanation(correct);

        // Charger la prochaine question après un délai
        setTimeout(() => {
            this.loadNextQuestion();
        }, 2000);
    }

    // Afficher l'explication
    showExplanation(correct) {
        const explanationElement = document.getElementById('explanation');
        if (!explanationElement) return;

        explanationElement.className = `answer-explanation ${correct ? 'correct' : 'incorrect'}`;
        explanationElement.innerHTML = `
            <h4>${correct ? 'Correct !' : 'Incorrect'}</h4>
            <p>${this.currentQuestion.explanation}</p>
        `;
    }

    // Terminer le quiz
    endQuiz() {
        const quizContainer = document.getElementById('quiz-container');
        if (!quizContainer) return;

        const totalQuestions = questions.length;
        const percentage = Math.round((this.score / totalQuestions) * 100);

        quizContainer.innerHTML = `
            <div class="quiz-results">
                <div class="results-circle">
                    <span class="percentage">${percentage}%</span>
                    <span class="score">${this.score}/${totalQuestions}</span>
                </div>
                <div class="results-message">
                    ${this.getResultMessage(percentage)}
                </div>
                <button class="start-button" onclick="startNewQuiz()">Recommencer</button>
            </div>
        `;
    }

    // Obtenir un message personnalisé selon le score
    getResultMessage(percentage) {
        if (percentage >= 80) {
            return "Excellent ! Tu maîtrises vraiment bien le sujet !";
        } else if (percentage >= 60) {
            return "Bien joué ! Continue comme ça !";
        } else if (percentage >= 40) {
            return "Pas mal ! Avec un peu plus de pratique, tu vas t'améliorer !";
        } else {
            return "Continue à pratiquer, tu vas progresser !";
        }
    }
}

// Créer et exporter une instance du quiz
const quiz = new Quiz();
export default quiz;

// Gestion des niveaux
document.addEventListener('DOMContentLoaded', function() {
    // Sélecteurs de niveau
    const levelButtons = document.querySelectorAll('.level-btn');
    levelButtons.forEach(button => {
        button.addEventListener('click', () => {
            levelButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateContent(button.dataset.level);
        });
    });

    // Système de calcul mental
    let currentScore = 0;
    let currentProblem = null;

    function generateProblem(level) {
        let num1, num2, operation;
        switch(level) {
            case 'debutant':
                num1 = Math.floor(Math.random() * 10);
                num2 = Math.floor(Math.random() * 10);
                operation = '+';
                break;
            case 'intermediaire':
                num1 = Math.floor(Math.random() * 20);
                num2 = Math.floor(Math.random() * 20);
                operation = Math.random() < 0.5 ? '+' : '-';
                break;
            case 'avance':
                num1 = Math.floor(Math.random() * 12);
                num2 = Math.floor(Math.random() * 12);
                operation = Math.random() < 0.33 ? '+' : 
                           Math.random() < 0.66 ? '-' : '×';
                break;
        }
        return { num1, num2, operation };
    }

    function displayProblem(problem) {
        const display = document.getElementById('calculation-display');
        display.textContent = `${problem.num1} ${problem.operation} ${problem.num2} = ?`;
    }

    function checkAnswer(problem, userAnswer) {
        let correctAnswer;
        switch(problem.operation) {
            case '+':
                correctAnswer = problem.num1 + problem.num2;
                break;
            case '-':
                correctAnswer = problem.num1 - problem.num2;
                break;
            case '×':
                correctAnswer = problem.num1 * problem.num2;
                break;
        }
        return parseInt(userAnswer) === correctAnswer;
    }

    // Gestionnaire pour le bouton de vérification
    const checkButton = document.querySelector('.check-answer');
    if (checkButton) {
        checkButton.addEventListener('click', () => {
            const answer = document.getElementById('calculation-answer').value;
            if (currentProblem && answer) {
                const isCorrect = checkAnswer(currentProblem, answer);
                if (isCorrect) {
                    currentScore++;
                    updateProgress(currentScore);
                    showFeedback('Bravo ! C\'est correct ! 🎉');
                } else {
                    showFeedback('Essaie encore ! 💪');
                }
                // Générer un nouveau problème
                currentProblem = generateProblem(getCurrentLevel());
                displayProblem(currentProblem);
                document.getElementById('calculation-answer').value = '';
            }
        });
    }

    // Tables de multiplication
    const practiceTableButton = document.querySelector('.practice-table');
    if (practiceTableButton) {
        practiceTableButton.addEventListener('click', () => {
            const tableNumber = document.getElementById('table-number').value;
            displayMultiplicationTable(tableNumber);
        });
    }

    function displayMultiplicationTable(number) {
        const tableDisplay = document.querySelector('.table-display');
        let html = '<div class="table-grid">';
        for (let i = 1; i <= 10; i++) {
            html += `<div class="table-row">
                        <span>${number} × ${i} = </span>
                        <span class="result">${number * i}</span>
                    </div>`;
        }
        html += '</div>';
        tableDisplay.innerHTML = html;
    }

    // Géométrie interactive
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(shape => {
        shape.addEventListener('click', () => {
            const shapeType = shape.dataset.shape;
            showShapeInfo(shapeType);
        });
    });

    function showShapeInfo(shapeType) {
        const shapeInfo = document.querySelector('.shape-info');
        const infos = {
            circle: 'Le cercle est une forme ronde parfaite. Tous les points sont à égale distance du centre.',
            square: 'Le carré a 4 côtés égaux et 4 angles droits.',
            triangle: 'Le triangle a 3 côtés et 3 angles.'
        };
        shapeInfo.innerHTML = `<p>${infos[shapeType]}</p>`;
    }

    // Système de récompenses
    function updateProgress(score) {
        const progress = document.querySelector('.progress');
        const progressPercentage = (score / 10) * 100; // 10 bonnes réponses pour 100%
        progress.style.width = `${Math.min(progressPercentage, 100)}%`;

        // Débloquer des récompenses
        if (score >= 10) {
            unlockReward('Expert en Calcul');
        }
    }

    function unlockReward(rewardName) {
        const rewardCards = document.querySelectorAll('.reward-card');
        rewardCards.forEach(card => {
            if (card.querySelector('p').textContent === rewardName) {
                card.classList.remove('locked');
            }
        });
    }

    // Feedback visuel
    function showFeedback(message) {
        const feedback = document.createElement('div');
        feedback.className = 'feedback-message';
        feedback.textContent = message;
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.classList.add('show');
        }, 100);

        setTimeout(() => {
            feedback.classList.remove('show');
            setTimeout(() => {
                feedback.remove();
            }, 300);
        }, 2000);
    }

    // Utilitaires
    function getCurrentLevel() {
        const activeButton = document.querySelector('.level-btn.active');
        return activeButton ? activeButton.dataset.level : 'debutant';
    }

    function updateContent(level) {
        currentProblem = generateProblem(level);
        displayProblem(currentProblem);
        // Mettre à jour d'autres contenus en fonction du niveau
    }

    // Initialisation
    const defaultLevel = 'debutant';
    document.querySelector(`[data-level="${defaultLevel}"]`).classList.add('active');
    currentProblem = generateProblem(defaultLevel);
    displayProblem(currentProblem);
});

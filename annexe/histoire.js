document.addEventListener('DOMContentLoaded', function() {
    // Gestion de la timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    const eraCards = document.querySelectorAll('.era-card');

    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const era = item.dataset.era;
            showEraContent(era);
        });
    });

    function showEraContent(era) {
        // Cacher toutes les cartes d'époque
        eraCards.forEach(card => {
            card.classList.remove('active');
        });

        // Afficher la carte correspondante
        const selectedCard = document.querySelector(`.era-card.${era}`);
        if (selectedCard) {
            selectedCard.classList.add('active');
            selectedCard.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Quiz des civilisations
    const quizQuestions = [
        {
            question: "Qui était le premier empereur romain ?",
            options: ["Jules César", "Auguste", "Néron", "Constantin"],
            correct: 1
        },
        {
            question: "Quelle était la capitale de l'Égypte antique ?",
            options: ["Le Caire", "Memphis", "Alexandrie", "Thèbes"],
            correct: 1
        },
        {
            question: "Quel philosophe grec était le maître d'Alexandre le Grand ?",
            options: ["Socrate", "Platon", "Aristote", "Pythagore"],
            correct: 2
        }
    ];

    let currentQuiz = 0;

    function displayQuiz() {
        const quizArea = document.querySelector('.quiz-area');
        if (!quizArea) return;

        const question = quizQuestions[currentQuiz];
        const questionEl = quizArea.querySelector('#quiz-question');
        const optionsEl = quizArea.querySelector('.quiz-options');

        questionEl.textContent = question.question;
        optionsEl.innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'quiz-option';
            button.textContent = option;
            button.addEventListener('click', () => checkAnswer(index));
            optionsEl.appendChild(button);
        });
    }

    function checkAnswer(selectedIndex) {
        const question = quizQuestions[currentQuiz];
        const options = document.querySelectorAll('.quiz-option');

        options.forEach(option => option.disabled = true);

        if (selectedIndex === question.correct) {
            options[selectedIndex].style.background = '#2ecc71';
            showFeedback('Bravo ! C\'est la bonne réponse ! 🎉');
        } else {
            options[selectedIndex].style.background = '#e74c3c';
            options[question.correct].style.background = '#2ecc71';
            showFeedback('Dommage ! Essaie encore ! 💪');
        }

        setTimeout(() => {
            currentQuiz = (currentQuiz + 1) % quizQuestions.length;
            displayQuiz();
        }, 2000);
    }

    // Jeu des découvertes
    const discoveryBtn = document.querySelector('.discovery-btn');
    if (discoveryBtn) {
        discoveryBtn.addEventListener('click', startDiscoveryGame);
    }

    function startDiscoveryGame() {
        const gameArea = document.querySelector('.game-area');
        if (!gameArea) return;

        const discoveries = [
            { name: "Le Feu", description: "Une découverte qui a révolutionné la vie préhistorique !" },
            { name: "Les Outils", description: "Les premiers outils en pierre ont permis de chasser et construire." },
            { name: "L'Art Rupestre", description: "Les premières expressions artistiques de l'humanité." }
        ];

        const randomDiscovery = discoveries[Math.floor(Math.random() * discoveries.length)];
        
        gameArea.innerHTML = `
            <div class="discovery-card">
                <h4>${randomDiscovery.name}</h4>
                <p>${randomDiscovery.description}</p>
                <button class="discovery-btn" onclick="startDiscoveryGame()">Découvrir autre chose</button>
            </div>
        `;
    }

    // Activités historiques
    const activityButtons = document.querySelectorAll('.start-activity');
    activityButtons.forEach(button => {
        button.addEventListener('click', startActivity);
    });

    function startActivity(event) {
        const activityName = event.target.parentElement.querySelector('h3').textContent;
        showFeedback(`Début de l'activité : ${activityName}`);
        // Implémenter les activités spécifiques ici
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

    // Initialisation
    displayQuiz();
});

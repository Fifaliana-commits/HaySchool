// Gestion de l'affichage des sections
function showContent(topicId) {
    // Cacher toutes les sections
    document.querySelectorAll('.topic-content').forEach(section => {
        section.style.display = 'none';
    });
    
    // Afficher la section sélectionnée
    const selectedSection = document.getElementById(topicId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        // Scroll vers la section
        selectedSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Gestion des quiz
const quizData = {
    'digestif': [
        {
            question: "Quelle est la longueur approximative de l'intestin humain ?",
            options: ["3 mètres", "7 mètres", "10 mètres", "15 mètres"],
            correct: 1
        },
        {
            question: "Quelle est la capacité maximale de l'estomac ?",
            options: ["0.5 litre", "1 litre", "1.5 litres", "2 litres"],
            correct: 2
        }
    ],
    'cerveau': [
        {
            question: "Quel pourcentage d'énergie du corps le cerveau utilise-t-il ?",
            options: ["5%", "10%", "15%", "20%"],
            correct: 3
        },
        {
            question: "Combien de neurones le cerveau contient-il environ ?",
            options: ["1 million", "1 milliard", "86 milliards", "100 milliards"],
            correct: 2
        }
    ],
    // Ajoutez d'autres quiz ici
};

function startQuiz(topic) {
    const modal = document.getElementById('quiz-modal');
    const container = document.getElementById('quiz-container');
    const quiz = quizData[topic];

    if (!quiz) return;

    let currentQuestion = 0;
    let score = 0;

    function showQuestion() {
        const question = quiz[currentQuestion];
        container.innerHTML = `
            <h3>Question ${currentQuestion + 1}/${quiz.length}</h3>
            <p>${question.question}</p>
            <div class="options">
                ${question.options.map((option, index) => `
                    <button onclick="selectAnswer(${index})">${option}</button>
                `).join('')}
            </div>
        `;
    }

    // Fonction pour vérifier la réponse
    window.selectAnswer = function(index) {
        const question = quiz[currentQuestion];
        if (index === question.correct) {
            score++;
        }

        currentQuestion++;

        if (currentQuestion < quiz.length) {
            showQuestion();
        } else {
            showResults();
        }
    };

    function showResults() {
        container.innerHTML = `
            <h3>Résultats</h3>
            <p>Tu as obtenu ${score} sur ${quiz.length} points !</p>
            <button onclick="closeQuiz()">Fermer</button>
        `;
    }

    modal.style.display = 'block';
    showQuestion();
}

// Fermer le quiz
window.closeQuiz = function() {
    document.getElementById('quiz-modal').style.display = 'none';
};

// Fermer le modal en cliquant sur la croix
document.querySelector('.close-modal').addEventListener('click', closeQuiz);

// Fermer le modal en cliquant en dehors
window.addEventListener('click', function(event) {
    const modal = document.getElementById('quiz-modal');
    if (event.target === modal) {
        closeQuiz();
    }
});

// Gestion du carousel d'animaux
let currentSlide = 0;
const slides = document.querySelectorAll('.animal-slide');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Changer de slide toutes les 5 secondes
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Information sur les planètes
const planetInfo = {
    'mercure': {
        nom: 'Mercure',
        description: 'La planète la plus proche du Soleil',
        distance: '57.9 millions de km du Soleil',
        temperature: 'De -180°C à 430°C'
    },
    'venus': {
        nom: 'Vénus',
        description: 'La planète la plus chaude',
        distance: '108.2 millions de km du Soleil',
        temperature: 'Environ 462°C'
    },
    'terre': {
        nom: 'Terre',
        description: 'Notre planète bleue',
        distance: '149.6 millions de km du Soleil',
        temperature: 'Moyenne de 15°C'
    },
    'mars': {
        nom: 'Mars',
        description: 'La planète rouge',
        distance: '227.9 millions de km du Soleil',
        temperature: 'De -140°C à 20°C'
    }
};

function showPlanetInfo(planet) {
    const info = planetInfo[planet];
    if (!info) return;

    const modal = document.getElementById('quiz-modal');
    const container = document.getElementById('quiz-container');

    container.innerHTML = `
        <h3>${info.nom}</h3>
        <p>${info.description}</p>
        <ul>
            <li>Distance du Soleil : ${info.distance}</li>
            <li>Température : ${info.temperature}</li>
        </ul>
        <button onclick="closeQuiz()">Fermer</button>
    `;

    modal.style.display = 'block';
}

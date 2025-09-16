document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.querySelector('.splash-screen');
    
    // Ajouter une classe pour l'animation de fondu
    setTimeout(() => {
        splashScreen.style.opacity = '0';
        splashScreen.style.transition = 'opacity 0.5s ease-out';
        
        // Rediriger vers la page principale après l'animation
        setTimeout(() => {
            window.location.href = 'main.html';
        }, 500);
    }, 3000); // Le splash screen reste visible pendant 3 secondes
});

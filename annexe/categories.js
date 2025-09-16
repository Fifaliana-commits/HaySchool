document.addEventListener('DOMContentLoaded', function() {
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            // Animation de sélection
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px)';
                // Redirection vers la page de la catégorie (à implémenter)
                // window.location.href = `${category}.html`;
            }, 200);
        });
    });
});

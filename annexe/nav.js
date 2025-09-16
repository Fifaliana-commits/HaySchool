document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const currentPage = window.location.pathname.split('/').pop();

    // Marquer le lien actif
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'main.html')) {
            link.classList.add('active');
        }
        
        // Ajouter l'effet hover
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Animation du menu burger
    navToggle.addEventListener('click', function() {
        const isOpen = navLinks.classList.contains('active');
        
        if (!isOpen) {
            // Animation d'ouverture
            navLinks.style.display = 'flex';
            setTimeout(() => {
                navLinks.classList.add('active');
                navLinks.style.transform = 'translateX(0)';
                navLinks.style.opacity = '1';
            }, 10);
        } else {
            // Animation de fermeture
            navLinks.style.transform = 'translateX(-100%)';
            navLinks.style.opacity = '0';
            setTimeout(() => {
                navLinks.classList.remove('active');
                navLinks.style.display = 'none';
            }, 300);
        }
    });

    // Fermer le menu quand on clique en dehors
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && navLinks.classList.contains('active')) {
            navToggle.click(); // Utiliser l'animation de fermeture existante
        }
    });

    // Ajout de l'effet de défilement fluide pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Fermer le menu mobile si ouvert
                if (navLinks.classList.contains('active')) {
                    navToggle.click();
                }
            }
        });
    });
});

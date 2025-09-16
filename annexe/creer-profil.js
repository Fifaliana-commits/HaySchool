document.addEventListener('DOMContentLoaded', function() {
    const avatarInput = document.getElementById('avatarInput');
    const previewImg = document.getElementById('previewImg');
    const profileForm = document.getElementById('profileForm');
    const welcomeOverlay = document.querySelector('.welcome-overlay');
    const welcomeAvatar = document.getElementById('welcomeAvatar');
    const welcomeUserInfo = document.getElementById('welcomeUserInfo');
    let currentAvatarUrl = '';

    // Gestion de l'upload d'avatar
    avatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Vérifier si c'est une image
            if (!file.type.startsWith('image/')) {
                alert('Veuillez sélectionner une image valide');
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                currentAvatarUrl = e.target.result;
                previewImg.src = currentAvatarUrl;
                previewImg.style.display = 'block';
                
                // Ajouter une animation simple
                previewImg.style.opacity = '0';
                setTimeout(() => {
                    previewImg.style.opacity = '1';
                    previewImg.style.transition = 'opacity 0.5s ease-in-out';
                }, 100);
            };
            reader.readAsDataURL(file);
        }
    });

    // Gestion du formulaire
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(profileForm);
        const userData = {
            nom: formData.get('nom'),
            prenom: formData.get('prenom'),
            classe: formData.get('classe'),
            genre: formData.get('genre')
        };

        // Afficher l'overlay de bienvenue avec les informations
        welcomeAvatar.src = currentAvatarUrl || 'image/default-avatar.png';
        welcomeUserInfo.innerHTML = `
            <p>Nom: ${userData.nom} ${userData.prenom}</p>
            <p>Classe: ${userData.classe.toUpperCase()}</p>
        `;
        welcomeOverlay.style.display = 'flex';
        
        // Redirection après 3 secondes
        setTimeout(() => {
            window.location.href = 'categories.html';
        }, 3000);
    });

    // Fermer l'overlay de bienvenue au clic
    welcomeOverlay.addEventListener('click', function() {
        window.location.href = 'categories.html';
    });
});

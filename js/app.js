/**
 * Hay School - Application Principale
 * Application éducative interactive pour enfants malgaches
 */

// Import des modules principaux
import { Router } from './router.js';
import { StateManager } from './services/state.js';
import { DataService } from './services/data.js';
import { UIManager } from './services/ui.js';

// Configuration de l'application
const APP_CONFIG = {
    name: 'Hay School',
    version: '1.0.0',
    language: 'fr',
    offlineSupport: true,
    maxRetries: 3,
    cacheVersion: 'v1.0.0'
};

// Classe principale de l'application
class HaySchoolApp {
    constructor() {
        this.config = APP_CONFIG;
        this.isInitialized = false;
        this.isOnline = navigator.onLine;

        // Services principaux
        this.state = new StateManager();
        this.data = new DataService();
        this.ui = new UIManager();
        this.router = null;

        // Gestionnaire d'événements
        this.eventHandlers = {};

        // Initialisation
        this.init();
    }

    /**
     * Initialisation de l'application
     */
    async init() {
        try {
            console.log('🚀 Initialisation de Hay School...');

            // 1. Vérifier la compatibilité du navigateur
            this.checkBrowserCompatibility();

            // 2. Initialiser les services
            await this.initializeServices();

            // 3. Configurer les gestionnaires d'événements
            this.setupEventHandlers();

            // 4. Initialiser le router
            this.initializeRouter();

            // 5. Charger l'application
            await this.loadApplication();

            // 6. Marquer comme initialisé
            this.isInitialized = true;

            console.log('✅ Hay School initialisé avec succès!');

        } catch (error) {
            console.error('❌ Erreur lors de l\'initialisation:', error);
            this.handleInitializationError(error);
        }
    }

    /**
     * Vérifier la compatibilité du navigateur
     */
    checkBrowserCompatibility() {
        const requiredFeatures = [
            'fetch',
            'Promise',
            'localStorage',
            'sessionStorage',
            'ES6 Modules'
        ];

        const missingFeatures = requiredFeatures.filter(feature => {
            switch (feature) {
                case 'fetch':
                    return !window.fetch;
                case 'Promise':
                    return !window.Promise;
                case 'localStorage':
                    return !window.localStorage;
                case 'sessionStorage':
                    return !window.sessionStorage;
                case 'ES6 Modules':
                    return !('import' in document.createElement('script'));
                default:
                    return false;
            }
        });

        if (missingFeatures.length > 0) {
            throw new Error(`Navigateur incompatible. Fonctionnalités manquantes: ${missingFeatures.join(', ')}`);
        }
    }

    /**
     * Initialiser les services
     */
    async initializeServices() {
        console.log('🔧 Initialisation des services...');

        // Initialiser le state manager
        await this.state.init();

        // Initialiser le data service
        await this.data.init();

        // Initialiser l'UI manager
        await this.ui.init();

        console.log('✅ Services initialisés');
    }

    /**
     * Configurer les gestionnaires d'événements
     */
    setupEventHandlers() {
        // Gestionnaire de changement d'état de connexion
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.handleOnlineStatusChange(true);
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.handleOnlineStatusChange(false);
        });

        // Gestionnaire d'erreurs non capturées
        window.addEventListener('error', (event) => {
            console.error('Erreur non capturée:', event.error);
            this.handleError(event.error);
        });

        // Gestionnaire d'erreurs de promesses non gérées
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Promesse rejetée non gérée:', event.reason);
            this.handleError(event.reason);
        });

        // Gestionnaire de visibilité de page
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.handlePageHidden();
            } else {
                this.handlePageVisible();
            }
        });
    }

    /**
     * Initialiser le router
     */
    initializeRouter() {
        this.router = new Router();
        this.router.init();
    }

    /**
     * Charger l'application principale
     */
    async loadApplication() {
        console.log('📱 Chargement de l\'application...');

        // Masquer l'écran de chargement
        const splashScreen = document.getElementById('splash-screen');
        const appContainer = document.getElementById('app');

        if (splashScreen && appContainer) {
            // Animation de transition
            setTimeout(() => {
                splashScreen.style.display = 'none';
                appContainer.style.display = 'block';

                // Animation d'entrée de l'app
                appContainer.style.opacity = '0';
                appContainer.style.transform = 'translateY(20px)';
                appContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

                requestAnimationFrame(() => {
                    appContainer.style.opacity = '1';
                    appContainer.style.transform = 'translateY(0)';
                });
            }, 2000); // Délai minimum pour l'écran de chargement
        }

        // Naviguer vers la page d'accueil
        if (this.router) {
            this.router.navigate('/');
        }

        console.log('✅ Application chargée');
    }

    /**
     * Gestionnaire de changement d'état de connexion
     */
    handleOnlineStatusChange(isOnline) {
        console.log(`📡 État de connexion changé: ${isOnline ? 'En ligne' : 'Hors ligne'}`);

        // Mettre à jour l'état de l'application
        this.state.set('isOnline', isOnline);

        // Notifier les composants
        this.emit('connectionStatusChanged', { isOnline });

        // Afficher une notification
        if (isOnline) {
            this.ui.showNotification('Connexion rétablie', 'success');
        } else {
            this.ui.showNotification('Mode hors ligne activé', 'warning');
        }
    }

    /**
     * Gestionnaire d'erreurs d'initialisation
     */
    handleInitializationError(error) {
        console.error('Erreur d\'initialisation:', error);

        // Masquer l'écran de chargement
        const splashScreen = document.getElementById('splash-screen');
        const errorContainer = document.getElementById('error-container');

        if (splashScreen && errorContainer) {
            splashScreen.style.display = 'none';
            errorContainer.style.display = 'flex';

            // Configurer le bouton de retry
            const retryButton = document.getElementById('retry-button');
            if (retryButton) {
                retryButton.addEventListener('click', () => {
                    window.location.reload();
                });
            }
        }
    }

    /**
     * Gestionnaire d'erreurs générales
     */
    handleError(error) {
        console.error('Erreur dans l\'application:', error);

        // Afficher une notification d'erreur
        this.ui.showNotification('Une erreur est survenue', 'error');

        // Enregistrer l'erreur dans l'état
        this.state.set('lastError', {
            message: error.message,
            stack: error.stack,
            timestamp: Date.now()
        });
    }

    /**
     * Gestionnaire de page masquée
     */
    handlePageHidden() {
        // Sauvegarder l'état automatiquement
        this.state.saveToStorage();
    }

    /**
     * Gestionnaire de page visible
     */
    handlePageVisible() {
        // Recharger l'état si nécessaire
        this.state.loadFromStorage();
    }

    /**
     * Émettre un événement personnalisé
     */
    emit(eventName, data) {
        if (this.eventHandlers[eventName]) {
            this.eventHandlers[eventName].forEach(handler => {
                try {
                    handler(data);
                } catch (error) {
                    console.error(`Erreur dans le gestionnaire d'événement ${eventName}:`, error);
                }
            });
        }
    }

    /**
     * Écouter un événement personnalisé
     */
    on(eventName, handler) {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(handler);
    }

    /**
     * Supprimer un écouteur d'événement
     */
    off(eventName, handler) {
        if (this.eventHandlers[eventName]) {
            const index = this.eventHandlers[eventName].indexOf(handler);
            if (index > -1) {
                this.eventHandlers[eventName].splice(index, 1);
            }
        }
    }

    /**
     * Obtenir l'instance de l'application
     */
    static getInstance() {
        if (!HaySchoolApp.instance) {
            HaySchoolApp.instance = new HaySchoolApp();
        }
        return HaySchoolApp.instance;
    }
}

// Initialisation globale
window.HaySchool = HaySchoolApp.getInstance();

// Export pour les modules ES6
export default HaySchoolApp;

// Démarrage automatique quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌟 DOM chargé, démarrage de Hay School...');
    // L'instance est déjà créée ci-dessus
});


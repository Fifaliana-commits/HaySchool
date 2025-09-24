/**
 * Router - Gestionnaire de navigation pour Hay School
 * Gère le routage SPA (Single Page Application) avec hash routing
 */

import { HomeView } from './views/home.js';
import { CategoriesView } from './views/categories.js';
import { ProfileView } from './views/profile.js';
import { AboutView } from './views/about.js';
import { SubjectView } from './views/subject.js';

export class Router {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;
        this.currentView = null;
        this.isInitialized = false;

        // Configuration des routes
        this.setupRoutes();
    }

    /**
     * Configuration des routes disponibles
     */
    setupRoutes() {
        // Routes principales
        this.routes.set('/', {
            view: HomeView,
            title: 'Hay School - Accueil',
            requiresAuth: false
        });

        this.routes.set('/categories', {
            view: CategoriesView,
            title: 'Hay School - Catégories',
            requiresAuth: false
        });

        this.routes.set('/profile', {
            view: ProfileView,
            title: 'Hay School - Profil',
            requiresAuth: false
        });

        this.routes.set('/about', {
            view: AboutView,
            title: 'Hay School - À propos',
            requiresAuth: false
        });

        // Routes dynamiques pour les matières
        this.routes.set('/subject/:subjectId', {
            view: SubjectView,
            title: 'Hay School - Matière',
            requiresAuth: false,
            dynamic: true
        });

        // Routes spéciales
        this.routes.set('/privacy', {
            view: AboutView, // Temporairement, créer une vue dédiée plus tard
            title: 'Hay School - Confidentialité',
            requiresAuth: false
        });

        this.routes.set('/terms', {
            view: AboutView, // Temporairement
            title: 'Hay School - Conditions',
            requiresAuth: false
        });

        this.routes.set('/contact', {
            view: AboutView, // Temporairement
            title: 'Hay School - Contact',
            requiresAuth: false
        });
    }

    /**
     * Initialisation du router
     */
    init() {
        if (this.isInitialized) return;

        console.log('🚦 Initialisation du router...');

        // Écouter les changements de hash
        window.addEventListener('hashchange', () => {
            this.handleRouteChange();
        });

        // Écouter les clics sur les liens de navigation
        this.setupNavigationListeners();

        // Gérer la route initiale
        this.handleInitialRoute();

        this.isInitialized = true;
        console.log('✅ Router initialisé');
    }

    /**
     * Configuration des écouteurs de navigation
     */
    setupNavigationListeners() {
        // Écouter les clics sur les liens avec data-route
        document.addEventListener('click', (event) => {
            const link = event.target.closest('[data-route]');
            if (link) {
                event.preventDefault();
                const route = link.getAttribute('data-route');
                this.navigate(route);
            }
        });

        // Écouter les clics sur les liens href="#/..."
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a[href^="#/"]');
            if (link) {
                event.preventDefault();
                const href = link.getAttribute('href');
                this.navigate(href.substring(1)); // Supprimer le #
            }
        });
    }

    /**
     * Gestion de la route initiale
     */
    handleInitialRoute() {
        const hash = window.location.hash;
        if (hash) {
            this.handleRouteChange(hash.substring(1));
        } else {
            // Route par défaut
            this.navigate('/');
        }
    }

    /**
     * Navigation vers une route
     */
    navigate(path, options = {}) {
        const {
            replace = false,
            data = null
        } = options;

        // Normaliser le chemin
        const normalizedPath = this.normalizePath(path);

        // Vérifier si la route existe
        const routeConfig = this.findRoute(normalizedPath);
        if (!routeConfig) {
            console.warn(`Route non trouvée: ${normalizedPath}`);
            this.navigate('/404');
            return;
        }

        // Vérifier l'authentification si nécessaire
        if (routeConfig.requiresAuth && !this.isAuthenticated()) {
            console.warn('Authentification requise pour cette route');
            this.navigate('/login');
            return;
        }

        // Mettre à jour l'URL
        if (replace) {
            window.location.replace(`#${normalizedPath}`);
        } else {
            window.location.hash = normalizedPath;
        }

        // Naviguer vers la route
        this.handleRouteChange(normalizedPath, data);
    }

    /**
     * Gestion du changement de route
     */
    handleRouteChange(path, data = null) {
        const currentPath = path || window.location.hash.substring(1) || '/';
        const normalizedPath = this.normalizePath(currentPath);

        console.log(`🔄 Navigation vers: ${normalizedPath}`);

        // Trouver la configuration de route
        const routeConfig = this.findRoute(normalizedPath);
        if (!routeConfig) {
            console.warn(`Route non trouvée: ${normalizedPath}`);
            return;
        }

        // Extraire les paramètres de route
        const params = this.extractParams(normalizedPath, routeConfig);

        // Mettre à jour le titre de la page
        this.updatePageTitle(routeConfig.title, params);

        // Mettre à jour la navigation active
        this.updateActiveNavigation(normalizedPath);

        // Rendre la nouvelle vue
        this.renderView(routeConfig, params, data);

        // Mettre à jour la route courante
        this.currentRoute = normalizedPath;
    }

    /**
     * Recherche d'une route correspondante
     */
    findRoute(path) {
        // Recherche exacte d'abord
        if (this.routes.has(path)) {
            return { ...this.routes.get(path), path };
        }

        // Recherche de routes dynamiques
        for (const [routePath, config] of this.routes) {
            if (config.dynamic && this.matchDynamicRoute(path, routePath)) {
                return { ...config, path: routePath };
            }
        }

        return null;
    }

    /**
     * Vérification de correspondance pour routes dynamiques
     */
    matchDynamicRoute(path, routePattern) {
        const pathParts = path.split('/').filter(p => p);
        const patternParts = routePattern.split('/').filter(p => p);

        if (pathParts.length !== patternParts.length) {
            return false;
        }

        for (let i = 0; i < patternParts.length; i++) {
            const patternPart = patternParts[i];
            const pathPart = pathParts[i];

            // Si ce n'est pas un paramètre dynamique, doit correspondre exactement
            if (!patternPart.startsWith(':')) {
                if (patternPart !== pathPart) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Extraction des paramètres de route
     */
    extractParams(path, routeConfig) {
        const params = {};

        if (routeConfig.dynamic) {
            const pathParts = path.split('/').filter(p => p);
            const patternParts = routeConfig.path.split('/').filter(p => p);

            for (let i = 0; i < patternParts.length; i++) {
                const patternPart = patternParts[i];
                if (patternPart.startsWith(':')) {
                    const paramName = patternPart.substring(1);
                    params[paramName] = pathParts[i];
                }
            }
        }

        return params;
    }

    /**
     * Normalisation du chemin
     */
    normalizePath(path) {
        // S'assurer que le chemin commence par /
        let normalized = path.startsWith('/') ? path : `/${path}`;

        // Supprimer les slashes multiples
        normalized = normalized.replace(/\/+/g, '/');

        // S'assurer qu'il n'y a pas de slash final (sauf pour la racine)
        if (normalized !== '/' && normalized.endsWith('/')) {
            normalized = normalized.slice(0, -1);
        }

        return normalized;
    }

    /**
     * Mise à jour du titre de la page
     */
    updatePageTitle(baseTitle, params) {
        let title = baseTitle;

        // Personnaliser le titre avec les paramètres si nécessaire
        if (params.subjectId) {
            const subjectNames = {
                'math': 'Mathématiques',
                'francais': 'Français',
                'sciences': 'Sciences',
                'histoire': 'Histoire',
                'geographie': 'Géographie',
                'anglais': 'Anglais'
            };
            title = `Hay School - ${subjectNames[params.subjectId] || 'Matière'}`;
        }

        document.title = title;
    }

    /**
     * Mise à jour de la navigation active
     */
    updateActiveNavigation(activePath) {
        // Supprimer la classe active de tous les liens
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Ajouter la classe active au lien correspondant
        const activeLink = document.querySelector(`[data-route="${activePath}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Gérer les routes spéciales
        if (activePath.startsWith('/subject/')) {
            const categoriesLink = document.querySelector('[data-route="/categories"]');
            if (categoriesLink) {
                categoriesLink.classList.add('active');
            }
        }
    }

    /**
     * Rendu d'une vue
     */
    async renderView(routeConfig, params, data) {
        try {
            const mainContent = document.getElementById('main-content');
            if (!mainContent) {
                console.error('Conteneur de contenu principal non trouvé');
                return;
            }

            // Afficher un indicateur de chargement
            mainContent.innerHTML = `
                <div class="loading-container">
                    <div class="loading-spinner">
                        <div class="spinner"></div>
                    </div>
                    <p>Chargement...</p>
                </div>
            `;

            // Créer l'instance de la vue
            const ViewClass = routeConfig.view;
            const viewInstance = new ViewClass(params, data);

            // Rendre la vue
            const viewHtml = await viewInstance.render();

            // Injecter le contenu
            mainContent.innerHTML = viewHtml;

            // Initialiser la vue
            if (viewInstance.init) {
                await viewInstance.init();
            }

            // Mettre à jour la vue courante
            this.currentView = viewInstance;

            // Faire défiler vers le haut
            window.scrollTo(0, 0);

        } catch (error) {
            console.error('Erreur lors du rendu de la vue:', error);
            this.renderErrorView(error);
        }
    }

    /**
     * Rendu d'une vue d'erreur
     */
    renderErrorView(error) {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="error-view">
                    <div class="error-content">
                        <i class="fas fa-exclamation-triangle error-icon"></i>
                        <h2>Erreur de chargement</h2>
                        <p>Impossible de charger cette page.</p>
                        <p class="error-details">${error.message}</p>
                        <button onclick="window.location.reload()" class="retry-button">
                            Recharger la page
                        </button>
                    </div>
                </div>
            `;
        }
    }

    /**
     * Vérification de l'authentification
     */
    isAuthenticated() {
        // TODO: Implémenter la vérification d'authentification
        // Pour l'instant, toujours retourner true
        return true;
    }

    /**
     * Retour en arrière
     */
    back() {
        window.history.back();
    }

    /**
     * Aller à la page suivante
     */
    forward() {
        window.history.forward();
    }

    /**
     * Rafraîchir la route courante
     */
    refresh() {
        this.handleRouteChange(this.currentRoute);
    }

    /**
     * Obtenir la route courante
     */
    getCurrentRoute() {
        return this.currentRoute;
    }

    /**
     * Obtenir la vue courante
     */
    getCurrentView() {
        return this.currentView;
    }

    /**
     * Nettoyer les ressources du router
     */
    destroy() {
        window.removeEventListener('hashchange', this.handleRouteChange);
        this.routes.clear();
        this.currentView = null;
        this.currentRoute = null;
        this.isInitialized = false;
    }
}

// Export par défaut
export default Router;


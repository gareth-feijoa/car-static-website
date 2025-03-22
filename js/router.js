export class Router {
    constructor(routes) {
        this.routes = routes;
        this.currentRoute = null;
        this.init();
    }

    init() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => this.handleRoute());
        
        // Handle initial route
        this.handleRoute();
    }

    handleRoute() {
        const path = window.location.pathname;
        const route = this.routes.find(r => r.path === path) || this.routes[0];
        
        if (this.currentRoute !== route) {
            this.currentRoute = route;
            route.handler();
        }
    }

    navigate(path) {
        window.history.pushState({}, '', path);
        this.handleRoute();
    }
} 
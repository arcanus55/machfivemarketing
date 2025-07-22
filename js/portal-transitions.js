// Lightweight Portal Transitions - For main pages only
class PortalTransitions {
    constructor() {
        this.isTransitioning = false;
        this.transitionDuration = 400;
        this.init();
    }

    init() {
        // Create transition overlay
        this.createOverlay();
        
        // Intercept portal links only
        this.interceptPortalLinks();
    }

    createOverlay() {
        // Remove existing overlay if it exists
        const existingOverlay = document.querySelector('.page-transition-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }

        this.overlay = document.createElement('div');
        this.overlay.className = 'page-transition-overlay';
        this.overlay.innerHTML = `
            <div class="transition-content">
                <div class="transition-logo">
                    <img src="/img/Logo_M5M Light Web.png" alt="Mach Five Marketing" height="60">
                </div>
                <div class="transition-spinner"></div>
            </div>
        `;
        document.body.appendChild(this.overlay);
    }

    interceptPortalLinks() {
        // Remove existing listeners to prevent duplicates
        document.removeEventListener('click', this.portalLinkHandler);
        
        this.portalLinkHandler = (e) => {
            const link = e.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href');
            
            // Only handle portal links
            if (!href || !href.startsWith('/portal/')) {
                return;
            }

            e.preventDefault();
            this.navigateToPortal(href);
        };

        document.addEventListener('click', this.portalLinkHandler);
    }

    async navigateToPortal(url) {
        if (this.isTransitioning) {
            console.log('Portal transition already in progress, skipping');
            return;
        }

        console.log('Navigating to portal:', url);
        this.isTransitioning = true;

        try {
            // Animate current page out
            await this.animatePageOut();
            
            // Navigate to portal
            window.location.href = url;
        } catch (error) {
            console.error('Portal navigation error:', error);
            // Fallback to normal navigation
            window.location.href = url;
        }
    }

    async animatePageOut() {
        return new Promise((resolve) => {
            console.log('Animating page out to portal');
            
            // Fade out main content
            const mainContent = document.querySelector('.page-content, main, .hero, .experience-section');
            if (mainContent) {
                mainContent.style.transition = `opacity ${this.transitionDuration}ms ease-out, transform ${this.transitionDuration}ms ease-out`;
                mainContent.style.opacity = '0';
                mainContent.style.transform = 'translateY(20px)';
            }

            // Show overlay with logo
            this.overlay.style.opacity = '1';
            this.overlay.style.visibility = 'visible';

            setTimeout(resolve, this.transitionDuration);
        });
    }
}

// Initialize portal transitions when DOM is ready (only on main pages)
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    
    // Only initialize on main pages (not portal pages)
    if (currentPath === '/' || currentPath === '/about.html') {
        console.log('Initializing PortalTransitions for main page');
        window.portalTransitions = new PortalTransitions();
    } else {
        console.log('Skipping PortalTransitions - portal page or other');
    }
}); 
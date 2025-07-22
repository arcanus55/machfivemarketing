// Smooth Page Transitions - Improved Version
class PageTransitions {
    constructor() {
        this.isTransitioning = false;
        this.transitionDuration = 400;
        this.init();
    }

    init() {
        // Create transition overlay
        this.createOverlay();
        
        // Intercept all internal links
        this.interceptLinks();
        
        // Handle browser back/forward
        this.handleBrowserNavigation();
        
        // Initial page load animation
        this.animatePageIn();
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

    interceptLinks() {
        // Remove existing listeners to prevent duplicates
        document.removeEventListener('click', this.linkHandler);
        
        this.linkHandler = (e) => {
            const link = e.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href');
            
            // Skip external links, anchors, and special protocols
            if (!href || 
                href.startsWith('#') || 
                href.startsWith('mailto:') || 
                href.startsWith('tel:') || 
                href.startsWith('http') ||
                href.startsWith('javascript:') ||
                link.target === '_blank' ||
                link.hasAttribute('download')) {
                return;
            }

            // Skip if already on the same page
            if (href === window.location.pathname) {
                return;
            }

            // Check if this is a portal-related navigation
            const isPortalNavigation = href.startsWith('/portal') || 
                                     href === '/customer-portal/' ||
                                     window.location.pathname.startsWith('/portal') ||
                                     window.location.pathname === '/customer-portal/';

            if (isPortalNavigation) {
                e.preventDefault();
                this.navigateTo(href);
            }
            // For non-portal navigation, let it happen normally
        };

        document.addEventListener('click', this.linkHandler);
    }

    handleBrowserNavigation() {
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.loadPage(e.state.page, false);
            }
        });
    }

    async navigateTo(url) {
        if (this.isTransitioning) {
            console.log('Transition already in progress, skipping');
            return;
        }

        console.log('Navigating to:', url);
        this.isTransitioning = true;

        try {
            // Animate current page out
            await this.animatePageOut();
            
            // Load and animate new page in
            await this.loadPage(url, true);
        } catch (error) {
            console.error('Navigation error:', error);
            // Fallback to normal navigation
            window.location.href = url;
        } finally {
            this.isTransitioning = false;
        }
    }

    async animatePageOut() {
        return new Promise((resolve) => {
            console.log('Animating page out');
            
            // Fade out main content
            const mainContent = document.querySelector('.page-content, main');
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

    async loadPage(url, updateHistory = true) {
        try {
            console.log('Loading page:', url);
            
            // Fetch new page content
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const html = await response.text();
            
            // Parse the HTML
            const parser = new DOMParser();
            const newDoc = parser.parseFromString(html, 'text/html');
            
            // Extract main content
            const newContent = newDoc.querySelector('.page-content, main');
            const newTitle = newDoc.querySelector('title');
            
            if (!newContent) {
                console.log('No main content found, using fallback navigation');
                window.location.href = url;
                return;
            }

            // Update page content
            const currentContent = document.querySelector('.page-content, main');
            if (currentContent) {
                currentContent.innerHTML = newContent.innerHTML;
            }

            // Update title
            if (newTitle) {
                document.title = newTitle.textContent;
            }

            // Update URL and history
            if (updateHistory) {
                window.history.pushState({ page: url }, document.title, url);
            }

            // Animate new page in
            await this.animatePageIn();

        } catch (error) {
            console.error('Page loading error:', error);
            throw error; // Re-throw to trigger fallback
        }
    }

    async animatePageIn() {
        return new Promise((resolve) => {
            console.log('Animating page in');
            
            // Hide overlay
            this.overlay.style.opacity = '0';
            setTimeout(() => {
                this.overlay.style.visibility = 'hidden';
            }, this.transitionDuration);

            // Animate content in
            const mainContent = document.querySelector('.page-content, main');
            if (mainContent) {
                // Reset styles first
                mainContent.style.opacity = '0';
                mainContent.style.transform = 'translateY(20px)';
                
                // Force reflow
                mainContent.offsetHeight;
                
                // Animate in
                mainContent.style.transition = `opacity ${this.transitionDuration}ms ease-out, transform ${this.transitionDuration}ms ease-out`;
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
            }

            // Reinitialize page-specific functionality
            this.reinitializePage();

            setTimeout(resolve, this.transitionDuration);
        });
    }

    reinitializePage() {
        console.log('Reinitializing page functionality');
        
        // Reinitialize scroll animations
        this.initializeScrollAnimations();
        
        // Reinitialize mobile menu
        this.initializeMobileMenu();
        
        // Reinitialize any page-specific functionality
        this.initializePageSpecific();
    }

    initializeScrollAnimations() {
        // Remove existing observers
        if (this.scrollObserver) {
            this.scrollObserver.disconnect();
        }

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.scrollObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.content-block').forEach(block => {
            this.scrollObserver.observe(block);
        });
    }

    initializeMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const menuOverlay = document.querySelector('.menu-overlay');

        if (mobileMenuToggle && navMenu && menuOverlay) {
            // Remove existing listeners by cloning
            const newToggle = mobileMenuToggle.cloneNode(true);
            mobileMenuToggle.parentNode.replaceChild(newToggle, mobileMenuToggle);

            newToggle.addEventListener('click', function() {
                newToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                menuOverlay.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });

            menuOverlay.addEventListener('click', function() {
                newToggle.classList.remove('active');
                navMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });

            // Close menu when clicking on a link
            navMenu.addEventListener('click', function(e) {
                if (e.target.tagName === 'A') {
                    newToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    menuOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    initializePageSpecific() {
        const currentPath = window.location.pathname;
        console.log('Initializing page-specific functionality for:', currentPath);
        
        if (currentPath === '/') {
            this.initializeHomepage();
        } else if (currentPath === '/about.html') {
            this.initializeAboutPage();
        }
    }

    initializeHomepage() {
        // Initialize homepage scroll-locked experience if it exists
        if (typeof StepExperience !== 'undefined') {
            console.log('Initializing StepExperience');
            // Remove existing instance if any
            if (window.stepExperience) {
                window.stepExperience.destroy();
            }
            window.stepExperience = new StepExperience();
        }
    }

    initializeAboutPage() {
        console.log('About page initialized');
        // About page specific initialization if needed
    }
}

// Initialize page transitions only on portal page
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    
    // Only initialize page transitions on portal pages
    if (currentPath.startsWith('/portal') || currentPath === '/customer-portal/') {
        console.log('Initializing PageTransitions for portal page');
        window.pageTransitions = new PageTransitions();
    } else {
        console.log('Skipping PageTransitions - not a portal page');
    }
}); 
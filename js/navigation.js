// ============================================
// NAVIGATION SYSTEM
// A₹UN $HEKHAR Portfolio
// ============================================

class NavigationSystem {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.mobileToggle = document.getElementById('mobileToggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.isScrolling = false;
        this.currentSection = 'home';
        
        this.init();
    }

    init() {
        this.bindScrollEvents();
        this.bindNavigationEvents();
        this.bindMobileMenuEvents();
        this.initSmoothScroll();
        this.updateActiveSection();
    }

    bindScrollEvents() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Throttled scroll handler for performance
        this.handleScroll();
    }

    handleScroll() {
        const scrollY = window.scrollY;
        
        // Update navbar appearance
        this.updateNavbarAppearance(scrollY);
        
        // Update active section
        this.updateActiveSection();
        
        // Show/hide scroll-to-top button
        this.updateScrollToTopButton(scrollY);
    }

    updateNavbarAppearance(scrollY) {
        if (!this.navbar) return;

        if (scrollY > 100) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }

        // Add transparency effect based on scroll
        const opacity = Math.min(0.95, 0.7 + (scrollY / 1000));
        this.navbar.style.setProperty('--nav-opacity', opacity);
    }

    updateActiveSection() {
        let current = 'home';
        const offset = 200; // Offset for better detection

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.scrollY + offset;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        if (current !== this.currentSection) {
            this.currentSection = current;
            this.updateNavLinkStates(current);
        }
    }

    updateNavLinkStates(activeSection) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            
            const href = link.getAttribute('href');
            if (href === `#${activeSection}`) {
                link.classList.add('active');
            }
        });
    }

    updateScrollToTopButton(scrollY) {
        let scrollToTopBtn = document.getElementById('scrollToTop');
        
        if (!scrollToTopBtn) {
            scrollToTopBtn = this.createScrollToTopButton();
        }

        if (scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }

    createScrollToTopButton() {
        const button = document.createElement('button');
        button.id = 'scrollToTop';
        button.className = 'scroll-to-top';
        button.innerHTML = '<i class="fas fa-chevron-up"></i>';
        button.setAttribute('aria-label', 'Scroll to top');
        
        // Add styles
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--portfolio-gradient-button);
            border: none;
            border-radius: 50%;
            color: white;
            font-size: 18px;
            cursor: pointer;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 188, 212, 0.3);
        `;

        // Add hover effect
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px) scale(1.1)';
            button.style.boxShadow = '0 8px 25px rgba(0, 188, 212, 0.4)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = button.classList.contains('visible') ? 'translateY(0)' : 'translateY(20px)';
            button.style.boxShadow = '0 4px 15px rgba(0, 188, 212, 0.3)';
        });

        // Add click handler
        button.addEventListener('click', () => {
            this.scrollToTop();
        });

        // Add visible class styles
        const style = document.createElement('style');
        style.textContent = `
            .scroll-to-top.visible {
                opacity: 1 !important;
                visibility: visible !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(button);
        return button;
    }

    bindNavigationEvents() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                this.scrollToSection(targetId);
            });
        });

        // Handle logo click
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToSection('#home');
            });
        }
    }

    bindMobileMenuEvents() {
        if (!this.mobileToggle || !this.navMenu) return;

        this.mobileToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target) && this.navMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });

        // Close mobile menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.mobileToggle.classList.toggle('active');
        
        // Animate hamburger lines
        const spans = this.mobileToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (this.mobileToggle.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = '';
                span.style.opacity = '';
            }
        });

        // Prevent body scroll when menu is open
        if (this.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset hamburger lines
        const spans = this.mobileToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = '';
            span.style.opacity = '';
        });
    }

    initSmoothScroll() {
        // Polyfill for older browsers
        if (!window.CSS || !CSS.supports('scroll-behavior', 'smooth')) {
            this.smoothScrollPolyfill();
        }
    }

    scrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;

        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
        
        if (window.CSS && CSS.supports('scroll-behavior', 'smooth')) {
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        } else {
            this.smoothScrollTo(offsetTop);
        }

        // Update URL without triggering scroll
        if (history.pushState) {
            history.pushState(null, null, targetId);
        }
    }

    scrollToTop() {
        if (window.CSS && CSS.supports('scroll-behavior', 'smooth')) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            this.smoothScrollTo(0);
        }
    }

    smoothScrollTo(targetY) {
        const startY = window.scrollY;
        const distance = targetY - startY;
        const duration = 800;
        let startTime = null;

        const easeInOutCubic = (t) => {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            window.scrollTo(0, startY + distance * easeInOutCubic(progress));
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    }

    smoothScrollPolyfill() {
        // Simple polyfill for smooth scrolling
        const style = document.createElement('style');
        style.textContent = `
            html {
                scroll-behavior: smooth;
            }
        `;
        document.head.appendChild(style);
    }

    // Public methods
    goToSection(sectionId) {
        this.scrollToSection(`#${sectionId}`);
    }

    getCurrentSection() {
        return this.currentSection;
    }

    setActiveSection(sectionId) {
        this.currentSection = sectionId;
        this.updateNavLinkStates(sectionId);
    }

    // Keyboard navigation
    initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        this.goToSection('home');
                        break;
                    case '2':
                        e.preventDefault();
                        this.goToSection('about');
                        break;
                    case '3':
                        e.preventDefault();
                        this.goToSection('tech');
                        break;
                    case '4':
                        e.preventDefault();
                        this.goToSection('projects');
                        break;
                    case '5':
                        e.preventDefault();
                        this.goToSection('contact');
                        break;
                }
            }
        });
    }

    // Update mobile menu styles
    initMobileMenuStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 767px) {
                .nav-menu {
                    position: fixed;
                    top: 70px;
                    left: 0;
                    width: 100%;
                    height: calc(100vh - 70px);
                    background: var(--nav-mobile);
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    padding: 2rem 0;
                    transform: translateX(-100%);
                    transition: transform 0.3s ease;
                    z-index: 999;
                }
                
                .nav-menu.active {
                    transform: translateX(0);
                }
                
                .nav-menu li {
                    margin: 1rem 0;
                }
                
                .nav-link {
                    font-size: 1.2rem;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }
                
                .nav-link:hover {
                    background: rgba(0, 188, 212, 0.1);
                }
            }
        `;
        document.head.appendChild(style);
    }

    destroy() {
        // Remove event listeners
        window.removeEventListener('scroll', this.handleScroll);
        
        // Remove scroll to top button
        const scrollToTopBtn = document.getElementById('scrollToTop');
        if (scrollToTopBtn) {
            scrollToTopBtn.remove();
        }
    }
}

// Initialize navigation with enhanced features
function initNavigation() {
    const navigation = new NavigationSystem();
    navigation.initKeyboardNavigation();
    navigation.initMobileMenuStyles();
    return navigation;
}

// Export for use in other modules
window.NavigationSystem = NavigationSystem;
window.initNavigation = initNavigation;
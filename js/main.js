// ============================================
// MAIN APPLICATION ENTRY POINT
// A₹UN $HEKHAR Portfolio
// ============================================

class PortfolioApp {
    constructor() {
        this.systems = {};
        this.isInitialized = false;
        this.init();
    }

    async init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    initialize() {
        console.log('🎨 Initializing A₹UN $HEKHAR Portfolio...');
        
        try {
            // Initialize systems in order
            this.initParticleSystem();
            this.initCursorSystem();
            this.initNavigationSystem();
            this.initAnimationSystem();
            this.initIntroSystem();
            this.initFormSystem();
            this.initThemeSystem();
            this.initPerformanceOptimizations();
            
            this.isInitialized = true;
            console.log('✅ Portfolio initialized successfully!');
            console.log('⚡ All animations and interactions are active');
            console.log('🎯 Built with love by A₹UN $HEKHAR');
            
            // Analytics and debugging
            this.setupAnalytics();
            this.setupErrorHandling();
            
        } catch (error) {
            console.error('❌ Error initializing portfolio:', error);
            this.handleInitializationError(error);
        }
    }

    initParticleSystem() {
        if (window.ParticleSystem) {
            this.systems.particles = new ParticleSystem();
            console.log('🎯 Particle system initialized');
        }
    }

    initCursorSystem() {
        if (window.initCursorSystem && window.innerWidth > 768) {
            this.systems.cursor = initCursorSystem();
            console.log('🖱️ Custom cursor system initialized');
        }
    }

    initNavigationSystem() {
        if (window.initNavigation) {
            this.systems.navigation = initNavigation();
            console.log('🧭 Navigation system initialized');
        }
    }

    initAnimationSystem() {
        if (window.initAnimations) {
            this.systems.animations = initAnimations();
            console.log('✨ Animation system initialized');
        }
    }

    initIntroSystem() {
        this.systems.intro = new IntroSystem();
        console.log('🎬 Intro system initialized');
    }

    initFormSystem() {
        this.systems.form = new FormSystem();
        console.log('📧 Form system initialized');
    }

    initThemeSystem() {
        this.systems.theme = new ThemeSystem();
        console.log('🌓 Theme system initialized');
    }

    initPerformanceOptimizations() {
        this.setupPerformanceMonitoring();
        this.setupLazyLoading();
        this.optimizeForMobile();
        console.log('⚡ Performance optimizations applied');
    }

    setupPerformanceMonitoring() {
        // Monitor FPS
        let lastTime = performance.now();
        let frameCount = 0;
        
        const checkFPS = (currentTime) => {
            frameCount++;
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                if (fps < 30 && window.innerWidth > 768) {
                    this.optimizeForLowFPS();
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(checkFPS);
        };
        
        requestAnimationFrame(checkFPS);
    }

    optimizeForLowFPS() {
        // Reduce particle count
        if (this.systems.particles) {
            const currentCount = this.systems.particles.particles.length;
            if (currentCount > 50) {
                this.systems.particles.particles.splice(50);
                console.log('🔧 Optimized particle count for better performance');
            }
        }
        
        // Reduce animation complexity
        const shapes = document.querySelectorAll('.floating-shapes .shape');
        shapes.forEach((shape, index) => {
            if (index > 3) {
                shape.style.display = 'none';
            }
        });
    }

    setupLazyLoading() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }

    optimizeForMobile() {
        if (window.innerWidth <= 768) {
            // Disable cursor system
            if (this.systems.cursor) {
                this.systems.cursor.cursor.hide();
            }
            
            // Simplify animations
            document.body.classList.add('mobile-optimized');
            
            // Reduce background complexity
            const waves = document.querySelectorAll('.wave');
            waves.forEach((wave, index) => {
                if (index > 2) {
                    wave.style.display = 'none';
                }
            });
            
            console.log('📱 Mobile optimizations applied');
        }
    }

    setupAnalytics() {
        // Simple analytics without external dependencies
        const analytics = {
            startTime: Date.now(),
            interactions: 0,
            sections: []
        };
        
        // Track interactions
        document.addEventListener('click', () => {
            analytics.interactions++;
        });
        
        // Track section visits
        if (this.systems.navigation) {
            const originalGoToSection = this.systems.navigation.goToSection;
            this.systems.navigation.goToSection = function(sectionId) {
                analytics.sections.push({ section: sectionId, time: Date.now() });
                return originalGoToSection.call(this, sectionId);
            };
        }
        
        // Log session summary when leaving
        window.addEventListener('beforeunload', () => {
            const sessionTime = Date.now() - analytics.startTime;
            console.log('📊 Session Summary:', {
                duration: Math.round(sessionTime / 1000) + 's',
                interactions: analytics.interactions,
                sectionsVisited: analytics.sections.length
            });
        });
        
        this.analytics = analytics;
    }

    setupErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('🚨 JavaScript Error:', event.error);
            this.handleError(event.error);
        });
        
        window.addEventListener('unhandledrejection', (event) => {
            console.error('🚨 Unhandled Promise Rejection:', event.reason);
            this.handleError(event.reason);
        });
    }

    handleError(error) {
        // Graceful error handling
        const errorMessage = error.message || 'Unknown error occurred';
        
        // Don't break the entire app for minor errors
        if (errorMessage.includes('particle') || errorMessage.includes('animation')) {
            console.warn('⚠️ Non-critical error, continuing...');
            return;
        }
        
        // For critical errors, provide fallback
        this.enableFallbackMode();
    }

    handleInitializationError(error) {
        console.warn('⚠️ Some features may not work due to initialization error');
        
        // Enable basic functionality
        this.enableFallbackMode();
    }

    enableFallbackMode() {
        console.log('🔄 Enabling fallback mode...');
        
        // Disable complex animations
        document.body.classList.add('fallback-mode');
        
        // Ensure basic navigation works
        if (!this.systems.navigation) {
            this.initBasicNavigation();
        }
        
        // Ensure form submission works
        if (!this.systems.form) {
            this.initBasicForm();
        }
    }

    initBasicNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    initBasicForm() {
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Thank you for your message! I will get back to you soon.');
                form.reset();
            });
        }
    }

    // Public API methods
    getSystem(name) {
        return this.systems[name];
    }

    isReady() {
        return this.isInitialized;
    }

    restart() {
        this.destroy();
        setTimeout(() => this.initialize(), 100);
    }

    destroy() {
        Object.values(this.systems).forEach(system => {
            if (system && typeof system.destroy === 'function') {
                system.destroy();
            }
        });
        this.systems = {};
        this.isInitialized = false;
    }
}

// ============================================
// INTRO SYSTEM
// ============================================
class IntroSystem {
    constructor() {
        this.overlay = document.getElementById('introOverlay');
        this.typingText = document.getElementById('typingText');
        this.isVisible = true;
        this.init();
    }

    init() {
        if (!this.overlay) return;
        
        this.setupTypingAnimation();
        
        setTimeout(() => {
            this.hideIntro();
        }, 4000);
    }

    setupTypingAnimation() {
        if (!this.typingText) return;
        
        const text = this.typingText.textContent;
        this.typingText.textContent = '';
        
        let index = 0;
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                this.typingText.textContent += text[index];
                index++;
            } else {
                clearInterval(typeInterval);
            }
        }, 80);
    }

    hideIntro() {
        if (!this.overlay) return;
        
        this.overlay.classList.add('hidden');
        this.isVisible = false;
        
        setTimeout(() => {
            this.overlay.style.display = 'none';
        }, 1000);
    }

    show() {
        if (!this.overlay) return;
        
        this.overlay.style.display = 'flex';
        this.overlay.classList.remove('hidden');
        this.isVisible = true;
    }
}

// ============================================
// FORM SYSTEM
// ============================================
class FormSystem {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (!this.form) return;
        
        this.bindEvents();
        this.setupValidation();
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    }

    setupValidation() {
        const style = document.createElement('style');
        style.textContent = `
            .form-group.error input,
            .form-group.error textarea {
                border-color: #f44336;
                box-shadow: 0 0 10px rgba(244, 67, 54, 0.3);
            }
            
            .form-group.success input,
            .form-group.success textarea {
                border-color: #4caf50;
                box-shadow: 0 0 10px rgba(76, 175, 80, 0.3);
            }
            
            .error-message {
                color: #f44336;
                font-size: 0.8rem;
                margin-top: 0.5rem;
                display: none;
            }
            
            .form-group.error .error-message {
                display: block;
            }
        `;
        document.head.appendChild(style);
    }

    validateField(field) {
        const formGroup = field.closest('.form-group');
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error message
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Validation rules
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                isValid = false;
                errorMessage = 'Email is required';
            } else if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email';
            }
        } else if (field.required && !value) {
            isValid = false;
            errorMessage = `${field.name} is required`;
        }
        
        // Apply validation state
        formGroup.classList.remove('error', 'success');
        
        if (!isValid) {
            formGroup.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errorMessage;
            formGroup.appendChild(errorDiv);
        } else if (value) {
            formGroup.classList.add('success');
        }
        
        return isValid;
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    handleSubmit() {
        if (!this.validateForm()) {
            return;
        }
        
        const button = this.form.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        
        // Show loading state
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        button.disabled = true;
        
        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            this.showSuccessMessage();
            this.form.reset();
            
            // Reset button
            button.innerHTML = originalText;
            button.disabled = false;
            
            // Clear validation states
            const formGroups = this.form.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.classList.remove('error', 'success');
            });
        }, 2000);
    }

    showSuccessMessage() {
        // Create success toast
        const toast = document.createElement('div');
        toast.className = 'success-toast';
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            Thank you! Your message has been sent successfully.
        `;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #4caf50, #45a049);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 4000);
    }
}

// ============================================
// THEME SYSTEM
// ============================================
class ThemeSystem {
    constructor() {
        this.currentTheme = 'dark';
        this.init();
    }

    init() {
        this.loadTheme();
        this.createThemeToggle();
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme) {
            this.currentTheme = savedTheme;
            document.documentElement.setAttribute('data-theme', this.currentTheme);
        }
    }

    createThemeToggle() {
        const toggle = document.createElement('button');
        toggle.className = 'theme-toggle';
        toggle.innerHTML = this.currentTheme === 'dark' ? '☀️' : '🌙';
        toggle.setAttribute('aria-label', 'Toggle theme');
        
        toggle.style.cssText = `
            position: fixed;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
            width: 50px;
            height: 50px;
            border: none;
            border-radius: 50%;
            background: var(--portfolio-gradient-button);
            color: white;
            font-size: 20px;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 188, 212, 0.3);
        `;
        
        toggle.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        document.body.appendChild(toggle);
        this.themeToggle = toggle;
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('portfolio-theme', this.currentTheme);
        
        // Update toggle icon
        this.themeToggle.innerHTML = this.currentTheme === 'dark' ? '☀️' : '🌙';
    }
}

// ============================================
// INITIALIZE APPLICATION
// ============================================
const portfolioApp = new PortfolioApp();

// Make app globally accessible for debugging
window.portfolioApp = portfolioApp;

// Export main classes
window.PortfolioApp = PortfolioApp;
window.IntroSystem = IntroSystem;
window.FormSystem = FormSystem;
window.ThemeSystem = ThemeSystem;
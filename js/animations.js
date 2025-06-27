// ============================================
// ANIMATION SYSTEM
// A₹UN $HEKHAR Portfolio
// ============================================

class AnimationSystem {
    constructor() {
        this.observers = [];
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.initScrollAnimations();
        this.initHoverAnimations();
        this.initLoadAnimations();
        this.bindEvents();
    }

    setupIntersectionObserver() {
        if (!window.IntersectionObserver) {
            // Fallback for older browsers
            this.fallbackAnimations();
            return;
        }

        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        // Section observer
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSection(entry.target);
                }
            });
        }, options);

        // Tech items observer
        const techObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateTechItem(entry.target);
                }
            });
        }, options);

        // Project cards observer
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateProjectCard(entry.target);
                }
            });
        }, options);

        // Observe elements
        document.querySelectorAll('.section').forEach(section => {
            sectionObserver.observe(section);
        });

        document.querySelectorAll('.tech-item').forEach(item => {
            techObserver.observe(item);
        });

        document.querySelectorAll('.project-card').forEach(card => {
            projectObserver.observe(card);
        });

        this.observers.push(sectionObserver, techObserver, projectObserver);
    }

    animateSection(section) {
        if (this.isReducedMotion) return;
        
        section.classList.add('animate');
        
        // Animate section title
        const title = section.querySelector('.section-title');
        if (title) {
            title.style.animationDelay = '0.2s';
            title.classList.add('animate-fadeInUp');
        }

        // Animate section content with stagger
        const content = section.querySelectorAll('.about-text, .contact-info p, .highlight-item');
        content.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate-fadeInUp');
            }, (index + 1) * 100);
        });
    }

    animateTechItem(item) {
        if (this.isReducedMotion) return;
        
        item.classList.add('animate');
        
        // Add tech item specific animations
        const logo = item.querySelector('.tech-logo');
        const name = item.querySelector('.tech-name');
        const description = item.querySelector('.tech-description');

        if (logo) {
            logo.style.animationDelay = '0.1s';
            logo.classList.add('animate-scaleIn');
        }

        if (name) {
            name.style.animationDelay = '0.2s';
            name.classList.add('animate-fadeInUp');
        }

        if (description) {
            description.style.animationDelay = '0.3s';
            description.classList.add('animate-fadeInUp');
        }
    }

    animateProjectCard(card) {
        if (this.isReducedMotion) return;
        
        card.classList.add('animate');
        
        // Add project card specific animations
        const icon = card.querySelector('.project-icon');
        const title = card.querySelector('.project-title');
        const description = card.querySelector('.project-description');
        const tags = card.querySelectorAll('.project-tag');
        const links = card.querySelectorAll('.project-link');

        if (icon) {
            icon.style.animationDelay = '0.1s';
            icon.classList.add('animate-bounceIn');
        }

        if (title) {
            title.style.animationDelay = '0.2s';
            title.classList.add('animate-fadeInUp');
        }

        if (description) {
            description.style.animationDelay = '0.3s';
            description.classList.add('animate-fadeInUp');
        }

        tags.forEach((tag, index) => {
            setTimeout(() => {
                tag.classList.add('animate-scaleIn');
            }, 400 + (index * 50));
        });

        links.forEach((link, index) => {
            setTimeout(() => {
                link.classList.add('animate-fadeInLeft');
            }, 600 + (index * 100));
        });
    }

    initScrollAnimations() {
        let lastScrollY = window.scrollY;
        let isScrolling = false;

        const scrollHandler = () => {
            if (!isScrolling) {
                requestAnimationFrame(() => {
                    this.handleScroll(lastScrollY);
                    isScrolling = false;
                });
                isScrolling = true;
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener('scroll', scrollHandler, { passive: true });
    }

    handleScroll(scrollY) {
        // Parallax effects for background shapes
        this.updateParallaxShapes(scrollY);
        
        // Update progress bars
        this.updateProgressBars();
        
        // Reveal animations for elements in viewport
        this.revealElements();
    }

    updateParallaxShapes(scrollY) {
        if (this.isReducedMotion) return;

        const shapes = document.querySelectorAll('.floating-shapes .shape');
        shapes.forEach((shape, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = -(scrollY * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    }

    updateProgressBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const percentage = bar.getAttribute('data-percentage') || '90';
                bar.style.width = `${percentage}%`;
            }
        });
    }

    revealElements() {
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        revealElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                element.classList.add('revealed');
            }
        });
    }

    initHoverAnimations() {
        // Enhanced hover effects
        this.setupTechItemHovers();
        this.setupProjectCardHovers();
        this.setupButtonHovers();
        this.setupSocialLinkHovers();
    }

    setupTechItemHovers() {
        document.querySelectorAll('.tech-item').forEach(item => {
            const logo = item.querySelector('.tech-logo');
            
            item.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion) {
                    item.classList.add('hover-float');
                    if (logo) {
                        logo.style.transform = 'scale(1.1) rotateY(360deg)';
                    }
                }
            });

            item.addEventListener('mouseleave', () => {
                item.classList.remove('hover-float');
                if (logo) {
                    logo.style.transform = '';
                }
            });
        });
    }

    setupProjectCardHovers() {
        document.querySelectorAll('.project-card').forEach(card => {
            const icon = card.querySelector('.project-icon');
            const tags = card.querySelectorAll('.project-tag');
            
            card.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion) {
                    if (icon) {
                        icon.style.transform = 'rotate(360deg) scale(1.1)';
                    }
                    
                    tags.forEach((tag, index) => {
                        setTimeout(() => {
                            tag.style.transform = 'scale(1.05)';
                        }, index * 50);
                    });
                }
            });

            card.addEventListener('mouseleave', () => {
                if (icon) {
                    icon.style.transform = '';
                }
                
                tags.forEach(tag => {
                    tag.style.transform = '';
                });
            });
        });
    }

    setupButtonHovers() {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion) {
                    button.style.transform = 'translateY(-2px)';
                }
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });
    }

    setupSocialLinkHovers() {
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion) {
                    link.style.transform = 'translateY(-2px) scale(1.05)';
                }
            });

            link.addEventListener('mouseleave', () => {
                link.style.transform = '';
            });
        });
    }

    initLoadAnimations() {
        // Stagger load animations for initial page load
        this.animateHeroElements();
        this.setupTypingAnimation();
    }

    animateHeroElements() {
        const heroElements = [
            '.hero-title',
            '.hero-subtitle', 
            '.hero-description',
            '.hero-buttons'
        ];

        heroElements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element && !this.isReducedMotion) {
                element.style.animationDelay = `${index * 0.2}s`;
                element.classList.add('animate-fadeInUp');
            }
        });
    }

    setupTypingAnimation() {
        const typingElement = document.getElementById('typingText');
        if (typingElement && !this.isReducedMotion) {
            const text = typingElement.textContent;
            typingElement.textContent = '';
            
            let index = 0;
            const typeInterval = setInterval(() => {
                typingElement.textContent += text[index];
                index++;
                
                if (index >= text.length) {
                    clearInterval(typeInterval);
                    typingElement.style.borderRight = '3px solid var(--portfolio-accent)';
                }
            }, 50);
        }
    }

    bindEvents() {
        // Handle reduced motion preference changes
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        mediaQuery.addEventListener('change', (e) => {
            this.isReducedMotion = e.matches;
            this.updateAnimationsForMotionPreference();
        });

        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });

        // Handle focus events for accessibility
        document.addEventListener('focusin', (e) => {
            if (e.target.matches('.tech-item, .project-card, .btn')) {
                e.target.classList.add('focus-visible');
            }
        });

        document.addEventListener('focusout', (e) => {
            e.target.classList.remove('focus-visible');
        });
    }

    updateAnimationsForMotionPreference() {
        const animatedElements = document.querySelectorAll('.animate, [class*="animate-"]');
        animatedElements.forEach(element => {
            if (this.isReducedMotion) {
                element.style.animation = 'none';
                element.style.transition = 'none';
            } else {
                element.style.animation = '';
                element.style.transition = '';
            }
        });
    }

    pauseAnimations() {
        document.querySelectorAll('.shape, .wave').forEach(element => {
            element.style.animationPlayState = 'paused';
        });
    }

    resumeAnimations() {
        document.querySelectorAll('.shape, .wave').forEach(element => {
            element.style.animationPlayState = 'running';
        });
    }

    fallbackAnimations() {
        // Simple fallback for browsers without IntersectionObserver
        document.querySelectorAll('.section, .tech-item, .project-card').forEach(element => {
            element.classList.add('animate');
        });
    }

    // Public methods
    animateElement(element, animationType, delay = 0) {
        if (this.isReducedMotion) return;
        
        setTimeout(() => {
            element.classList.add(`animate-${animationType}`);
        }, delay);
    }

    createCustomAnimation(element, keyframes, options = {}) {
        if (this.isReducedMotion) return;
        
        const defaultOptions = {
            duration: 1000,
            easing: 'ease-out',
            fill: 'forwards'
        };
        
        const animationOptions = { ...defaultOptions, ...options };
        
        if (element.animate) {
            return element.animate(keyframes, animationOptions);
        }
    }

    staggerElements(elements, animationType, staggerDelay = 100) {
        elements.forEach((element, index) => {
            this.animateElement(element, animationType, index * staggerDelay);
        });
    }

    destroy() {
        // Clean up observers
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers = [];
    }
}

// Performance-optimized animation utilities
class AnimationUtils {
    static fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease`;
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
        });
    }

    static slideUp(element, duration = 300) {
        element.style.transform = 'translateY(20px)';
        element.style.opacity = '0';
        element.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
        
        requestAnimationFrame(() => {
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        });
    }

    static scale(element, from = 0.8, to = 1, duration = 300) {
        element.style.transform = `scale(${from})`;
        element.style.transition = `transform ${duration}ms ease`;
        
        requestAnimationFrame(() => {
            element.style.transform = `scale(${to})`;
        });
    }

    static pulse(element, scale = 1.05, duration = 200) {
        const originalTransform = element.style.transform;
        
        element.style.transition = `transform ${duration}ms ease`;
        element.style.transform = `scale(${scale})`;
        
        setTimeout(() => {
            element.style.transform = originalTransform;
        }, duration);
    }
}

// Initialize animation system
function initAnimations() {
    return new AnimationSystem();
}

// Export for use in other modules
window.AnimationSystem = AnimationSystem;
window.AnimationUtils = AnimationUtils;
window.initAnimations = initAnimations;
// ============================================
// CUSTOM CURSOR SYSTEM
// A₹UN $HEKHAR Portfolio
// ============================================

class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('cursor');
        this.isVisible = true;
        this.isDesktop = window.innerWidth > 768;
        
        if (!this.cursor || !this.isDesktop) {
            this.hide();
            return;
        }
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupHoverElements();
        this.show();
    }

    bindEvents() {
        // Mouse move handler
        document.addEventListener('mousemove', (e) => {
            this.updatePosition(e.clientX, e.clientY);
        });

        // Mouse down handler
        document.addEventListener('mousedown', () => {
            this.addState('click');
        });

        // Mouse up handler
        document.addEventListener('mouseup', () => {
            this.removeState('click');
        });

        // Mouse enter/leave handlers
        document.addEventListener('mouseenter', () => {
            this.show();
        });

        document.addEventListener('mouseleave', () => {
            this.hide();
        });

        // Window resize handler
        window.addEventListener('resize', () => {
            this.checkDevice();
        });
    }

    setupHoverElements() {
        // Interactive elements that should trigger hover state
        const hoverSelectors = [
            'a',
            'button',
            '.btn',
            '.tech-item',
            '.project-card',
            '.social-link',
            '.nav-link',
            '.logo',
            'input',
            'textarea',
            '.project-link',
            '.mobile-menu-toggle',
            '[role="button"]',
            '.cursor-hover'
        ];

        const hoverElements = document.querySelectorAll(hoverSelectors.join(', '));
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.addState('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                this.removeState('hover');
            });
        });

        // Special handling for navigation elements
        const navElements = document.querySelectorAll('.nav-link, .logo');
        navElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.addState('nav-hover');
            });
            
            element.addEventListener('mouseleave', () => {
                this.removeState('nav-hover');
            });
        });

        // Special handling for buttons
        const buttons = document.querySelectorAll('.btn, button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.addState('button-hover');
            });
            
            button.addEventListener('mouseleave', () => {
                this.removeState('button-hover');
            });
        });

        // Special handling for form elements
        const formElements = document.querySelectorAll('input, textarea, select');
        formElements.forEach(element => {
            element.addEventListener('focus', () => {
                this.addState('input-focus');
            });
            
            element.addEventListener('blur', () => {
                this.removeState('input-focus');
            });
        });
    }

    updatePosition(x, y) {
        if (!this.cursor || !this.isVisible) return;
        
        // Smooth cursor movement with requestAnimationFrame
        requestAnimationFrame(() => {
            this.cursor.style.left = `${x - 10}px`;
            this.cursor.style.top = `${y - 10}px`;
        });
    }

    addState(state) {
        if (!this.cursor) return;
        this.cursor.classList.add(state);
    }

    removeState(state) {
        if (!this.cursor) return;
        this.cursor.classList.remove(state);
    }

    show() {
        if (!this.cursor || !this.isDesktop) return;
        this.isVisible = true;
        this.cursor.style.display = 'block';
        document.body.style.cursor = 'none';
    }

    hide() {
        if (!this.cursor) return;
        this.isVisible = false;
        this.cursor.style.display = 'none';
        document.body.style.cursor = 'auto';
    }

    checkDevice() {
        const wasDesktop = this.isDesktop;
        this.isDesktop = window.innerWidth > 768;
        
        if (wasDesktop !== this.isDesktop) {
            if (this.isDesktop) {
                this.show();
                this.setupHoverElements();
            } else {
                this.hide();
            }
        }
    }

    // Public methods for external control
    setColor(color) {
        if (!this.cursor) return;
        this.cursor.style.background = color;
        this.cursor.style.boxShadow = `0 0 20px ${color}`;
    }

    setSize(size) {
        if (!this.cursor) return;
        this.cursor.style.width = `${size}px`;
        this.cursor.style.height = `${size}px`;
    }

    pulse() {
        if (!this.cursor) return;
        this.addState('pulse');
        setTimeout(() => {
            this.removeState('pulse');
        }, 300);
    }

    trail(x, y) {
        if (!this.isDesktop) return;
        
        // Create trail effect
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--cursor-trail);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            left: ${x - 2}px;
            top: ${y - 2}px;
            animation: particle-trail 0.5s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        
        // Remove trail after animation
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 500);
    }

    destroy() {
        this.hide();
        if (this.cursor) {
            this.cursor.remove();
        }
    }
}

// Enhanced cursor with magnetic effect
class MagneticCursor extends CustomCursor {
    constructor() {
        super();
        this.magneticElements = [];
        this.setupMagneticElements();
    }

    setupMagneticElements() {
        const magneticSelectors = [
            '.btn',
            '.tech-item',
            '.project-card',
            '.social-link'
        ];

        this.magneticElements = document.querySelectorAll(magneticSelectors.join(', '));
        
        this.magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                this.magneticEffect(e, element);
            });
            
            element.addEventListener('mouseleave', () => {
                this.resetMagnetic(element);
            });
        });
    }

    magneticEffect(e, element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = 80;
        
        if (distance < maxDistance) {
            const strength = (maxDistance - distance) / maxDistance;
            const moveX = deltaX * strength * 0.3;
            const moveY = deltaY * strength * 0.3;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    }

    resetMagnetic(element) {
        element.style.transform = '';
    }
}

// Cursor trail effect
class CursorTrail {
    constructor() {
        this.trails = [];
        this.maxTrails = 10;
        this.isDesktop = window.innerWidth > 768;
        
        if (this.isDesktop) {
            this.init();
        }
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.addTrail(e.clientX, e.clientY);
        });
    }

    addTrail(x, y) {
        const trail = {
            x: x,
            y: y,
            life: 1,
            element: this.createTrailElement(x, y)
        };

        this.trails.push(trail);
        document.body.appendChild(trail.element);

        // Remove oldest trails
        if (this.trails.length > this.maxTrails) {
            const oldTrail = this.trails.shift();
            if (oldTrail.element.parentNode) {
                oldTrail.element.parentNode.removeChild(oldTrail.element);
            }
        }

        this.updateTrails();
    }

    createTrailElement(x, y) {
        const element = document.createElement('div');
        element.className = 'cursor-trail-dot';
        element.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: var(--cursor-trail);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
            left: ${x - 3}px;
            top: ${y - 3}px;
            transition: opacity 0.3s ease, transform 0.3s ease;
        `;
        return element;
    }

    updateTrails() {
        this.trails.forEach((trail, index) => {
            trail.life -= 0.1;
            const opacity = Math.max(0, trail.life);
            const scale = 0.5 + (opacity * 0.5);
            
            trail.element.style.opacity = opacity;
            trail.element.style.transform = `scale(${scale})`;
            
            if (trail.life <= 0) {
                if (trail.element.parentNode) {
                    trail.element.parentNode.removeChild(trail.element);
                }
                this.trails.splice(index, 1);
            }
        });
    }
}

// Initialize cursor system
function initCursorSystem() {
    // Check if device supports cursor
    if (window.innerWidth <= 768) {
        return null;
    }

    // Create cursor instance
    const cursor = new MagneticCursor();
    
    // Optional: Add trail effect
    const trail = new CursorTrail();
    
    return { cursor, trail };
}

// Export for use in other modules
window.CustomCursor = CustomCursor;
window.MagneticCursor = MagneticCursor;
window.CursorTrail = CursorTrail;
window.initCursorSystem = initCursorSystem;
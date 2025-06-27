// ============================================
// PARTICLE SYSTEM
// A₹UN $HEKHAR Portfolio
// ============================================

class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
        this.colors = ['#00bcd4', '#e91e63', '#ff9800', '#9c27b0', '#4caf50', '#f44336'];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.z = Math.random() * 100;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.vz = (Math.random() - 0.5) * 1;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = (Math.random() - 0.5) * 0.02;
        this.life = Math.random() * 200 + 300;
        this.maxLife = this.life;
    }

    update(mouseX, mouseY) {
        // Mouse interaction
        if (mouseX !== null && mouseY !== null) {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100 * 0.05;
                this.vx += dx / distance * force;
                this.vy += dy / distance * force;
            }
        }

        // Update position
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;
        this.angle += this.angleSpeed;

        // Velocity dampening
        this.vx *= 0.99;
        this.vy *= 0.99;

        // Boundary wrapping
        if (this.x < 0) this.x = this.canvas.width;
        if (this.x > this.canvas.width) this.x = 0;
        if (this.y < 0) this.y = this.canvas.height;
        if (this.y > this.canvas.height) this.y = 0;
        if (this.z < 0) this.z = 100;
        if (this.z > 100) this.z = 0;

        // Life cycle
        this.life--;
        if (this.life <= 0) {
            this.reset();
        }
    }

    draw(ctx) {
        const scale = 1 + this.z / 100;
        const alpha = this.opacity * (this.life / this.maxLife);
        
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * scale, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw inner glow
        ctx.globalAlpha = alpha * 0.5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, (this.size * scale) * 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseX = null;
        this.mouseY = null;
        this.isAnimating = true;
        
        this.initCanvas();
        this.initParticles();
        this.bindEvents();
        this.animate();
    }

    initCanvas() {
        this.resizeCanvas();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initParticles() {
        const particleCount = this.getParticleCount();
        this.particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new Particle(this.canvas));
        }
    }

    getParticleCount() {
        const width = window.innerWidth;
        if (width < 768) return 50;      // Mobile
        if (width < 1024) return 80;     // Tablet
        return 150;                      // Desktop
    }

    bindEvents() {
        // Resize handler
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.initParticles();
        });

        // Mouse move handler
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Mouse leave handler
        document.addEventListener('mouseleave', () => {
            this.mouseX = null;
            this.mouseY = null;
        });

        // Touch handlers for mobile
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length > 0) {
                this.mouseX = e.touches[0].clientX;
                this.mouseY = e.touches[0].clientY;
            }
        });

        document.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (e.touches.length > 0) {
                this.mouseX = e.touches[0].clientX;
                this.mouseY = e.touches[0].clientY;
            }
        });

        document.addEventListener('touchend', () => {
            this.mouseX = null;
            this.mouseY = null;
        });

        // Visibility change handler
        document.addEventListener('visibilitychange', () => {
            this.isAnimating = !document.hidden;
        });
    }

    animate() {
        if (!this.isAnimating) {
            requestAnimationFrame(() => this.animate());
            return;
        }

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach(particle => {
            particle.update(this.mouseX, this.mouseY);
            particle.draw(this.ctx);
        });

        // Draw connections between nearby particles
        this.drawConnections();

        // Continue animation
        requestAnimationFrame(() => this.animate());
    }

    drawConnections() {
        const maxDistance = 120;
        const maxConnections = 50; // Limit connections for performance
        let connectionCount = 0;

        this.ctx.strokeStyle = 'rgba(0, 188, 212, 0.15)';
        this.ctx.lineWidth = 1;

        for (let i = 0; i < this.particles.length && connectionCount < maxConnections; i++) {
            for (let j = i + 1; j < this.particles.length && connectionCount < maxConnections; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    const alpha = (maxDistance - distance) / maxDistance * 0.3;
                    this.ctx.globalAlpha = alpha;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                    
                    connectionCount++;
                }
            }
        }
        
        this.ctx.globalAlpha = 1;
    }

    // Public methods
    pause() {
        this.isAnimating = false;
    }

    resume() {
        this.isAnimating = true;
    }

    destroy() {
        this.pause();
        this.particles = [];
        if (this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    // Add particle burst effect
    addBurst(x, y, count = 10) {
        for (let i = 0; i < count; i++) {
            const particle = new Particle(this.canvas);
            particle.x = x;
            particle.y = y;
            particle.vx = (Math.random() - 0.5) * 8;
            particle.vy = (Math.random() - 0.5) * 8;
            particle.life = 60;
            particle.maxLife = 60;
            this.particles.push(particle);
        }

        // Remove excess particles to maintain performance
        if (this.particles.length > this.getParticleCount() * 1.5) {
            this.particles.splice(0, count);
        }
    }

    // Change particle colors dynamically
    setColorScheme(colors) {
        this.particles.forEach(particle => {
            particle.color = colors[Math.floor(Math.random() * colors.length)];
        });
    }
}

// Export for use in other modules
window.ParticleSystem = ParticleSystem;
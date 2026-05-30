/* ============================================
   INTERACTIVE HERO ANIMATION - PIK-R JP ONE
   "Perjalanan Memilih Masa Depan Bebas Narkoba"
   
   Features:
   - 4 cinematic scenes with auto-play
   - Canvas particle system (60fps)
   - Smooth scene transitions
   - Skip button
   - localStorage (show once)
   - Responsive
   ============================================ */

(function () {
    'use strict';

    // === CONFIG ===
    const SCENE_DURATIONS = [4500, 5000, 4500, 5000]; // ms per scene
    const TRANSITION_MS = 1500;
    const TOTAL_DURATION = SCENE_DURATIONS.reduce((a, b) => a + b, 0);
    const STORAGE_KEY = 'pikr_intro_seen_v2';

    // === CHECK LOCALSTORAGE ===
    if (localStorage.getItem(STORAGE_KEY)) {
        // User has seen the intro before - remove intro elements
        window.addEventListener('DOMContentLoaded', () => {
            const intro = document.getElementById('intro-animation');
            const introLoader = document.getElementById('intro-loader');
            const skipBtn = document.getElementById('intro-skip');
            const progress = document.getElementById('intro-progress');
            const indicators = document.querySelector('.scene-indicators');
            if (intro) intro.remove();
            if (introLoader) introLoader.remove();
            if (skipBtn) skipBtn.remove();
            if (progress) progress.remove();
            if (indicators) indicators.remove();
            // Show navbar
            const navbar = document.querySelector('.navbar');
            if (navbar) navbar.style.opacity = '1';
        });
        return; // Stop executing intro logic
    }

    // === MAIN INTRO LOGIC ===
    window.addEventListener('DOMContentLoaded', () => {
        const intro = document.getElementById('intro-animation');
        const introLoader = document.getElementById('intro-loader');
        const canvas = document.getElementById('intro-particles');
        const ctx = canvas ? canvas.getContext('2d') : null;
        const skipBtn = document.getElementById('intro-skip');
        const progressBar = document.getElementById('intro-progress');
        const scenes = document.querySelectorAll('.intro-scene');
        const dots = document.querySelectorAll('.scene-dot');
        const navbar = document.querySelector('.navbar');
        const mainLoader = document.getElementById('loader');

        if (!intro || !canvas || !ctx) return;

        // Hide main loader and navbar during intro
        if (mainLoader) mainLoader.style.display = 'none';
        if (navbar) navbar.style.opacity = '0';
        document.body.style.overflow = 'hidden';

        let currentScene = -1;
        let isPlaying = false;
        let startTime = 0;
        let animFrameId = null;
        let sceneTimeouts = [];
        let particles = [];
        let introEnded = false;

        // === CANVAS SETUP ===
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // === PARTICLE SYSTEM ===
        class Particle {
            constructor(config) {
                this.x = config.x ?? Math.random() * canvas.width;
                this.y = config.y ?? Math.random() * canvas.height;
                this.size = config.size ?? (Math.random() * 2 + 0.5);
                this.speedX = config.speedX ?? (Math.random() - 0.5) * 0.5;
                this.speedY = config.speedY ?? (Math.random() - 0.5) * 0.5;
                this.color = config.color ?? 'rgba(231, 76, 60, 0.6)';
                this.life = config.life ?? 1;
                this.decay = config.decay ?? 0;
                this.gravity = config.gravity ?? 0;
                this.maxLife = this.life;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.speedY += this.gravity;
                if (this.decay > 0) {
                    this.life -= this.decay;
                }
                return this.life > 0;
            }

            draw(context) {
                const alpha = this.decay > 0 ? Math.max(0, this.life / this.maxLife) : 1;
                context.beginPath();
                context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                context.fillStyle = this.color.replace(/[\d.]+\)$/, alpha * 0.8 + ')');
                context.fill();

                // Glow effect
                context.beginPath();
                context.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
                context.fillStyle = this.color.replace(/[\d.]+\)$/, alpha * 0.15 + ')');
                context.fill();
            }
        }

        // Create ambient particles for different scenes
        function createAmbientParticles(scene) {
            particles = [];
            const count = Math.min(80, Math.floor(canvas.width / 15));

            if (scene <= 1) {
                // Red/crimson particles for dark scenes
                for (let i = 0; i < count; i++) {
                    particles.push(new Particle({
                        color: Math.random() > 0.5 ? 'rgba(231, 76, 60, 0.6)' : 'rgba(192, 57, 43, 0.4)',
                        size: Math.random() * 2 + 0.5,
                        speedX: (Math.random() - 0.5) * 0.4,
                        speedY: (Math.random() - 0.5) * 0.3 - 0.1,
                    }));
                }
            } else if (scene === 2) {
                // Explosion burst particles
                const cx = canvas.width / 2;
                const cy = canvas.height / 2;
                for (let i = 0; i < 120; i++) {
                    const angle = (Math.PI * 2 * i) / 120;
                    const speed = 2 + Math.random() * 6;
                    particles.push(new Particle({
                        x: cx,
                        y: cy,
                        color: Math.random() > 0.3 ? 'rgba(231, 76, 60, 0.9)' : 'rgba(241, 196, 15, 0.9)',
                        size: Math.random() * 3 + 1,
                        speedX: Math.cos(angle) * speed,
                        speedY: Math.sin(angle) * speed,
                        life: 1,
                        decay: 0.008 + Math.random() * 0.01,
                        gravity: 0.02,
                    }));
                }
            } else if (scene === 3) {
                // Blue/green positive particles
                for (let i = 0; i < count; i++) {
                    const colors = [
                        'rgba(52, 152, 219, 0.6)',
                        'rgba(46, 204, 113, 0.5)',
                        'rgba(26, 188, 156, 0.4)',
                    ];
                    particles.push(new Particle({
                        color: colors[Math.floor(Math.random() * colors.length)],
                        size: Math.random() * 2.5 + 0.5,
                        speedX: (Math.random() - 0.5) * 0.3,
                        speedY: -(Math.random() * 0.5 + 0.1), // Float upward
                    }));
                }
            }
        }

        // === RENDER LOOP ===
        function renderParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                const alive = p.update();

                if (!alive) {
                    particles.splice(i, 1);
                    continue;
                }

                // Wrap around screen (for ambient particles only)
                if (p.decay === 0) {
                    if (p.x < -10) p.x = canvas.width + 10;
                    if (p.x > canvas.width + 10) p.x = -10;
                    if (p.y < -10) p.y = canvas.height + 10;
                    if (p.y > canvas.height + 10) p.y = -10;
                }

                p.draw(ctx);
            }

            if (!introEnded) {
                animFrameId = requestAnimationFrame(renderParticles);
            }
        }

        // === SCENE MANAGEMENT ===
        function showScene(index) {
            currentScene = index;

            // Update scene visibility
            scenes.forEach((s, i) => {
                if (i === index) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });

            // Update dots
            dots.forEach((d, i) => {
                d.classList.toggle('active', i === index);
            });

            // Scene-specific logic
            if (index === 0) {
                // Scene 1: Dark World
                createAmbientParticles(0);
                const text = document.querySelector('.scene1-text');
                const glitch = document.querySelector('.glitch-overlay');
                setTimeout(() => {
                    if (text) text.classList.add('animate');
                    if (glitch) glitch.classList.add('active');
                }, 300);
            } else if (index === 1) {
                // Scene 2: Drug Threats
                createAmbientParticles(1);
                const drugs = document.querySelectorAll('.drug-obj');
                const text = document.querySelector('.scene2-text');
                drugs.forEach((d, i) => {
                    setTimeout(() => d.classList.add('visible'), i * 150);
                });
                setTimeout(() => {
                    if (text) text.classList.add('animate');
                }, 500);
            } else if (index === 2) {
                // Scene 3: Resistance - explode drugs from scene 2
                createAmbientParticles(2); // explosion particles
                const ban = document.querySelector('.ban-symbol');
                const text = document.querySelector('.scene3-text');
                // Explode previous drug objects
                const drugs = document.querySelectorAll('.drug-obj');
                drugs.forEach((d, i) => {
                    setTimeout(() => d.classList.add('explode'), i * 80);
                });
                setTimeout(() => {
                    if (ban) ban.classList.add('visible');
                }, 400);
                setTimeout(() => {
                    if (text) text.classList.add('animate');
                }, 800);
            } else if (index === 3) {
                // Scene 4: Bright Future
                createAmbientParticles(3);
                const scene4 = document.getElementById('scene-4');
                const positives = document.querySelectorAll('.positive-obj');
                const text = document.querySelector('.scene4-text');
                setTimeout(() => {
                    if (scene4) scene4.classList.add('bright');
                }, 300);
                positives.forEach((p, i) => {
                    setTimeout(() => p.classList.add('visible'), 200 + i * 150);
                });
                setTimeout(() => {
                    if (text) text.classList.add('animate');
                }, 600);
            }
        }

        // === PROGRESS UPDATE ===
        function updateProgress() {
            if (introEnded) return;
            const elapsed = Date.now() - startTime;
            const progress = Math.min(1, elapsed / TOTAL_DURATION);
            if (progressBar) {
                progressBar.style.width = (progress * 100) + '%';
            }
            if (progress < 1) {
                requestAnimationFrame(updateProgress);
            }
        }

        // === END INTRO ===
        function endIntro() {
            if (introEnded) return;
            introEnded = true;

            // Clear timeouts
            sceneTimeouts.forEach(t => clearTimeout(t));
            sceneTimeouts = [];

            // Save to localStorage
            localStorage.setItem(STORAGE_KEY, 'true');

            // Fade out intro
            intro.classList.add('fade-out');

            // Clean up after transition
            setTimeout(() => {
                intro.classList.add('removed');
                if (skipBtn) skipBtn.style.display = 'none';
                if (progressBar) progressBar.style.display = 'none';
                const indicators = document.querySelector('.scene-indicators');
                if (indicators) indicators.style.display = 'none';

                // Show main website
                document.body.style.overflow = '';
                if (navbar) {
                    navbar.style.opacity = '1';
                    navbar.style.transition = 'opacity 0.5s ease';
                }

                // Cancel animation frame
                if (animFrameId) cancelAnimationFrame(animFrameId);
                particles = [];

                // Trigger main page loader
                const mainLoader2 = document.getElementById('loader');
                if (mainLoader2) {
                    mainLoader2.style.display = 'flex';
                    mainLoader2.style.opacity = '1';
                    setTimeout(() => {
                        mainLoader2.style.opacity = '0';
                        setTimeout(() => {
                            mainLoader2.style.display = 'none';
                        }, 500);
                    }, 800);
                }
            }, TRANSITION_MS);
        }

        // === SKIP BUTTON ===
        if (skipBtn) {
            skipBtn.addEventListener('click', endIntro);
        }

        // === KEYBOARD SKIP ===
        document.addEventListener('keydown', (e) => {
            if ((e.key === 'Escape' || e.key === ' ') && !introEnded) {
                e.preventDefault();
                endIntro();
            }
        });

        // === START SEQUENCE ===
        function startIntro() {
            // Remove intro loader
            if (introLoader) {
                introLoader.classList.add('fade-out');
                setTimeout(() => {
                    if (introLoader) introLoader.remove();
                }, 800);
            }

            isPlaying = true;
            startTime = Date.now();

            // Start particle rendering
            renderParticles();

            // Start progress tracking
            updateProgress();

            // Schedule scenes
            let elapsed = 0;

            // Scene 1
            const t1 = setTimeout(() => showScene(0), 500);
            sceneTimeouts.push(t1);
            elapsed += SCENE_DURATIONS[0];

            // Scene 2
            const t2 = setTimeout(() => showScene(1), elapsed);
            sceneTimeouts.push(t2);
            elapsed += SCENE_DURATIONS[1];

            // Scene 3
            const t3 = setTimeout(() => showScene(2), elapsed);
            sceneTimeouts.push(t3);
            elapsed += SCENE_DURATIONS[2];

            // Scene 4
            const t4 = setTimeout(() => showScene(3), elapsed);
            sceneTimeouts.push(t4);
            elapsed += SCENE_DURATIONS[3];

            // End
            const t5 = setTimeout(() => endIntro(), elapsed);
            sceneTimeouts.push(t5);
        }

        // === INTRO LOADER SIMULATION ===
        function simulateLoading() {
            const fill = document.querySelector('.intro-loader-bar-fill');
            let progress = 0;
            const loadInterval = setInterval(() => {
                progress += Math.random() * 15 + 5;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(loadInterval);
                    if (fill) fill.style.width = '100%';
                    setTimeout(startIntro, 400);
                }
                if (fill) fill.style.width = progress + '%';
            }, 150);
        }

        // Kick off
        simulateLoading();
    });
})();

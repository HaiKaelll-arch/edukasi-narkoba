/* ============================================
   SCROLL ANIMATIONS - PIK-R JP ONE
   Premium Interactive Scroll Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // === 1. TOP PROGRESS BAR ===
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // === 2. INTERSECTION OBSERVER FOR REVEAL ANIMATIONS ===
    const animationOptions = {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: Unobserve if we only want it to animate once
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove class if we want it to animate every time it enters viewport
                // entry.target.classList.remove('revealed');
            }
        });
    }, animationOptions);

    // Apply observer to specific elements
    
    // --- Hero Section ---
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const title = heroContent.querySelector('h1');
        const subtitle = heroContent.querySelector('p');
        const btn = heroContent.querySelector('.btn-primary');
        const badge = heroContent.querySelector('.badge');
        
        if (badge) { badge.classList.add('scroll-reveal'); badge.style.transitionDelay = '0.1s'; revealObserver.observe(badge); }
        if (title) { title.classList.add('scroll-reveal'); title.style.transitionDelay = '0.3s'; revealObserver.observe(title); }
        if (subtitle) { subtitle.classList.add('scroll-reveal'); subtitle.style.transitionDelay = '0.5s'; revealObserver.observe(subtitle); }
        if (btn) { btn.classList.add('scroll-reveal'); btn.style.transitionDelay = '0.7s'; revealObserver.observe(btn); }
    }
    
    const heroImg = document.querySelector('.hero-image');
    if (heroImg) {
        heroImg.classList.add('reveal-scale');
        heroImg.style.transitionDelay = '0.5s';
        revealObserver.observe(heroImg);
    }

    // --- Tentang Section ---
    const tentangHeader = document.querySelector('#tentang .section-header');
    if (tentangHeader) {
        tentangHeader.classList.add('scroll-reveal');
        revealObserver.observe(tentangHeader);
    }

    document.querySelectorAll('.about-card').forEach((card, index) => {
        card.classList.add('scroll-reveal');
        card.style.transitionDelay = `${index * 0.2}s`; // Staggered delay
        
        const icon = card.querySelector('.about-icon');
        if (icon) icon.classList.add('about-icon-float');
        
        revealObserver.observe(card);
    });

    // --- Golongan Section ---
    const golonganHeader = document.querySelector('#golongan .section-header');
    if (golonganHeader) {
        golonganHeader.classList.add('scroll-reveal');
        revealObserver.observe(golonganHeader);
    }

    const golonganCards = document.querySelectorAll('.golongan-card');
    if (golonganCards.length >= 3) {
        golonganCards[0].classList.add('reveal-left');
        golonganCards[1].classList.add('scroll-reveal'); // from bottom
        golonganCards[1].style.transitionDelay = '0.2s';
        golonganCards[2].classList.add('reveal-right');
        
        golonganCards.forEach((card) => revealObserver.observe(card));
    }

    // --- Dampak Section ---
    const dampakHeader = document.querySelector('#dampak .section-header');
    if (dampakHeader) {
        dampakHeader.classList.add('scroll-reveal');
        revealObserver.observe(dampakHeader);
    }

    document.querySelectorAll('.impact-item').forEach((item, index) => {
        item.classList.add('reveal-left');
        // Timeline effect (alternating from left and right)
        if (index % 2 !== 0) {
            item.classList.remove('reveal-left');
            item.classList.add('reveal-right');
        }
        item.style.transitionDelay = `${index * 0.15}s`;
        
        const icon = item.querySelector('.impact-icon');
        if (icon) icon.classList.add('impact-icon-pulse');
        
        revealObserver.observe(item);
    });

    // --- Quiz Section ---
    const quizHeader = document.querySelector('#quiz .section-header');
    if (quizHeader) {
        quizHeader.classList.add('scroll-reveal');
        revealObserver.observe(quizHeader);
    }
    
    const quizContainer = document.querySelector('.quiz-container');
    if (quizContainer) {
        quizContainer.classList.add('quiz-zoom');
        revealObserver.observe(quizContainer);
    }

    // --- Game Section ---
    const gameHeaders = document.querySelectorAll('#game .section-header, #escape-game .section-header');
    gameHeaders.forEach(header => {
        header.classList.add('scroll-reveal');
        revealObserver.observe(header);
    });

    const gameContainers = document.querySelectorAll('.game-container');
    gameContainers.forEach((container, index) => {
        container.classList.add('game-scale');
        container.classList.add('neon-glow');
        container.style.transitionDelay = `${index * 0.2}s`;
        revealObserver.observe(container);
    });

    // --- Motivasi Section (Typewriter Effect) ---
    const motivasiQuote = document.querySelector('#motivasi .quote-text');
    if (motivasiQuote) {
        const originalText = motivasiQuote.innerText;
        motivasiQuote.innerText = ''; // Clear it initially
        motivasiQuote.classList.add('typing-effect');
        
        let typed = false;
        
        const typewriterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !typed) {
                typed = true;
                let i = 0;
                const speed = 50; // ms per char
                
                function typeWriter() {
                    if (i < originalText.length) {
                        motivasiQuote.innerHTML += originalText.charAt(i);
                        i++;
                        setTimeout(typeWriter, speed);
                    }
                }
                typeWriter();
            }
        }, { threshold: 0.5 });
        
        typewriterObserver.observe(motivasiQuote);
    }

    // === 3. PARALLAX FLOATING OBJECTS ===
    const isMobile = window.innerWidth <= 768;
    
    // Only add intensive parallax effects if not on mobile
    if (!isMobile && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const parallaxContainer = document.createElement('div');
        parallaxContainer.className = 'parallax-objects';
        
        const objects = [
            '<i class="fa-solid fa-book"></i>',
            '<i class="fa-solid fa-trophy"></i>',
            '<i class="fa-solid fa-volleyball"></i>',
            '<i class="fa-solid fa-graduation-cap"></i>',
            '<i class="fa-solid fa-heart-pulse"></i>',
            '<i class="fa-solid fa-people-group"></i>'
        ];
        
        // Setup initial positioned objects
        objects.forEach((objHTML, i) => {
            const el = document.createElement('div');
            el.className = 'parallax-obj';
            el.innerHTML = objHTML;
            // Define different scroll speeds (data attribute)
            el.dataset.speed = (Math.random() * 0.4 + 0.1).toFixed(2);
            parallaxContainer.appendChild(el);
        });
        
        document.body.appendChild(parallaxContainer);
        
        // Simple Parallax scroll listener
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const parObjs = document.querySelectorAll('.parallax-obj');
            
            parObjs.forEach(obj => {
                const speed = parseFloat(obj.dataset.speed);
                // Move in reverse direction of scroll
                const yPos = -(scrollY * speed);
                obj.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // === 4. BACKGROUND PARTICLES LOGIC FOR SPECIFIC SECTIONS ===
    // (A lightweight canvas particle system for hero and motivasi backgrounds)
    function initSectionParticles(canvasId, containerSelector, color) {
        const container = document.querySelector(containerSelector);
        if (!container) return;
        
        const canvas = document.createElement('canvas');
        canvas.id = canvasId;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '0';
        
        // Insert as first child so it stays in background
        container.insertBefore(canvas, container.firstChild);
        
        const ctx = canvas.getContext('2d');
        let particlesArray;
        
        function resize() {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        }
        
        window.addEventListener('resize', resize);
        resize();
        
        class ParticleElement {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }
            
            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }
        
        function init() {
            particlesArray = [];
            const numberOfParticles = (canvas.height * canvas.width) / 15000; // adjust density
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 1) - 0.5;
                let directionY = (Math.random() * 1) - 0.5;
                
                particlesArray.push(new ParticleElement(x, y, directionX, directionY, size, color));
            }
        }
        
        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
        }
        
        init();
        animate();
    }

    if (!isMobile) {
       initSectionParticles('hero-particles-bg', '#hero', 'rgba(41, 128, 185, 0.4)');
       initSectionParticles('motivasi-particles', '#motivasi', 'rgba(255, 255, 255, 0.2)');
    }

    // === 5. SPECIAL DRUG-TO-POSITIVE TRANSITION ===
    // Build the transition block right after "dampak" section
    const dampakSection = document.getElementById('dampak');
    const pencegahanSection = document.getElementById('pencegahan');
    
    if (dampakSection && pencegahanSection) {
        const transSection = document.createElement('section');
        transSection.className = 'transition-section';
        transSection.id = 'anim-transition';
        
        transSection.innerHTML = `
            <div class="transition-icons">
                <!-- Drug Icons -->
                <div class="trans-icon drug-icon"><i class="fa-solid fa-pills"></i></div>
                <div class="trans-icon drug-icon"><i class="fa-solid fa-capsules"></i></div>
                <div class="trans-icon drug-icon"><i class="fa-solid fa-syringe"></i></div>
                
                <!-- Positive Icons (Initially hidden via CSS) -->
                <div class="trans-icon positive-icon hidden-initially"><i class="fa-solid fa-book"></i></div>
                <div class="trans-icon positive-icon hidden-initially"><i class="fa-solid fa-trophy"></i></div>
                <div class="trans-icon positive-icon hidden-initially"><i class="fa-solid fa-person-running"></i></div>
                <div class="trans-icon positive-icon hidden-initially"><i class="fa-solid fa-graduation-cap"></i></div>
            </div>
            <div class="transition-text">Memilih Masa Depan Bebas Narkoba</div>
        `;
        
        // Insert between Dampak and Pencegahan
        dampakSection.parentNode.insertBefore(transSection, pencegahanSection);
        
        // CSS specific to setup the hide/show logic correctly
        const hideStyle = document.createElement('style');
        hideStyle.innerHTML = `
            .hidden-initially { display: none !important; }
        `;
        document.head.appendChild(hideStyle);
        
        // Setup observer for this specific transition
        const transObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const drugIcons = transSection.querySelectorAll('.drug-icon');
                const posIcons = transSection.querySelectorAll('.positive-icon');
                const transText = transSection.querySelector('.transition-text');
                
                // 1. Move/fade away drug icons
                drugIcons.forEach((icon, i) => {
                    setTimeout(() => {
                        icon.classList.add('fade-away');
                    }, i * 150);
                });
                
                // 2. Hide drug icons completely, show positive icons, and animate them in
                setTimeout(() => {
                    drugIcons.forEach(icon => icon.style.display = 'none');
                    posIcons.forEach(icon => icon.classList.remove('hidden-initially')); // show in DOM
                    
                    setTimeout(() => {
                        posIcons.forEach((icon, i) => {
                            setTimeout(() => {
                                icon.classList.add('appear');
                            }, i * 200);
                        });
                        
                        setTimeout(() => {
                            transText.classList.add('visible');
                        }, 600);
                    }, 50); // small delay to allow CSS to register display change before animation
                    
                }, 1000); // 1 second after drug fade-away starts
                
                // Unobserve so it only happens once
                transObserver.unobserve(transSection);
            }
        }, { threshold: 0.6 });
        
        transObserver.observe(transSection);

        // Add section dividers between major sections
        function addDivider(beforeElementId) {
            const el = document.getElementById(beforeElementId);
            if (el) {
                const div = document.createElement('div');
                div.className = 'section-divider';
                el.insertBefore(div, el.firstChild);
                revealObserver.observe(div);
            }
        }
        
        addDivider('tentang');
        addDivider('golongan');
        addDivider('dampak');
        addDivider('pencegahan');
        addDivider('quiz');
        addDivider('game');
    }
});

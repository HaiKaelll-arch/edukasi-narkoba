/* ============================================
   INTERACTIVE HERO JS LOGIC
   Handles orbiting icons, mouse parallax, and scroll-driven storytelling
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('hero');
    if (!heroSection || !heroSection.classList.contains('interactive-hero')) return;

    // Make body aware so we can give hero extra height in CSS
    document.body.classList.add('has-interactive-hero');

    const heroContainer = document.querySelector('.hero-sticky-container');
    const origContent = document.querySelector('.hero-content');
    const badIcons = document.querySelectorAll('.icon-bad');
    const goodIcons = document.querySelectorAll('.icon-good');
    const text1 = document.querySelector('.text-1');
    const text2 = document.querySelector('.text-2');
    const watermark = document.querySelector('.hero-watermark');

    // State
    let scrollProgress = 0; // 0 to 1 over the hero section
    let mouseX = 0;
    let mouseY = 0;
    let time = 0;
    const isMobile = window.innerWidth <= 768;

    // Mouse Tracking for Parallax
    window.addEventListener('mousemove', (e) => {
        // Normalize mouse pos from -1 to 1
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    });

    // Determine radii based on screen size
    const baseRadius = isMobile ? 120 : 250;

    // Animation Loop
    function renderHero() {
        time += 0.005;
        
        // Calculate Scroll Progress inside the hero section
        // Hero is say 200vh tall. We sticky the container.
        const rect = heroSection.getBoundingClientRect();
        // rect.top is 0 when hero hits top of viewport.
        // It goes negative as we scroll down.
        // Total scrollable distance is rect.height - window.innerHeight
        const scrollDistance = Math.max(1, rect.height - window.innerHeight);
        let rawProgress = -rect.top / scrollDistance;
        
        // Clamp progress between 0 and 1
        scrollProgress = Math.max(0, Math.min(1, rawProgress));
        
        // Only do heavy math if hero is somewhat visible
        if (rawProgress > -0.5 && rawProgress < 1.5) {
            
            // 1. Orig Content Fade (0 to 0.2)
            const origOpacity = 1 - (scrollProgress / 0.15);
            if(origContent) {
                origContent.style.opacity = Math.max(0, Math.min(1, origOpacity));
                origContent.style.transform = `translateY(${scrollProgress * -100}px)`;
                origContent.style.pointerEvents = origOpacity > 0.1 ? 'auto' : 'none';
            }
            
            // 2. Bad Icons (Drugs/Negative)
            // They orbit out, then explode outward and fade out between 0.1 and 0.4
            const badFadeProgress = Math.max(0, Math.min(1, (scrollProgress - 0.1) / 0.25));
            const badOpacity = 1 - badFadeProgress;
            
            badIcons.forEach((icon, index) => {
                const speed = parseFloat(icon.dataset.speed) || 1;
                // Read base angle and radius from setup (or just generate)
                const angleOffset = (index / badIcons.length) * Math.PI * 2;
                const currentAngle = (time * speed) + angleOffset;
                
                // Explode radius out as scroll happens
                const radius = baseRadius * (parseFloat(icon.dataset.radius)/250 || 1) + (badFadeProgress * 500);
                
                // Mouse parallax offset
                const pX = -mouseX * 30 * speed;
                const pY = -mouseY * 30 * speed;
                
                // Floating bob
                const bob = Math.sin(time * 3 + index) * 15;

                const x = Math.cos(currentAngle) * radius + pX;
                const y = Math.sin(currentAngle) * radius + pY + bob;

                icon.style.opacity = badOpacity;
                icon.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${badOpacity})`;
            });

            // 3. Good Icons (Positive)
            // They fly in from far away and start circling (0.3 to 0.6)
            const goodFadeProgress = Math.max(0, Math.min(1, (scrollProgress - 0.3) / 0.3));
            
            goodIcons.forEach((icon, index) => {
                const speed = 1 + (index % 3) * 0.2;
                const angleOffset = (index / goodIcons.length) * Math.PI * 2;
                // Reverse orbit direction
                const currentAngle = -(time * speed) + angleOffset;
                
                // Start far out (800) and come into baseRadius + 50
                const radius = 800 - (goodFadeProgress * (800 - (baseRadius + (isMobile ? 20 : 80))));
                
                const pX = mouseX * 20 * speed;
                const pY = mouseY * 20 * speed;
                
                const x = Math.cos(currentAngle) * radius + pX;
                const y = Math.sin(currentAngle) * radius + pY;

                // Opacity is tied to progress, but they stay visible once completely in
                icon.style.opacity = goodFadeProgress;
                
                // They shouldn't show up at all if progress is 0
                const scale = goodFadeProgress > 0 ? 0.5 + (goodFadeProgress * 0.5) : 0;
                
                icon.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
            });

            // 4. Texts
            // Text 1: Fade in (0.3 to 0.45), hold, fade out (0.6 to 0.7)
            if (scrollProgress >= 0.3 && scrollProgress <= 0.7) {
                text1.classList.add('active');
                const t1FadeOut = Math.max(0, Math.min(1, (scrollProgress - 0.6) / 0.1));
                text1.style.opacity = 1 - t1FadeOut;
                text1.style.transform = `translate(-50%, -50%) scale(${1 + t1FadeOut * 0.2})`;
            } else {
                text1.classList.remove('active');
                text1.style.opacity = 0;
            }

            // Text 2: Fade in (0.7 to 0.85), hold
            if (scrollProgress >= 0.7) {
                text2.classList.add('active');
                // Calculate fade in progress
                const t2FadeIn = Math.max(0, Math.min(1, (scrollProgress - 0.7) / 0.15));
                text2.style.opacity = t2FadeIn;
                
                // Once fully faded in, apply a slight upward parallax on remaining scroll
                if(t2FadeIn === 1) {
                    const extraScroll = (scrollProgress - 0.85) / 0.15; // 0 to 1 for the rest
                    text2.style.transform = `translate(-50%, calc(-50% - ${extraScroll * 50}px)) scale(1)`;    
                } else {
                    // Zooming in effect
                    text2.style.transform = `translate(-50%, -50%) scale(${0.8 + (t2FadeIn * 0.2)})`;
                }
            } else {
                text2.classList.remove('active');
                text2.style.opacity = 0;
            }

            // 5. Watermark Glow (peaks at 0.5)
            if (watermark) {
                const waterOpacity = 0.08 + (Math.sin(scrollProgress * Math.PI) * 0.1);
                watermark.style.opacity = waterOpacity;
            }
        }

        requestAnimationFrame(renderHero);
    }

    // Start loop
    renderHero();
});

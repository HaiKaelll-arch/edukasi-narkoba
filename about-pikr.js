/**
 * =======================================================
 * ABOUT-PIKR.JS — PIK-R JP ONE
 * Logic untuk halaman About PIK-R (SPA Toggle),
 * Animasi Counter, FAQ Accordion, Typing Effect,
 * dan Intersection Observer (AOS-like)
 * =======================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SPA PAGE TOGGLING ---
    const aboutNavLink = document.getElementById('nav-about-pikr');
    const berandaNavLink = document.querySelector('.nav-links a[href="#hero"]');
    const otherNavLinks = document.querySelectorAll('.nav-links a:not(#nav-about-pikr)');
    const aboutOverlay = document.getElementById('about-pikr');
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');

    // Kumpulan element utama beranda untuk disembunyikan/ditampilkan
    const homepageElements = [
        document.getElementById('hero'),
        document.getElementById('stats-section'),
        document.getElementById('tentang'),
        document.getElementById('golongan'),
        document.getElementById('dampak'),
        document.getElementById('pencegahan'),
        document.getElementById('motivasi'),
        document.getElementById('quiz'),
        document.getElementById('game'),
        document.getElementById('escape-game'),
        document.getElementById('faq-section'),
        document.getElementById('cta-section'),
        document.getElementById('main-footer')
    ];

    function showAboutPage() {
        // Tampilkan halaman About PIK-R
        if (aboutOverlay) {
            aboutOverlay.classList.add('about-visible');
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
        
        // Sembunyikan elemen halaman utama
        homepageElements.forEach(el => {
            if (el) el.style.display = 'none';
        });

        // Update active class di navbar
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('nav-active'));
        if (aboutNavLink) aboutNavLink.classList.add('nav-active');

        // Close hamburger menu di mobile setelah klik
        if (navLinksContainer && navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
        }

        // Jalankan ulang typing effect pada hero About PIK-R
        startAboutTypingEffect();
    }

    function showHomepage(targetHash = '#hero') {
        // Sembunyikan halaman About PIK-R
        if (aboutOverlay) {
            aboutOverlay.classList.remove('about-visible');
        }

        // Tampilkan kembali elemen halaman utama
        homepageElements.forEach(el => {
            if (el) el.style.display = '';
        });

        // Update active class di navbar
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('nav-active'));
        const targetLink = document.querySelector(`.nav-links a[href="${targetHash}"]`);
        if (targetLink) targetLink.classList.add('nav-active');

        // Scroll ke target hash
        if (targetHash) {
            const targetEl = document.querySelector(targetHash);
            if (targetEl) {
                setTimeout(() => {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }, 50);
            }
        }

        // Close hamburger menu di mobile setelah klik
        if (navLinksContainer && navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
        }
    }

    // Event listener untuk tombol navbar "About PIK-R"
    if (aboutNavLink) {
        aboutNavLink.addEventListener('click', (e) => {
            e.preventDefault();
            showAboutPage();
        });
    }

    // Event listener untuk link navbar lainnya (Beranda, dll)
    otherNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetHash = link.getAttribute('href');
            if (targetHash.startsWith('#')) {
                e.preventDefault();
                showHomepage(targetHash);
            }
        });
    });


    // --- 2. TYPING EFFECT (HERO UTAMA & HERO ABOUT) ---
    
    // Typing Effect pada Hero Utama (Sub-title)
    const heroSubtitleEl = document.querySelector('.hero-subtitle');
    if (heroSubtitleEl) {
        // Gantilah teks statis lama dengan dynamic typing
        const textToType = "Kenali bahayanya, lindungi masa depanmu. Jangan biarkan narkoba merenggut mimpimu.";
        heroSubtitleEl.innerHTML = '<span class="typing-text"></span><span class="typing-cursor"></span>';
        const typingSpan = heroSubtitleEl.querySelector('.typing-text');
        
        let charIndex = 0;
        function typeHeroSubtitle() {
            if (charIndex < textToType.length) {
                typingSpan.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeHeroSubtitle, 40);
            }
        }
        
        // Mulai typing effect dengan delay kecil
        setTimeout(typeHeroSubtitle, 2000);
    }

    // Typing Effect pada Hero About
    const aboutTitleSpan = document.getElementById('about-typed-title');
    let aboutTypingInterval = null;
    
    function startAboutTypingEffect() {
        if (!aboutTitleSpan) return;
        
        // Hentikan interval lama jika ada
        if (aboutTypingInterval) clearInterval(aboutTypingInterval);
        
        const text = "PIK-R JP ONE";
        aboutTitleSpan.textContent = "";
        let index = 0;
        
        aboutTypingInterval = setInterval(() => {
            if (index < text.length) {
                aboutTitleSpan.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(aboutTypingInterval);
            }
        }, 120);
    }


    // --- 3. ANIMASI COUNTER STATISTIK ---
    const counters = document.querySelectorAll('.stat-count');
    const counterSpeed = 200;

    function runCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix') || '';
            const updateCount = () => {
                const count = +counter.innerText.replace(/[^0-9]/g, '');
                // Hitung langkah pertambahan
                const inc = target / counterSpeed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc) + suffix;
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target + suffix;
                }
            };
            updateCount();
        });
    }


    // --- 4. FAQ ACCORDION LOGIC ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('faq-open');
            
            // Tutup semua item FAQ lainnya terlebih dahulu
            faqItems.forEach(i => i.classList.remove('faq-open'));
            
            // Jika sebelumnya tertutup, maka buka
            if (!isOpen) {
                item.classList.add('faq-open');
            }
        });
    });


    // --- 5. INTERSECTION OBSERVER ANIMASI (AOS-LIKE) ---
    const aoElements = document.querySelectorAll('[data-ao]');
    const statSection = document.getElementById('stats-section');
    let hasCounted = false;

    const aoObserverOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    };

    const aoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Tambahkan class ao-animated saat masuk viewport
                entry.target.classList.add('ao-animated');
                
                // Trigger counter jika section stats terlihat
                if (entry.target === statSection && !hasCounted) {
                    runCounters();
                    hasCounted = true;
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, aoObserverOptions);

    aoElements.forEach(el => {
        aoObserver.observe(el);
    });
    
    if (statSection) {
        aoObserver.observe(statSection);
    }


    // --- 6. BACK TO TOP & SMOOTH SCROLL ---
    const backToTopButtons = document.querySelectorAll('.btn-backtop');
    backToTopButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Cek apakah halaman About PIK-R sedang terbuka
            if (aboutOverlay && aboutOverlay.classList.contains('about-visible')) {
                aboutOverlay.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

});

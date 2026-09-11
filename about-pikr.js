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


    // --- 7. INTERACTIVE GALLERY HERO ANIMATION ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryModal = document.getElementById('gallery-hero-modal');
    const galleryCard = document.getElementById('gallery-hero-card');
    const galleryBackdrop = document.getElementById('gallery-hero-backdrop');
    const galleryCloseBtn = document.getElementById('gallery-hero-close');
    const galleryPrevBtn = document.getElementById('gallery-hero-prev');
    const galleryNextBtn = document.getElementById('gallery-hero-next');
    const galleryImg = document.getElementById('gallery-hero-img');
    const galleryTag = document.getElementById('gallery-hero-tag');
    const galleryTitle = document.getElementById('gallery-hero-title');
    const galleryDesc = document.getElementById('gallery-hero-desc');
    const galleryCounter = document.getElementById('gallery-hero-counter');
    const galleryInfo = document.getElementById('gallery-hero-info');

    let activeGalleryIndex = 0;
    let isGalleryAnimating = false;

    function openGalleryHero(index) {
        if (!galleryModal || !galleryCard || isGalleryAnimating) return;
        if (index < 0 || index >= galleryItems.length) return;

        isGalleryAnimating = true;
        activeGalleryIndex = index;
        const currentItem = galleryItems[index];
        const currentImg = currentItem.querySelector('img');

        // Update modal content
        if (galleryImg && currentImg) {
            galleryImg.src = currentImg.src;
            galleryImg.alt = currentImg.alt || 'Dokumentasi PIK-R';
        }
        if (galleryTitle) {
            galleryTitle.textContent = currentItem.getAttribute('data-title') || 'Dokumentasi Kegiatan';
        }
        if (galleryTag) {
            galleryTag.innerHTML = `<i class="fa-solid fa-camera-retro"></i> ${currentItem.getAttribute('data-tag') || 'Dokumentasi'}`;
        }
        if (galleryDesc) {
            galleryDesc.textContent = currentItem.getAttribute('data-desc') || 'bisaaaaaa';
        }
        if (galleryCounter) {
            galleryCounter.textContent = `Foto ${index + 1} / ${galleryItems.length}`;
        }

        // 1. First: Ambil posisi thumbnail sebelum dibuka
        const startRect = currentItem.getBoundingClientRect();

        // 2. Tampilkan modal overlay
        galleryModal.classList.add('is-open');
        galleryModal.setAttribute('aria-hidden', 'false');

        // 3. Last: Ambil posisi target modal card
        const targetRect = galleryCard.getBoundingClientRect();

        // 4. Invert: Hitung delta dan scale untuk Hero Shared Element Animation
        const deltaX = startRect.left - targetRect.left;
        const deltaY = startRect.top - targetRect.top;
        const scaleX = startRect.width / targetRect.width;
        const scaleY = startRect.height / targetRect.height;

        galleryCard.style.transformOrigin = 'top left';
        galleryCard.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`;
        galleryCard.style.borderRadius = '20px';
        galleryCard.style.transition = 'none';

        if (galleryInfo) {
            galleryInfo.style.opacity = '0';
            galleryInfo.style.transform = 'translateY(18px)';
            galleryInfo.style.transition = 'none';
        }

        // Force reflow
        galleryCard.offsetHeight;

        // 5. Play: Animasikan membesar ke posisi modal tengah layar
        requestAnimationFrame(() => {
            galleryCard.style.transition = 'transform 0.48s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.48s ease';
            galleryCard.style.transform = 'translate(0px, 0px) scale(1, 1)';
            galleryCard.style.borderRadius = '24px';

            if (galleryInfo) {
                galleryInfo.style.transition = 'opacity 0.38s ease 0.18s, transform 0.38s cubic-bezier(0.16, 1, 0.3, 1) 0.18s';
                galleryInfo.style.opacity = '1';
                galleryInfo.style.transform = 'translateY(0)';
            }

            setTimeout(() => {
                isGalleryAnimating = false;
            }, 500);
        });
    }

    function closeGalleryHero() {
        if (!galleryModal || !galleryCard || !galleryModal.classList.contains('is-open') || isGalleryAnimating) return;

        isGalleryAnimating = true;
        const currentItem = galleryItems[activeGalleryIndex];

        if (galleryInfo) {
            galleryInfo.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            galleryInfo.style.opacity = '0';
            galleryInfo.style.transform = 'translateY(12px)';
        }

        if (currentItem) {
            const endRect = currentItem.getBoundingClientRect();
            const currentRect = galleryCard.getBoundingClientRect();

            const deltaX = endRect.left - currentRect.left;
            const deltaY = endRect.top - currentRect.top;
            const scaleX = endRect.width / currentRect.width;
            const scaleY = endRect.height / currentRect.height;

            galleryCard.style.transition = 'transform 0.38s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.38s ease';
            galleryCard.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`;
            galleryCard.style.borderRadius = '20px';
        }

        if (galleryBackdrop) {
            galleryBackdrop.style.transition = 'opacity 0.35s ease';
            galleryBackdrop.style.opacity = '0';
        }

        setTimeout(() => {
            galleryModal.classList.remove('is-open');
            galleryModal.setAttribute('aria-hidden', 'true');

            // Reset inline styles
            galleryCard.style.transform = '';
            galleryCard.style.transition = '';
            galleryCard.style.borderRadius = '';
            galleryCard.style.transformOrigin = '';

            if (galleryInfo) {
                galleryInfo.style.opacity = '';
                galleryInfo.style.transform = '';
                galleryInfo.style.transition = '';
            }
            if (galleryBackdrop) {
                galleryBackdrop.style.opacity = '';
                galleryBackdrop.style.transition = '';
            }

            isGalleryAnimating = false;
        }, 380);
    }

    function showGalleryItem(newIndex) {
        if (isGalleryAnimating) return;
        if (newIndex < 0) newIndex = galleryItems.length - 1;
        if (newIndex >= galleryItems.length) newIndex = 0;

        activeGalleryIndex = newIndex;
        const targetItem = galleryItems[newIndex];
        const targetImg = targetItem.querySelector('img');

        if (galleryImg) {
            galleryImg.classList.add('switching');
            setTimeout(() => {
                if (targetImg) {
                    galleryImg.src = targetImg.src;
                    galleryImg.alt = targetImg.alt || 'Dokumentasi PIK-R';
                }
                if (galleryTitle) {
                    galleryTitle.textContent = targetItem.getAttribute('data-title') || 'Dokumentasi Kegiatan';
                }
                if (galleryTag) {
                    galleryTag.innerHTML = `<i class="fa-solid fa-camera-retro"></i> ${targetItem.getAttribute('data-tag') || 'Dokumentasi'}`;
                }
                if (galleryDesc) {
                    galleryDesc.textContent = targetItem.getAttribute('data-desc') || 'Dokumentasi kegiatan dan aksi nyata pengurus serta kader PIK-R JP ONE.';
                }
                if (galleryCounter) {
                    galleryCounter.textContent = `Foto ${newIndex + 1} / ${galleryItems.length}`;
                }
                galleryImg.classList.remove('switching');
            }, 150);
        }
    }

    // Pasang event listener pada setiap thumbnail galeri
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openGalleryHero(index);
        });

        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openGalleryHero(index);
            }
        });
    });

    // Event listener untuk tombol Close & Backdrop
    if (galleryCloseBtn) {
        galleryCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeGalleryHero();
        });
    }

    if (galleryBackdrop) {
        galleryBackdrop.addEventListener('click', () => {
            closeGalleryHero();
        });
    }

    // Event listener untuk tombol Prev & Next
    if (galleryPrevBtn) {
        galleryPrevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showGalleryItem(activeGalleryIndex - 1);
        });
    }

    if (galleryNextBtn) {
        galleryNextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showGalleryItem(activeGalleryIndex + 1);
        });
    }

    // Keyboard navigation (Escape, ArrowLeft, ArrowRight)
    window.addEventListener('keydown', (e) => {
        if (!galleryModal || !galleryModal.classList.contains('is-open')) return;

        if (e.key === 'Escape') {
            closeGalleryHero();
        } else if (e.key === 'ArrowLeft') {
            showGalleryItem(activeGalleryIndex - 1);
        } else if (e.key === 'ArrowRight') {
            showGalleryItem(activeGalleryIndex + 1);
        }
    });

});


document.addEventListener('DOMContentLoaded', () => {
    /* === LOADER === */
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);

    /* === NAVBAR TOGGLE === */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    /* === THEME TOGGLE === */
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    let isDark = false;

    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        if (isDark) {
            body.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            body.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    });

    /* === AUDIO TOGGLE === */
    const audioToggle = document.getElementById('audio-toggle');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    // Lower volume
    bgMusic.volume = 0.3;

    audioToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            audioToggle.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        } else {
            bgMusic.play().catch(e => console.log("Audio play prevented:", e));
            audioToggle.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        }
        isPlaying = !isPlaying;
    });

    /* === SCROLL ANIMATION (FADE IN) === */
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    /* === QUOTES SLIDER === */
    const quotes = [
        "Masa depan cerah dimulai dari hidup sehat.",
        "Sayangi dirimu, jauhi narkoba.",
        "Narkoba adalah jalan pintas menuju kehancuran.",
        "Prestasi yes, Narkoba no!",
        "Keluarga menunggumu pulang tanpa pengaruh zat terlarang."
    ];
    const quoteText = document.getElementById('quote-text');
    let quoteIndex = 0;

    if (quoteText) {
        setInterval(() => {
            quoteText.style.opacity = 0;
            setTimeout(() => {
                quoteIndex = (quoteIndex + 1) % quotes.length;
                quoteText.innerText = quotes[quoteIndex];
                quoteText.style.opacity = 1;
            }, 500);
        }, 4000);
    }

    /* === QUIZ LOGIC === */
    const quizData = [
        {
            question: "Apa singkatan dari Narkoba?",
            options: ["Narkotika, psikotropika, dan zat adiktif lainnya", "Narkotika dan Bahan Kimia", "Narkoba dan Obat-obatan", "Narkotika dan Obat Bebas"],
            correct: 0
        },
        {
            question: "Ganja, Sabu, dan Heroin termasuk ke dalam Narkotika golongan berapa?",
            options: ["Golongan I", "Golongan II", "Golongan III", "Golongan IV"],
            correct: 0
        },
        {
            question: "Apa dampak psikologis dari penggunaan narkoba?",
            options: ["Lebih fokus", "Depresi dan halusinasi", "Meningkatkan daya ingat", "Membuat tubuh kebal penyakit"],
            correct: 1
        },
        {
            question: "Cara paling efektif untuk menghindari narkoba bagi remaja adalah?",
            options: ["Mencoba sedikit saja", "Bergaul dengan siapa saja", "Memilih pergaulan sehat & kegiatan positif", "Menyendiri di kamar"],
            correct: 2
        },
        {
            question: "Jika teman menawarkan narkoba, sikap yang benar adalah?",
            options: ["Menerima karena tidak enak", "Menolak dengan tegas", "Menyimpannya untuk nanti", "Meminta bayaran"],
            correct: 1
        },
        {
            question: "Apa yang dimaksud dengan rehabilitasi narkoba?",
            options: ["Hukuman penjara bagi pengguna", "Proses pemulihan fisik dan mental pecandu", "Pelatihan untuk memproduksi obat", "Tempat berkumpulnya pengedar"],
            correct: 1
        },
        {
            question: "Efek samping yang sangat umum dari penggunaan sabu-sabu adalah?",
            options: ["Sangat mengantuk dan rileks", "Nafsu makan meningkat pesat", "Hiperaktif, sulit tidur, dan paranoid", "Tubuh menjadi lebih kebal penyakit"],
            correct: 2
        },
        {
            question: "Di Indonesia, lembaga pemerintah yang khusus menangani masalah narkoba adalah?",
            options: ["KPK", "BMKG", "BNN", "BIN"],
            correct: 2
        },
        {
            question: "Apa hukuman maksimal bagi pengedar narkoba kelas berat di Indonesia?",
            options: ["Denda 1 juta rupiah", "Kerja sosial", "Penjara 1 tahun", "Hukuman mati"],
            correct: 3
        },
        {
            question: "Mengapa remaja dianggap rentan terhadap penyalahgunaan narkoba?",
            options: ["Karena remaja selalu punya banyak uang", "Karena remaja sedang mencari jati diri dan mudah terpengaruh", "Karena remaja kebal terhadap penyakit", "Karena narkoba baik untuk pertumbuhan"],
            correct: 1
        },
        {
            question: "Gejala 'sakau' atau putus zat terjadi karena?",
            options: ["Tubuh kekurangan vitamin", "Tubuh sudah sangat ketergantungan pada narkoba", "Tubuh terlalu banyak istirahat", "Tubuh alergi terhadap makanan tertentu"],
            correct: 1
        },
        {
            question: "Peran utama keluarga dalam pencegahan narkoba adalah?",
            options: ["Memberikan dukungan moral, kasih sayang, dan edukasi", "Membiarkan anak melakukan apa saja", "Memberikan uang jajan tanpa batas", "Menghukum anak setiap saat"],
            correct: 0
        },
        {
            question: "Menghisap lem (ngelem) termasuk dalam bentuk penyalahgunaan?",
            options: ["Zat Inhalan", "Narkotika Golongan I", "Psikotropika", "Minuman Keras"],
            correct: 0
        },
        {
            question: "Apa ciri-ciri fisik yang sering terlihat pada pengguna berat narkoba?",
            options: ["Kulit bersinar dan sehat", "Berat badan naik drastis", "Mata merah muda, pupil berubah, dan berat badan turun drastis", "Rambut tumbuh lebih cepat"],
            correct: 2
        },
        {
            question: "Apa tujuan utama dari penyuluhan bahaya narkoba?",
            options: ["Mengajarkan cara membuat obat", "Mencegah penyalahgunaan narkoba sejak dini", "Mempromosikan jenis narkoba baru", "Mengurangi jam pelajaran di sekolah"],
            correct: 1
        },
        {
            question: "Bagaimana sikap kita jika mengetahui teman menggunakan narkoba?",
            options: ["Mencoba ikut-ikutan", "Menjauhinya selamanya", "Melaporkan ke guru atau orang dewasa agar ia ditolong", "Meminta uang tutup mulut"],
            correct: 2
        },
        {
            question: "Minuman keras atau alkohol berlebihan termasuk ke dalam kelompok?",
            options: ["Zat Adiktif lainnya", "Narkotika", "Psikotropika", "Obat bebas terbatas"],
            correct: 0
        },
        {
            question: "Jarum suntik yang dipakai bergantian oleh pengguna narkoba berisiko menularkan penyakit apa?",
            options: ["Asma", "Diabetes", "HIV/AIDS dan Hepatitis", "Maag"],
            correct: 2
        },
        {
            question: "Obat resep dokter yang disalahgunakan tanpa resep untuk penenang biasanya digolongkan sebagai?",
            options: ["Vitamin C", "Psikotropika", "Antibiotik", "Suplemen diet"],
            correct: 1
        },
        {
            question: "Masa depan tanpa narkoba berarti?",
            options: ["Hidup membosankan", "Tubuh sehat, mental kuat, dan siap meraih mimpi", "Kehilangan teman", "Tidak bisa bahagia"],
            correct: 1
        }
    ];

    let currentQuizSet = [];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const startQuizBtn = document.getElementById('start-quiz-btn');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');
    const quizIntro = document.getElementById('quiz-intro');
    const quizArea = document.getElementById('quiz-area');
    const quizResult = document.getElementById('quiz-result');

    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const progressBar = document.getElementById('progress-bar');
    const feedbackMsg = document.getElementById('feedback-message');
    const scoreText = document.getElementById('score-text');
    const resultMsg = document.getElementById('result-message');

    let currentQuestion = 0;
    let score = 0;
    let canClick = true;

    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', startQuiz);
        restartQuizBtn.addEventListener('click', startQuiz);
    }

    function startQuiz() {
        currentQuestion = 0;
        score = 0;
        quizIntro.classList.add('hidden');
        quizResult.classList.add('hidden');
        quizArea.classList.remove('hidden');

        let shuffled = [...quizData];
        shuffleArray(shuffled);
        currentQuizSet = shuffled.slice(0, 10);

        loadQuestion();
    }

    function loadQuestion() {
        canClick = true;
        feedbackMsg.innerText = '';
        const q = currentQuizSet[currentQuestion];
        questionText.innerText = `${currentQuestion + 1}. ${q.question}`;

        // Update progress
        progressBar.style.width = `${(currentQuestion / currentQuizSet.length) * 100}%`;

        // Load options
        optionsContainer.innerHTML = '';
        q.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.classList.add('option-btn');
            btn.innerText = opt;
            btn.addEventListener('click', () => checkAnswer(index, btn));
            optionsContainer.appendChild(btn);
        });
    }

    function checkAnswer(selectedIndex, btnElement) {
        if (!canClick) return;
        canClick = false;

        const correctIndex = currentQuizSet[currentQuestion].correct;
        const options = optionsContainer.children;

        if (selectedIndex === correctIndex) {
            btnElement.classList.add('correct');
            feedbackMsg.innerText = 'Benar! Luar biasa! 🎉';
            feedbackMsg.style.color = 'var(--success-color)';
            score++;
        } else {
            btnElement.classList.add('wrong');
            options[correctIndex].classList.add('correct');
            feedbackMsg.innerText = 'Salah! Perhatikan jawaban yang benar. ❌';
            feedbackMsg.style.color = 'var(--primary-color)';
        }

        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < currentQuizSet.length) {
                loadQuestion();
            } else {
                showResults();
            }
        }, 1500);
    }

    function showResults() {
        quizArea.classList.add('hidden');
        quizResult.classList.remove('hidden');
        progressBar.style.width = '100%';

        scoreText.innerText = `${score} / ${currentQuizSet.length}`;

        if (score === currentQuizSet.length) {
            resultMsg.innerText = "Keren! Kamu sangat memahami bahaya narkoba. Pertahankan!";
        } else if (score >= 3) {
            resultMsg.innerText = "Bagus! Pengetahuanmu cukup baik, terus tingkatkan kewaspadaan.";
        } else {
            resultMsg.innerText = "Jangan menyerah! Yuk baca lagi materi di atas agar lebih paham.";
        }
    }

    /* === MINI GAME LOGIC === */
    const startGameBtn = document.getElementById('start-game-btn');
    const restartGameBtn = document.getElementById('restart-game-btn');
    const startOverlay = document.getElementById('game-start-overlay');
    const overOverlay = document.getElementById('game-over-overlay');
    const gameBoard = document.getElementById('game-board');
    const player = document.getElementById('player');
    const scoreDisplay = document.getElementById('game-score');
    const timeDisplay = document.getElementById('game-time');
    const finalScore = document.getElementById('final-score');

    let gameInterval;
    let itemInterval;
    let timerInterval;
    let gameScore = 0;
    let timeLeft = 30;
    let isGameOver = true;
    let playerPos = 50; // percentage
    const itemsList = [];

    // Icons: positive (fas fa-book, fas fa-apple-whole, fas fa-music), negative (fas fa-pills, fas fa-syringe)
    const positiveIcons = ['<i class="fa-solid fa-book"></i>', '<i class="fa-solid fa-apple-whole"></i>', '<i class="fa-solid fa-music"></i>', '<i class="fa-solid fa-dumbbell"></i>'];
    const negativeIcons = ['<i class="fa-solid fa-pills"></i>', '<i class="fa-solid fa-syringe"></i>', '<i class="fa-solid fa-smoking"></i>'];

    if (startGameBtn) {
        startGameBtn.addEventListener('click', initGame);
        restartGameBtn.addEventListener('click', initGame);

        // Player movement
        document.addEventListener('keydown', (e) => {
            if (isGameOver) return;
            if (e.key === 'ArrowLeft') {
                playerPos = Math.max(5, playerPos - 10);
                updatePlayerPos();
            } else if (e.key === 'ArrowRight') {
                playerPos = Math.min(95, playerPos + 10);
                updatePlayerPos();
            }
        });

        // Pointer movement (Touch & Mouse)
        gameBoard.addEventListener('touchmove', e => {
            if (isGameOver) return;
            handlePointerMove(e.changedTouches[0].clientX);
        }, { passive: true });

        gameBoard.addEventListener('mousemove', e => {
            if (isGameOver) return;
            handlePointerMove(e.clientX);
        });
    }

    function handlePointerMove(clientX) {
        let boardRect = gameBoard.getBoundingClientRect();
        let relX = clientX - boardRect.left;
        playerPos = (relX / boardRect.width) * 100;
        playerPos = Math.max(5, Math.min(95, playerPos));
        updatePlayerPos();
    }

    function updatePlayerPos() {
        player.style.left = `${playerPos}%`;
    }

    function initGame() {
        isGameOver = false;
        gameScore = 0;
        timeLeft = 30;
        scoreDisplay.innerText = gameScore;
        timeDisplay.innerText = timeLeft;
        playerPos = 50;
        updatePlayerPos();

        startOverlay.classList.add('hidden');
        overOverlay.classList.add('hidden');

        // Clear items
        const existingItems = document.querySelectorAll('.game-item');
        existingItems.forEach(item => item.remove());
        itemsList.length = 0;

        startGameLoop();
    }

    function startGameLoop() {
        // Spawn items
        itemInterval = setInterval(spawnItem, 800);

        // Game loop
        gameInterval = setInterval(updateGame, 50);

        // Timer
        timerInterval = setInterval(() => {
            timeLeft--;
            timeDisplay.innerText = timeLeft;
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    function spawnItem() {
        if (isGameOver) return;
        const item = document.createElement('div');
        item.classList.add('game-item');

        const isPositive = Math.random() > 0.4; // 60% positive

        if (isPositive) {
            item.innerHTML = positiveIcons[Math.floor(Math.random() * positiveIcons.length)];
            item.style.color = '#27ae60'; // Success color
            item.dataset.type = 'positive';
        } else {
            item.innerHTML = negativeIcons[Math.floor(Math.random() * negativeIcons.length)];
            item.style.color = '#c0392b'; // Danger color
            item.dataset.type = 'negative';
        }

        const startX = Math.random() * 90 + 5;
        item.style.left = `${startX}%`;
        item.style.top = `-30px`;

        gameBoard.appendChild(item);
        itemsList.push({
            element: item,
            y: -30,
            x: startX,
            speed: 5 + Math.random() * 5
        });
    }

    function updateGame() {
        const playerRect = player.getBoundingClientRect();
        const boardRect = gameBoard.getBoundingClientRect();

        for (let i = itemsList.length - 1; i >= 0; i--) {
            const itemObj = itemsList[i];
            itemObj.y += itemObj.speed;
            itemObj.element.style.top = `${itemObj.y}px`;

            // Check collision
            const itemRect = itemObj.element.getBoundingClientRect();

            if (isColliding(playerRect, itemRect)) {
                if (itemObj.element.dataset.type === 'positive') {
                    gameScore += 10;
                } else {
                    gameScore -= 20; // Penalty for negative
                    // Visual feedback for hitting drug
                    gameBoard.style.backgroundColor = 'rgba(192, 57, 43, 0.3)';
                    setTimeout(() => gameBoard.style.backgroundColor = 'rgba(41, 128, 185, 0.08)', 200);
                }
                scoreDisplay.innerText = gameScore;

                itemObj.element.remove();
                itemsList.splice(i, 1);

                if (gameScore >= 150) {
                    endGame();
                }
                continue;
            }

            // Remove if out of bounds
            if (itemObj.y > boardRect.height) {
                itemObj.element.remove();
                itemsList.splice(i, 1);
            }
        }
    }

    function isColliding(rect1, rect2) {
        // Shrink hitboxes a bit for fairness
        const r1 = {
            left: rect1.left + 10, right: rect1.right - 10,
            top: rect1.top + 10, bottom: rect1.bottom - 10
        };
        const r2 = {
            left: rect2.left + 5, right: rect2.right - 5,
            top: rect2.top + 5, bottom: rect2.bottom - 5
        };

        return !(r1.right < r2.left ||
            r1.left > r2.right ||
            r1.bottom < r2.top ||
            r1.top > r2.bottom);
    }

    function endGame() {
        isGameOver = true;
        clearInterval(gameInterval);
        clearInterval(itemInterval);
        clearInterval(timerInterval);

        finalScore.innerText = gameScore;
        const msg = document.getElementById('game-message');
        const title = document.getElementById('game-over-title');

        if (gameScore >= 150) {
            title.innerText = "selamat kamu hebat >_<";
            title.style.color = "var(--success-color)";
            msg.innerText = "Target tercapai! Hidup sehat tanpa narkoba!";
            msg.style.color = 'var(--success-color)';
        } else {
            title.innerText = "Game Over!";
            title.style.color = "var(--text-color)";
            msg.innerText = "Waktu habis! Target 150 belum tercapai. Ayo coba lagi!";
            msg.style.color = 'var(--primary-color)';
        }

        overOverlay.classList.remove('hidden');
    }

    /* === ESCAPE FROM DRUGS GAME LOGIC === */
    const escapeStartBtn = document.getElementById('escape-start-btn');
    const escapeRestartBtn = document.getElementById('escape-restart-btn');
    const escapePauseBtn = document.getElementById('escape-pause-btn');
    const escapeResumeBtn = document.getElementById('escape-resume-btn');
    const escapeStartOverlay = document.getElementById('escape-start-overlay');
    const escapeOverOverlay = document.getElementById('escape-over-overlay');
    const escapePauseOverlay = document.getElementById('escape-pause-overlay');
    const escapeBoard = document.getElementById('escape-board');
    const escapePlayer = document.getElementById('escape-player');
    const escapeScoreDisplay = document.getElementById('escape-score');
    const escapeTimeDisplay = document.getElementById('escape-time');
    const escapeLivesDisplay = document.getElementById('escape-lives');
    const escapeFinalScore = document.getElementById('escape-final-score');
    const escapeOverTitle = document.getElementById('escape-over-title');
    const escapeMessage = document.getElementById('escape-message');

    const sfxCollect = document.getElementById('sfx-collect');
    const sfxHit = document.getElementById('sfx-hit');

    let escapeScore = 0;
    let escapeTime = 60;
    let escapeLives = 3;

    let isEscapeRunning = false;
    let isEscapePaused = false;
    let escapeGameLoop;
    let escapeSpawner;
    let escapeTimer;

    let escPlayerX = 50; // percentage
    let escPlayerY = 50; // percentage
    let escPlayerSpeed = 1.0;
    const keys = { w: false, a: false, s: false, d: false, ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false };

    const positiveItems = ['<i class="fa-solid fa-book"></i>', '<i class="fa-solid fa-bottle-water"></i>', '<i class="fa-solid fa-basketball"></i>', '<i class="fa-solid fa-music"></i>', '<i class="fa-solid fa-apple-whole"></i>'];
    const negativeItems = ['<i class="fa-solid fa-pills"></i>', '<i class="fa-solid fa-syringe"></i>', '<i class="fa-solid fa-smoking"></i>'];

    let escEntities = [];

    // Controls for keyboard
    if (escapeStartBtn) {
        document.addEventListener('keydown', e => { if (keys.hasOwnProperty(e.key)) keys[e.key] = true; });
        document.addEventListener('keyup', e => { if (keys.hasOwnProperty(e.key)) keys[e.key] = false; });

        // D-PAD controls
        const dBtns = {
            'd-up': 'ArrowUp', 'd-down': 'ArrowDown', 'd-left': 'ArrowLeft', 'd-right': 'ArrowRight'
        };
        for (let id in dBtns) {
            let btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('touchstart', (e) => { e.preventDefault(); keys[dBtns[id]] = true; }, { passive: false });
                btn.addEventListener('touchend', (e) => { e.preventDefault(); keys[dBtns[id]] = false; }, { passive: false });
                btn.addEventListener('mousedown', () => { keys[dBtns[id]] = true; });
                btn.addEventListener('mouseup', () => { keys[dBtns[id]] = false; });
                btn.addEventListener('mouseleave', () => { keys[dBtns[id]] = false; });
            }
        }

        escapeStartBtn.addEventListener('click', initEscapeGame);
        escapeRestartBtn.addEventListener('click', initEscapeGame);
        escapePauseBtn.addEventListener('click', togglePauseEscape);
        escapeResumeBtn.addEventListener('click', togglePauseEscape);
    }

    function initEscapeGame() {
        isEscapeRunning = true;
        isEscapePaused = false;
        escapeScore = 0;
        escapeTime = 60;
        escapeLives = 3;
        escPlayerX = 50;
        escPlayerY = 50;
        updateEscapeLives();
        escapeScoreDisplay.innerText = escapeScore;
        escapeTimeDisplay.innerText = escapeTime;

        escapeStartOverlay.classList.add('hidden');
        escapeOverOverlay.classList.add('hidden');
        escapePauseOverlay.classList.add('hidden');
        escapePauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';

        // Clear entities
        escEntities.forEach(ent => ent.element.remove());
        escEntities = [];

        updateEscPlayerPos();

        clearInterval(escapeSpawner);
        clearInterval(escapeTimer);
        cancelAnimationFrame(escapeGameLoop);

        escapeTimer = setInterval(() => {
            if (isEscapePaused) return;
            escapeTime--;
            escapeTimeDisplay.innerText = escapeTime;
            if (escapeTime <= 0) {
                endEscapeGame(escapeScore >= 100);
            }
        }, 1000);

        escapeSpawner = setInterval(spawnEscItem, 800);
        escapeGameLoop = requestAnimationFrame(updateEscapeGame);
    }

    function togglePauseEscape() {
        if (!isEscapeRunning) return;
        isEscapePaused = !isEscapePaused;
        if (isEscapePaused) {
            escapePauseOverlay.classList.remove('hidden');
            escapePauseBtn.innerHTML = '<i class="fa-solid fa-play"></i> Play';
        } else {
            escapePauseOverlay.classList.add('hidden');
            escapePauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
            escapeGameLoop = requestAnimationFrame(updateEscapeGame); // Resume loop
        }
    }

    function updateEscapeLives() {
        escapeLivesDisplay.innerText = '❤️'.repeat(Math.max(0, escapeLives));
    }

    function updateEscPlayerPos() {
        escapePlayer.style.left = `${escPlayerX}%`;
        escapePlayer.style.top = `${escPlayerY}%`;
    }

    function spawnEscItem() {
        if (isEscapePaused || !isEscapeRunning) return;
        const item = document.createElement('div');
        item.classList.add('escape-item');

        const isPositive = Math.random() < 0.65;
        const type = isPositive ? 'positive' : 'negative';

        if (isPositive) {
            item.innerHTML = positiveItems[Math.floor(Math.random() * positiveItems.length)];
            item.style.color = 'var(--primary-color)';
        } else {
            item.innerHTML = negativeItems[Math.floor(Math.random() * negativeItems.length)];
            item.style.color = '#c0392b';
        }

        // Random spawn location on borders
        let spawnX, spawnY;
        if (Math.random() > 0.5) {
            spawnX = Math.random() > 0.5 ? -10 : 110;
            spawnY = Math.random() * 100;
        } else {
            spawnX = Math.random() * 100;
            spawnY = Math.random() > 0.5 ? -10 : 110;
        }

        item.style.left = `${spawnX}%`;
        item.style.top = `${spawnY}%`;

        escapeBoard.appendChild(item);

        escEntities.push({
            element: item,
            x: spawnX,
            y: spawnY,
            type: type,
            speedX: (Math.random() - 0.5) * 0.8,
            speedY: (Math.random() - 0.5) * 0.8,
            isChasing: !isPositive && Math.random() > 0.6 // Some drugs chase the player
        });
    }

    function updateEscapeGame() {
        if (!isEscapeRunning || isEscapePaused) return;

        // Player Movement
        if (keys.w || keys.ArrowUp) escPlayerY = Math.max(5, escPlayerY - escPlayerSpeed);
        if (keys.s || keys.ArrowDown) escPlayerY = Math.min(95, escPlayerY + escPlayerSpeed);
        if (keys.a || keys.ArrowLeft) escPlayerX = Math.max(5, escPlayerX - escPlayerSpeed);
        if (keys.d || keys.ArrowRight) escPlayerX = Math.min(95, escPlayerX + escPlayerSpeed);
        updateEscPlayerPos();

        const pRect = escapePlayer.getBoundingClientRect();

        // Entity updates
        for (let i = escEntities.length - 1; i >= 0; i--) {
            const ent = escEntities[i];

            if (ent.isChasing) {
                // Move towards player
                const dx = escPlayerX - ent.x;
                const dy = escPlayerY - ent.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist > 0) {
                    ent.x += (dx / dist) * 0.3;
                    ent.y += (dy / dist) * 0.3;
                }
            } else {
                ent.x += ent.speedX;
                ent.y += ent.speedY;
            }

            ent.element.style.left = `${ent.x}%`;
            ent.element.style.top = `${ent.y}%`;

            // Collision
            const eRect = ent.element.getBoundingClientRect();
            if (isIntersecting(pRect, eRect, 5)) {
                if (ent.type === 'positive') {
                    escapeScore += 10;
                    escapeScoreDisplay.innerText = escapeScore;
                    playSound(sfxCollect);
                    if (escapeScore >= 100) {
                        endEscapeGame(true);
                        return;
                    }
                } else {
                    escapeLives--;
                    updateEscapeLives();
                    playSound(sfxHit);

                    // Flash red
                    escapeBoard.style.backgroundColor = 'rgba(192, 57, 43, 0.4)';
                    setTimeout(() => { if (isEscapeRunning) escapeBoard.style.backgroundColor = 'rgba(41, 128, 185, 0.12)'; }, 200);

                    if (escapeLives <= 0) {
                        endEscapeGame(false);
                        return;
                    }
                }

                ent.element.remove();
                escEntities.splice(i, 1);
                continue;
            }

            // Remove out of bounds
            if (ent.x < -20 || ent.x > 120 || ent.y < -20 || ent.y > 120) {
                ent.element.remove();
                escEntities.splice(i, 1);
            }
        }

        escapeGameLoop = requestAnimationFrame(updateEscapeGame);
    }

    function playSound(audioElement) {
        if (!audioElement) return;
        audioElement.currentTime = 0;
        audioElement.play().catch(e => { }); // Ignore error
    }

    function isIntersecting(rect1, rect2, shrink = 0) {
        const r1 = { left: rect1.left + shrink, right: rect1.right - shrink, top: rect1.top + shrink, bottom: rect1.bottom - shrink };
        const r2 = { left: rect2.left + shrink, right: rect2.right - shrink, top: rect2.top + shrink, bottom: rect2.bottom - shrink };
        return !(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom);
    }

    function endEscapeGame(isWin = false) {
        isEscapeRunning = false;
        clearInterval(escapeTimer);
        clearInterval(escapeSpawner);
        cancelAnimationFrame(escapeGameLoop);

        escapeFinalScore.innerText = escapeScore;

        if (isWin || escapeScore >= 100) {
            escapeOverTitle.innerText = "Selamat! Kamu berhasil memilih hidup sehat.";
            escapeOverTitle.style.color = "var(--success-color)";
            escapeMessage.innerText = "Kamu telah membuktikan bahwa hidup tanpa narkoba jauh lebih indah!";
            escapeMessage.style.color = "var(--success-color)";
        } else {
            escapeOverTitle.innerText = "Game Over!";
            escapeOverTitle.style.color = "var(--primary-color)";
            escapeMessage.innerText = "Jangan biarkan narkoba menghancurkan masa depanmu.";
            escapeMessage.style.color = "var(--text-color)";
        }

        escapeOverOverlay.classList.remove('hidden');
    }
});

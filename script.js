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
    let isDark = true;

    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        if (isDark) {
            body.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        } else {
            body.setAttribute('data-theme', 'light');
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
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

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
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

    setInterval(() => {
        quoteText.style.opacity = 0;
        setTimeout(() => {
            quoteIndex = (quoteIndex + 1) % quotes.length;
            quoteText.innerText = quotes[quoteIndex];
            quoteText.style.opacity = 1;
        }, 500);
    }, 4000);

    /* === QUIZ LOGIC === */
    const quizData = [
        {
            question: "Apa singkatan dari Narkoba?",
            options: ["Narkotika dan Obat Berbahaya", "Narkotika dan Bahan Kimia", "Narkoba dan Obat-obatan", "Narkotika dan Obat Bebas"],
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
        }
    ];

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

    startQuizBtn.addEventListener('click', startQuiz);
    restartQuizBtn.addEventListener('click', startQuiz);

    function startQuiz() {
        currentQuestion = 0;
        score = 0;
        quizIntro.classList.add('hidden');
        quizResult.classList.add('hidden');
        quizArea.classList.remove('hidden');
        loadQuestion();
    }

    function loadQuestion() {
        canClick = true;
        feedbackMsg.innerText = '';
        const q = quizData[currentQuestion];
        questionText.innerText = `${currentQuestion + 1}. ${q.question}`;
        
        // Update progress
        progressBar.style.width = `${(currentQuestion / quizData.length) * 100}%`;
        
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

        const correctIndex = quizData[currentQuestion].correct;
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
            if (currentQuestion < quizData.length) {
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
        
        scoreText.innerText = `${score} / ${quizData.length}`;
        
        if (score === quizData.length) {
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
        if(isGameOver) return;
        handlePointerMove(e.changedTouches[0].clientX);
    }, {passive: true});

    gameBoard.addEventListener('mousemove', e => {
        if(isGameOver) return;
        handlePointerMove(e.clientX);
    });

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
        if(isGameOver) return;
        const item = document.createElement('div');
        item.classList.add('game-item');
        
        const isPositive = Math.random() > 0.4; // 60% positive
        
        if (isPositive) {
            item.innerHTML = positiveIcons[Math.floor(Math.random() * positiveIcons.length)];
            item.style.color = '#2a9d8f'; // Success color
            item.dataset.type = 'positive';
        } else {
            item.innerHTML = negativeIcons[Math.floor(Math.random() * negativeIcons.length)];
            item.style.color = '#e63946'; // Danger color
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
                    gameBoard.style.backgroundColor = 'rgba(230, 57, 70, 0.3)';
                    setTimeout(() => gameBoard.style.backgroundColor = 'rgba(0,0,0,0.2)', 200);
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
});

/* Part 1 : Global Variables */
const music = document.getElementById('bg-music');
const vinyl = document.getElementById('vinyl-disc');
const playStatus = document.getElementById('play-status');
let isPlaying = false;

/* Part 2 : Open Gift Function */
function openGift() {
    const overlay = document.getElementById('gift-overlay');
    overlay.classList.add('hide');

    setTimeout(() => { 
        overlay.style.display = 'none';
    }, 1200);

    const main = document.getElementById('main-content');
    setTimeout(() => {
        main.classList.add('visible');
    }, 300);

    /* Play Music */
    music.play()
        .then(() => {
            isPlaying = true;
            vinyl.classList.remove('paused');
            playStatus.textContent = '▶ Playing...';
        })
        .catch((err) => {
            console.log("Autoplay ditolak browser, musik butuh interaksi user.", err);
        });

    createStars();
    const isMobile = window.innerWidth < 600;
    
    /* Flower rain */
    setInterval(createPetal, isMobile ? 600 : 400);
    
    /* Activation scroll reveal */
    setTimeout(initScrollReveal, 500);
}

/* Part 3 : Music function */
function toggleMusic() {
    if (isPlaying) {
        music.pause();
        isPlaying = false;
        vinyl.classList.add('paused');
        playStatus.textContent = '❚❚ Paused';
    } else {
        music.play();
        isPlaying = true;
        vinyl.classList.remove('paused');
        playStatus.textContent = '▶ Playing...';
    }
}

/* Part 4 : Petal function */
function createPetal() {
    const symbols = ['🌸', '✨', '💖', '🌹', '🌷', '💕', '🌺', '💗'];
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.innerText = symbols[Math.floor(Math.random() * symbols.length)];

    petal.style.left = (Math.random() * 100) + 'vw';
    const isMobile = window.innerWidth < 600;

    const size = Math.random() * (isMobile ? 10 : 14) + 8;
    petal.style.fontSize = size + 'px';

    const duration = Math.random() * 4 + 4;
    petal.style.animationDuration = duration + 's';
    petal.style.animationDelay = (Math.random() * 0.5) + 's';

    document.body.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, (duration + 1) * 1000);
}

/* Part 5 : Create stars */
function createStars() {
    const container = document.getElementById('stars-container');
    if (!container) return;
    
    const count = window.innerWidth < 600 ? 25 : 40;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';

        star.style.setProperty('--duration', (Math.random() * 3 + 2).toFixed(1) + 's');
        star.style.setProperty('--delay', (Math.random() * 4).toFixed(1) + 's');

        const sz = Math.random() * 2 + 1;
        star.style.width = sz + 'px';
        star.style.height = sz + 'px';
        
        container.appendChild(star); 
    }
}

/* Part 6 : Init Scroll Reveal */
function initScrollReveal() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(e => { 
                if (e.isIntersecting) {
                    e.target.classList.add('revealed');
                    observer.unobserve(e.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        }
    );
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
}

/* Part 7 : Quiz Logic */
function pickAnswer(btn, hasil) {
    const semuaTombol = document.querySelectorAll('.opt-btn');
    semuaTombol.forEach(function(tombol) {
        tombol.disabled = true;
    });
 
    btn.classList.add(hasil);
 
    if (hasil === 'wrong') {
        setTimeout(function() {
            document.getElementById('try-again').classList.add('show');
        }, 500);
    } else {
        setTimeout(function() {
            alert("Yeay! actualy you are the perfect one ʕ≧ᴥ≦ʔ ");
        }, 500);
    }
}
 
function resetQuiz() {
    const semuaTombol = document.querySelectorAll('.opt-btn');
    semuaTombol.forEach(function(tombol) {
        tombol.disabled = false;                  
        tombol.classList.remove('wrong');         
        tombol.classList.remove('correct');      
    });
 
    document.getElementById('try-again').classList.remove('show');
}

/* Part 8 : Share Website */
function shareWebsite() {
    const message = " mungkin mau Ucapin Sesuatu Ke Yang Buat ?😗";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/62881026423994?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}
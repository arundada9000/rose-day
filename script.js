const messageElement = document.getElementById('message');
const proposalArea = document.getElementById('proposal-area');
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const confettiCanvas = document.getElementById('confetti');

// Sequence of events
// (No need for filled class anymore as we use CSS animation keyframes on paths)

setTimeout(() => {
    // After initial "Happy Rose Day" delay
    messageElement.style.opacity = '0';
    setTimeout(() => {
        messageElement.innerHTML = "I have a question...";
        messageElement.style.opacity = '1';

        setTimeout(() => {
            proposalArea.classList.remove('hidden');
            proposalArea.style.opacity = '0';
            // Fade in proposal area
            let op = 0;
            const timer = setInterval(() => {
                if (op >= 1) clearInterval(timer);
                proposalArea.style.opacity = op;
                op += 0.1;
            }, 50);
        }, 2000); // Slightly longer pause for drama
    }, 1000);
}, 5000); // wait for full drawing animation (4s) + read time

// "No" button runaway logic
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', moveButton); // For mobile

function moveButton() {
    const containerRect = document.querySelector('.container').getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate new random position within a safe area
    // Ensuring it doesn't go off-screen too easily
    const maxX = window.innerWidth - btnRect.width - 20;
    const maxY = window.innerHeight - btnRect.height - 20;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// "Yes" button celebration
yesBtn.addEventListener('click', () => {
    // 1. Change UI
    proposalArea.innerHTML = '<h2 style="font-size: 2rem; color: #d40028;">Yay! I love you! ❤️</h2>';
    messageElement.innerHTML = "Happy Valentine's Day!";

    // 2. Start Confetti
    startConfetti();
});


// Basic Confetti Implementation
function startConfetti() {
    const ctx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    const pieces = [];
    const numberOfPieces = 100;
    const colors = ['#ff3366', '#ffccd5', '#ffffff', '#ff0040'];

    for (let i = 0; i < numberOfPieces; i++) {
        pieces.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height,
            r: Math.random() * 6 + 2, // radius
            dx: Math.random() * 4 - 2, // x velocity
            dy: Math.random() * 4 + 1, // y velocity
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    function animate() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

        pieces.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();

            p.y += p.dy;
            p.x += p.dx;

            if (p.y > confettiCanvas.height) {
                p.y = 0;
                p.x = Math.random() * confettiCanvas.width;
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// Handle resize for confetti
window.addEventListener('resize', () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});

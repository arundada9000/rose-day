const messageElement = document.getElementById('message');
const proposalArea = document.getElementById('proposal-area');
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const confettiCanvas = document.getElementById('confetti');
const poeticIntro = document.getElementById('poetic-intro');

const choiceModal = document.getElementById('choice-modal');
const choiceBtns = document.querySelectorAll('.choice-btn');
const questionText = document.getElementById('question-text');

// SVG Groups
const roseGroup = document.getElementById('rose-group');
const tulipGroup = document.getElementById('tulip-group');
const sunflowerGroup = document.getElementById('sunflower-group');
const groups = {
    rose: roseGroup,
    tulip: tulipGroup,
    sunflower: sunflowerGroup
};

// --- Poetic Sequence ---
const lines = [
    "A rose speaks of love silently...",
    "In a language known only to the heart."
];

async function playIntro() {
    // Play lines (Total time ~6s)
    // Line 1: 0-3s
    poeticIntro.innerText = lines[0];
    poeticIntro.style.opacity = '1';
    await wait(2800);
    poeticIntro.style.opacity = '0';
    await wait(200); // Quick switch

    // Line 2: 3-6s
    poeticIntro.innerText = lines[1];
    poeticIntro.style.opacity = '1';
    await wait(2800);
    poeticIntro.style.opacity = '0';
    await wait(500);

    // Rose is now blooming (Started at 5.5s via CSS)

    // Show Main Title ("Happy Rose Day") at ~7s
    poeticIntro.style.display = 'none'; // Cleanup
    messageElement.classList.remove('hidden');
    messageElement.classList.add('visible');

    // Hold Title, then transition to Question
    setTimeout(() => {
        messageElement.style.opacity = '0'; // Fade out "Happy Rose Day"
        setTimeout(() => {
            messageElement.innerText = "I have a question...";
            messageElement.style.opacity = '1';

            setTimeout(() => {
                showProposal();
            }, 1500);
        }, 1000);
    }, 4000); // Show "Happy Rose Day" for 4s (total time ~11s when question appears)
}

function showProposal() {
    proposalArea.classList.remove('hidden');
    // Use the CSS Animation for a nice POP
    proposalArea.classList.add('pop-in');
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Start everything
playIntro();


// --- Interaction Logic ---

// 1. Handle "No" Click -> Show Options
noBtn.addEventListener('click', () => {
    // Don't run away, just show modal
    choiceModal.classList.remove('hidden');
    // Optional: Hide "No" button so they have to pick? 
    // Or keep it. Let's keep it but maybe Move it?
    // For "Gentle Choice", we don't need runaway logic anymore.
    noBtn.style.display = 'none'; // Replaced by the flower choices
});

// 2. Handle Flower Choice
choiceBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const flowerType = e.target.getAttribute('data-flower');

        // Switch Flower
        switchFlower(flowerType);

        // Update Text
        if (flowerType === 'rose') {
            questionText.innerText = "Rose it is! Will you be my Valentine now? 🌹";
        } else if (flowerType === 'tulip') {
            questionText.innerText = "A lovely Tulip for you! Will you be my Valentine? 🌷";
        } else {
            questionText.innerText = "A bright Sunflower! Will you be my Valentine? 🌻";
        }

        // Reset UI
        choiceModal.classList.add('hidden');
        noBtn.style.display = 'none'; // Removed "No" option after choice essentially
        // Or if you want to bring it back.. but usually here we just want Yes.
    });
});

function switchFlower(type) {
    // Hide all
    Object.values(groups).forEach(g => {
        g.style.display = 'none';
        g.classList.remove('flower-fade-in');
    });

    // Show selected
    const selected = groups[type];
    selected.style.display = 'block';

    // If it's not the rose (which has its own animation), add fade in
    if (type !== 'rose') {
        selected.classList.add('flower-fade-in');
    } else {
        // Re-trigger rose animation? It might be tricky with CSS keyframes running once.
        // Simple display block is enough for now.
    }
}


// --- Celebration ---
yesBtn.addEventListener('click', () => {
    // Change UI
    proposalArea.innerHTML = '<h2 style="font-size: 2rem; color: #d40028;">Yay! I love you! ❤️</h2>';
    messageElement.innerText = "Happy Valentine's Day!";
    messageElement.style.opacity = 1;

    // Start Confetti
    startConfetti();
});

// Confetti Code (Same as before)
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
            r: Math.random() * 6 + 2,
            dx: Math.random() * 4 - 2,
            dy: Math.random() * 4 + 1,
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

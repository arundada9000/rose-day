const messageElement = document.getElementById("message");
const proposalArea = document.getElementById("proposal-area");
const noBtn = document.getElementById("no-btn");
const yesBtn = document.getElementById("yes-btn");
const confettiCanvas = document.getElementById("confetti");
const poeticIntro = document.getElementById("poetic-intro");
const mainSvg = document.getElementById("main-svg");

const choiceModal = document.getElementById("choice-modal");
const choiceBtns = document.querySelectorAll(".choice-btn");
const questionText = document.getElementById("question-text");

// SVG Groups
const roseGroup = document.getElementById("rose-group");
const tulipGroup = document.getElementById("tulip-group");
const sunflowerGroup = document.getElementById("sunflower-group");
const groups = {
  rose: roseGroup,
  tulip: tulipGroup,
  sunflower: sunflowerGroup,
};

// --- Romantic Poetic Lines ---
const lines = [
  "A rose speaks of love silently...",
  "In a language known only to the heart. 💕",
];

// --- Helper Function ---
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// --- Main Intro Sequence ---
async function playIntro() {
  await wait(500); // Initial pause

  // Line 1
  poeticIntro.innerText = lines[0];
  poeticIntro.style.opacity = "1";
  await wait(2500);
  poeticIntro.style.opacity = "0";
  await wait(600);

  // Line 2
  poeticIntro.innerText = lines[1];
  poeticIntro.style.opacity = "1";
  await wait(2500);
  poeticIntro.style.opacity = "0";
  await wait(400);

  // Hide poetic text completely
  poeticIntro.style.display = "none";

  // Bloom the Rose
  roseGroup.classList.add("animate-bloom");
  await wait(1800); // Wait for bloom animation

  // Start floating animation
  mainSvg.classList.add("float-active");

  // Show "Happy Rose Day"
  messageElement.classList.remove("hidden");
  messageElement.classList.add("visible");
  await wait(2500);

  // Transition to question
  messageElement.style.opacity = "0";
  await wait(600);
  messageElement.innerText = "I have a question...";
  messageElement.style.opacity = "1";
  await wait(1800);

  // Show the proposal card
  showProposal();
}

function showProposal() {
  proposalArea.classList.remove("hidden");
  proposalArea.classList.add("pop-in");
}

// Start the magic!
playIntro();

// --- Interaction Logic ---

// Handle "No" Click -> Show flower options
noBtn.addEventListener("click", () => {
  choiceModal.classList.remove("hidden");
  noBtn.style.display = "none";
});

// Handle Flower Choice
choiceBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const flowerType = e.target.getAttribute("data-flower");

    // Switch Flower
    switchFlower(flowerType);

    // Update Text based on choice
    if (flowerType === "rose") {
      questionText.innerText = "Rose it is! Will you be my Valentine now? 🌹";
    } else if (flowerType === "tulip") {
      questionText.innerText = "A lovely Tulip for you! Be my Valentine? 🌷";
    } else {
      questionText.innerText = "A bright Sunflower! Be my Valentine? 🌻";
    }

    // Hide choice modal
    choiceModal.classList.add("hidden");
  });
});

function switchFlower(type) {
  // Hide all flowers
  Object.values(groups).forEach((g) => {
    g.style.display = "none";
    g.classList.remove("flower-fade-in");
    g.classList.remove("animate-bloom");
  });

  // Show selected flower
  const selected = groups[type];
  selected.style.display = "block";

  if (type !== "rose") {
    selected.classList.add("flower-fade-in");
  } else {
    // Re-trigger rose bloom
    selected.classList.add("animate-bloom");
  }
}

// --- Celebration ---
yesBtn.addEventListener("click", () => {
  // Beautiful celebration message
  proposalArea.innerHTML = `
        <div class="proposal-card">
            <h2 style="font-family: 'Dancing Script', cursive; font-size: 2rem; color: #d40028; margin-bottom: 10px;">
                Yay! I love you! ❤️
            </h2>
            <p style="font-size: 1.2rem; margin-bottom: 0;">You made me the happiest! 🥰</p>
        </div>
    `;
  messageElement.innerText = "Happy Rose Day! 💕";
  messageElement.style.opacity = 1;

  // Start Confetti
  startConfetti();
});

// --- Confetti Effect ---
function startConfetti() {
  const ctx = confettiCanvas.getContext("2d");
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  const pieces = [];
  const numberOfPieces = 120;
  const colors = [
    "#ff3366",
    "#ffccd5",
    "#ffffff",
    "#ff6b8a",
    "#ffd0d9",
    "#ff0040",
  ];

  for (let i = 0; i < numberOfPieces; i++) {
    pieces.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random() * 5 + 3,
      dx: Math.random() * 3 - 1.5,
      dy: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }

  function animate() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    pieces.forEach((p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.5);
      ctx.restore();

      p.y += p.dy;
      p.x += p.dx;
      p.rotation += 2;

      if (p.y > confettiCanvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * confettiCanvas.width;
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// Handle window resize for confetti
window.addEventListener("resize", () => {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});

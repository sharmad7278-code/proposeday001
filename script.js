/* =================================================
   SCREEN MANAGEMENT (SAFE & EXPLICIT)
================================================= */
const screens = document.querySelectorAll(".screen");
let currentScreenIndex = 0;

function goNext() {
  if (currentScreenIndex >= screens.length - 1) return;

  screens[currentScreenIndex].classList.remove("active");
  currentScreenIndex++;
  screens[currentScreenIndex].classList.add("active");

  if (screens[currentScreenIndex].id === "screen3") {
    startSlideshow();
  }
}


/* =================================================
   BACKGROUND MUSIC (MOBILE SAFE)
================================================= */
const music = document.getElementById("bgMusic");
document.addEventListener("click", () => {
  if (music && music.paused) {
    music.play().catch(() => {});
  }
});

/* =================================================
   TYPING EFFECT (SCREEN 1)
================================================= */
const typingText =
  "I’ve been wanting to ask you something… something really special 💭";
const typingEl = document.getElementById("typing");
let typingIndex = 0;

(function typeWriter() {
  if (!typingEl) return;

  if (typingIndex < typingText.length) {
    typingEl.innerHTML += typingText[typingIndex];
    typingIndex++;
    setTimeout(typeWriter, 55);
  }
})();

/* =================================================
   SLIDESHOW (SCREEN 3)
================================================= */
/* =================================================
   MEMORY SLIDESHOW (FIXED – NO DISAPPEAR BUG)
================================================= */

// Make sure these files ACTUALLY exist
const images = [
  "img1.jpeg",
  "img2.jpeg",
  "img3.jpeg"
];

// Preload images
const preloadedImages = [];
images.forEach(src => {
  const img = new Image();
  img.src = src;
  preloadedImages.push(img);
});

let slideIndex = 0;
let slideshowInterval = null;

function startSlideshow() {
  if (slideshowInterval) return; // prevent duplicates

  slideshowInterval = setInterval(() => {
    const slide = document.getElementById("slide");
    const memoryScreen = document.getElementById("screen3");

    // Only run when memory screen is visible
    if (!slide || !memoryScreen.classList.contains("active")) return;

    slideIndex = (slideIndex + 1) % images.length;

    slide.onerror = () => {
      slide.src = images[0]; // fallback if image missing
    };

    slide.src = images[slideIndex];
  }, 3000);
}

/* =================================================
   FLOATING HEARTS (GLOBAL, SAFE)
================================================= */
setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "💗";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 14 + Math.random() * 16 + "px";

  document.getElementById("floating-layer").appendChild(heart);

  setTimeout(() => heart.remove(), 7000);
}, 500);

/* =================================================
   PROPOSAL BUTTON LOGIC
================================================= */
const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const yesScreen = document.getElementById("yesScreen");
const nameEl = document.getElementById("herName");

let noHoverCount = 0;

/* No button moves ONLY on proposal screen */
function dodgeNo() {
  const proposalScreen = document.getElementById("proposal");

  // Only allow movement if proposal screen is active
  if (!proposalScreen.classList.contains("active")) return;

  noHoverCount++;

  noBtn.style.transform =
    `translate(${Math.random() * 80 - 40}px, ${Math.random() * 60 - 30}px)`;
}

/* Desktop + Mobile */
noBtn.addEventListener("mouseenter", dodgeNo);
noBtn.addEventListener("touchstart", dodgeNo);

/* =================================================
   YES CLICK — THE ONLY WAY TO SHOW YES SCREEN
================================================= */
yesBtn.addEventListener("click", () => {
  // Hide current screen explicitly
  screens[currentScreenIndex].classList.remove("active");

  // Show YES screen
  yesScreen.classList.add("active");

  // Lock index so nothing else advances
  currentScreenIndex = screens.length;

  launchConfetti();
  revealName();
});

/* =================================================
   CONFETTI (ONLY ON YES)
================================================= */
function launchConfetti() {
  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.innerHTML = ["💖", "✨", "💕", "💘"][Math.floor(Math.random() * 4)];
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDuration = 2 + Math.random() * 2 + "s";

    document.getElementById("floating-layer").appendChild(confetti);

    setTimeout(() => confetti.remove(), 5000);
  }
}

/* =================================================
   SOFT NAME REVEAL (ONLY ON YES)
================================================= */
function revealName() {
  if (!nameEl) return;

  requestAnimationFrame(() => {
    nameEl.style.opacity = "1";
    nameEl.style.transform = "translateY(0)";
  });
}

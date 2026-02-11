// ------------------------------
// ORIGINAL VALENTINE LOGIC (theme removed, always dark)
// ------------------------------
const p = new URLSearchParams(location.search);
const from = p.get("from") || "Someone";
const to = p.get("to") || "Someone";

document.getElementById("from").textContent = from;
document.getElementById("to").textContent = to;
document.getElementById("text").textContent =
    `Hey ${to} 💕 Will you be my Valentine?`;

const yes = document.getElementById("yes");
const no = document.getElementById("no");

// ⭐ Always force dark mode
document.body.classList.add("dark");

// ⭐ Normal NO GIFs
const noGifs = [
    "media/image3.gif",
    "media/image4.gif",
    "media/image5.gif",
    "media/image7.gif",
];

// ⭐ Desperation GIFs (after third-charm moment)
const desperateGifs = [
    "media/desperate1.gif",
    "media/desperate1.gif",
    "media/desperate1.gif"
];

// ⭐ Special GIF for “third time’s the charm”
const thirdCharmGif = "media/desperate1.gif";

let noClickCount = 0;
let yesRunCount = 0;
let scaleYes = 1;
let scaleNo = 1;

// ------------------------------
// ⭐ YES BUTTON RUNS AWAY (2 times max)
// ------------------------------
yes.addEventListener("mouseenter", () => {
    // If YES has run twice OR NO has been clicked 6+ times → stop moving
    if (yesRunCount >= 2 || noClickCount >= 6) return;

    const offsetX = (Math.random() * 200) - 100;
    const offsetY = (Math.random() * 200) - 100;

    yes.style.position = "relative";
    yes.style.left = offsetX + "px";
    yes.style.top = offsetY + "px";

    yesRunCount++;
});

// ------------------------------
// ⭐ NO BUTTON LOGIC
// ------------------------------
no.onclick = () => {
    navigator.vibrate?.([10, 30]);
    noClickCount++;

    const img = document.querySelector(".container img");

    // CASE A — YES hovered twice AND this is the first NO after that
    if (yesRunCount >= 2 && noClickCount === 1) {
        img.src = thirdCharmGif;
        document.getElementById("text").textContent =
            `Come on ${to}... third time’s the charm! Try YES again 💕`;
        return;
    }

    // CASE B — YES hovered twice AND user keeps clicking NO
    if (yesRunCount >= 2 && noClickCount > 1) {
        // YES gets bigger
        scaleYes += 0.25;
        yes.style.transform = `scale(${scaleYes})`;

        // NO gets smaller
        scaleNo -= 0.1;
        if (scaleNo < 0.4) scaleNo = 0.4;
        no.style.transform = `scale(${scaleNo})`;

        // Use desperation GIFs
        img.src = desperateGifs[(noClickCount - 2) % desperateGifs.length];

        return;
    }

    // CASE C — Normal NO behavior (YES hover < 2)
    scaleYes += 0.22;
    yes.style.transform = `scale(${scaleYes})`;

    img.src = noGifs[(noClickCount - 1) % noGifs.length];
};

// ------------------------------
// ⭐ YES BUTTON FINAL ACCEPT
// ------------------------------
yes.onclick = () => {
    navigator.vibrate?.([30, 40, 30]);
    document.querySelector(".container").innerHTML =
        `<h1>YAAAY 💖 I LOVE YOU ${to.toUpperCase()}!</h1>
    <img src="media/yes.gif" width="260">`;
};

// ------------------------------
// ⭐ STARFIELD BACKGROUND
// ------------------------------
const canvas = document.createElement("canvas");
canvas.id = "starfield";
document.body.prepend(canvas);

const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const STAR_COUNT = 500;
const COLOR_RANGE = [0, 60, 240];
let stars = [];

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
        x: rand(0, canvas.width),
        y: rand(0, canvas.height),
        radius: rand(0.2, 1.2),
        hue: COLOR_RANGE[Math.floor(rand(0, COLOR_RANGE.length))],
        sat: rand(50, 100),
        opacity: Math.random()
    });
}

function drawStars() {
    for (let s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, ${s.sat}%, 88%, ${s.opacity})`;
        ctx.fill();
    }
}

function updateStars() {
    for (let s of stars) {
        if (Math.random() > 0.99) {
            s.opacity = Math.random();
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();
    updateStars();
    requestAnimationFrame(animate);
}

animate();

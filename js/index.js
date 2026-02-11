const base = "https://valentine-invite-kappa.vercel.app/";

const yourName = document.getElementById("yourName");
const baeName = document.getElementById("baeName");
const linkField = document.getElementById("linkField");
const qrImg = document.getElementById("qrImg");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const creator = document.getElementById("creator");
const result = document.getElementById("result");
const names = document.getElementById("names");

const toggle = document.getElementById("themeToggle");

const saved = localStorage.getItem("theme") || "light";
document.body.classList.toggle("dark", saved === "dark");
toggle.textContent = saved === "dark" ? "☀️" : "🌙";

function updateQR(link) {
	const dark = document.body.classList.contains("dark");
	const fg = "ff5fa2";
	const bg = dark ? "000000" : "ffffff";
	qrImg.src =
		`https://api.qrserver.com/v1/create-qr-code/?size=240x240&color=${fg}&bgcolor=${bg}&data=` +
		encodeURIComponent(link);
}

toggle.onclick = () => {
	toggle.classList.add("spin");
	const isDark = document.body.classList.toggle("dark");
	localStorage.setItem("theme", isDark ? "dark" : "light");
	toggle.textContent = isDark ? "☀️" : "🌙";
	navigator.vibrate?.(20);
	if (linkField.value) updateQR(linkField.value);
	setTimeout(() => toggle.classList.remove("spin"), 500);
};

generateBtn.onclick = () => {
	if (!yourName.value || !baeName.value) return;

	const link = `${base}valentine.html?from=${encodeURIComponent(yourName.value)}&to=${encodeURIComponent(baeName.value)}`;

	linkField.value = link;
	navigator.clipboard.writeText(link);
	navigator.vibrate?.(30);

	names.textContent = `${yourName.value} 💕 ${baeName.value}`;
	updateQR(link);

	creator.classList.remove("active");
	setTimeout(() => {
		creator.style.display = "none";
		result.classList.add("active");
	}, 400);
};

copyBtn.onclick = () => {
	navigator.clipboard.writeText(linkField.value);
	navigator.vibrate?.(15);
};

const bg = document.querySelector(".bg-hearts");
setInterval(() => {
	const h = document.createElement("span");
	h.textContent = "💖";
	h.style.left = Math.random() * 100 + "vw";
	h.style.animationDuration = 6 + Math.random() * 6 + "s";
	bg.appendChild(h);
	setTimeout(() => h.remove(), 12000);
}, 450);

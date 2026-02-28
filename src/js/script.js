const CONFIG = {
  yourName: "Bruno",
  partnerName: "Maria",
  startDate: "2025-05-01",
  anniversaryMonth: 5,
  anniversaryDay: 1,

  images: [
    "https://i.postimg.cc/1tZtHGyP/IMG-20250625-075332-413-1.webp",
    "https://i.postimg.cc/bwDwfCJp/IMG-20250727-114129265-HDR-1.jpg",
    "https://i.postimg.cc/Wz1sWSCR/IMG-20250723-171230186-HDR.jpg",
    "https://i.postimg.cc/FFMxJ9hJ/paramaria-(1).jpg",
    "https://i.postimg.cc/Df9cb27p/paramaria-(10).jpg",
    "https://i.postimg.cc/tRKzVX9m/paramaria-(11).jpg",
    "https://i.postimg.cc/66khG9BP/paramaria-(12).jpg",
    "https://i.postimg.cc/4NpQ6r3P/paramaria-(13).jpg",
    "https://i.postimg.cc/kXWvQk5T/paramaria-(14).jpg",
    "https://i.postimg.cc/c4fBRVJ9/paramaria-(15).jpg",
    "https://i.postimg.cc/KvtDPdYs/paramaria-(16).jpg",
    "https://i.postimg.cc/VLXWq3NT/paramaria-(17).jpg",
    "https://i.postimg.cc/BZrC1qJj/paramaria-(2).jpg",
    "https://i.postimg.cc/RCkTnMvJ/paramaria-(3).jpg",
    "https://i.postimg.cc/05TCJ89w/paramaria-(4).jpg",
    "https://i.postimg.cc/L4cVZHmt/paramaria-(5).jpg",
    "https://i.postimg.cc/FFMxJ9hV/paramaria-(6).jpg",
    "https://i.postimg.cc/2jsxBzCF/paramaria-(7).jpg",
    "https://i.postimg.cc/RCkTnMvT/paramaria-(8).jpg",
    "https://i.postimg.cc/FFMxJ9hT/paramaria-(9).jpg",
  ],

  timeline: [
    { date: "01 Mai 2025", text: "Dia que nós entramos em propósito ✨" },
    { date: "01 Ago 2025", text: "Virou oficial: eu e você 💞" },
  ],

  letter: `Eu não sei se existem palavras capazes de traduzir tudo o que você significa para mim...

Quando olho para você, vejo tudo o que sempre sonhei.

Você é minha calmaria nos momentos difíceis e minha euforia nos dias de felicidade.

Quero dividir sonhos, superar desafios e celebrar conquistas ao seu lado.

Porque amar você é o maior privilégio que a vida já me deu ❤️`,

  spotifyEmbed: "https://open.spotify.com/embed/track/3cqeso9qMA6HoISorEoFfk",
};

// ========================
// UTIL
// ========================

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ========================
// HEADER
// ========================

function setupHeader() {
  $("#brand").textContent = `${CONFIG.yourName} & ${CONFIG.partnerName}`;
  $("#yourName").textContent = CONFIG.yourName;
  $("#since").textContent = CONFIG.startDate;
  document.title = `Para ${CONFIG.partnerName} 💖`;
}

// ========================
// GALERIA
// ========================

function setupGallery() {
  const slides = $("#slides");
  const dots = $("#dots");

  slides.innerHTML = "";
  dots.innerHTML = "";

  CONFIG.images.forEach((src, i) => {
    const img = new Image();
    img.src = src;
    img.loading = "lazy";
    if (i === 0) img.classList.add("active");
    slides.appendChild(img);

    const dot = document.createElement("button");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => go(i));
    dots.appendChild(dot);
  });

  let index = 0;
  const total = CONFIG.images.length;

  function go(n) {
    index = (n + total) % total;
    $$(".slides img").forEach((img, i) =>
      img.classList.toggle("active", i === index),
    );
    $$(".dot").forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

  setInterval(() => go(index + 1), 4000);
}

// ========================
// TIMELINE
// ========================

function setupTimeline() {
  const tl = $("#timeline");

  tl.innerHTML = CONFIG.timeline
    .map(
      (ev) => `
      <div class="tl-item">
        <div class="tl-dot"></div>
        <div>
          <div class="tl-meta">${ev.date}</div>
          <div class="tl-text">${ev.text}</div>
        </div>
      </div>
    `,
    )
    .join("");
}

// ========================
// CARTA
// ========================

function setupLetter() {
  const el = $("#letter");

  el.innerHTML = CONFIG.letter
    .split(/\n\n+/)
    .map((p) => `<p>${p}</p>`)
    .join("");
}

// ========================
// CONTADOR (desde o início)
// ========================

function setupCountup() {
  const startDate = new Date(CONFIG.startDate + "T00:00:00");
  const box = $("#countdown");

  function tick() {
    const now = new Date();
    const diff = now - startDate;

    const seconds = Math.floor(diff / 1000);

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    box.innerHTML = `
      <div class="pill"><b>${String(days).padStart(2, "0")}</b><small>dias</small></div>
      <div class="pill"><b>${String(hours).padStart(2, "0")}</b><small>horas</small></div>
      <div class="pill"><b>${String(mins).padStart(2, "0")}</b><small>min</small></div>
      <div class="pill"><b>${String(secs).padStart(2, "0")}</b><small>seg</small></div>
    `;
  }

  tick();
  setInterval(tick, 1000);
}

// ========================
// MÚSICA
// ========================

function setupMusic() {
  const box = $("#music");

  box.innerHTML = `
    <iframe 
      style="border:0; width:100%; height:352px"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      src="${CONFIG.spotifyEmbed}">
    </iframe>
  `;
}

// ========================
// CORAÇÕES FLUTUANDO
// ========================

function floatingHearts() {
  const container = $("#hearts");

  function createHeart() {
    const span = document.createElement("span");
    const hearts = ["❣️", "💞", "✨"];
    span.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    span.style.left = Math.random() * 100 + "vw";
    span.style.animationDuration = 8 + Math.random() * 6 + "s";
    span.style.fontSize = 14 + Math.random() * 20 + "px";
    container.appendChild(span);

    setTimeout(() => span.remove(), 15000);
  }

  setInterval(createHeart, 1200);
}

// ========================
// SURPRESA
// ========================

function surprise() {
  const btn = $("#surpriseBtn");

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    btn.textContent = "Eu te amo cada vez mais 💞";
    confetti();
  });
}

function confetti() {
  const duration = 1200;
  const end = performance.now() + duration;

  (function frame() {
    const piece = document.createElement("div");

    piece.style.position = "fixed";
    piece.style.top = "-10px";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.width = "8px";
    piece.style.height = "14px";
    piece.style.background = `hsl(${Math.random() * 360} 90% 70%)`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    piece.style.borderRadius = "2px";
    piece.style.zIndex = 9999;

    document.body.appendChild(piece);

    piece
      .animate(
        [
          { transform: piece.style.transform, opacity: 1 },
          {
            transform: `translate(${Math.random() * 40 - 20}vw, 90vh) rotate(${Math.random() * 720 - 360}deg)`,
            opacity: 0,
          },
        ],
        {
          duration: 1200,
          easing: "cubic-bezier(.2,.8,.2,1)",
        },
      )
      .addEventListener("finish", () => piece.remove());

    if (performance.now() < end) requestAnimationFrame(frame);
  })();
}

// ========================
// INICIAR
// ========================

setupHeader();
setupGallery();
setupTimeline();
setupLetter();
setupCountup();
setupMusic();
floatingHearts();
surprise();

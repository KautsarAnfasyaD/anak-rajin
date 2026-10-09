/* =========================================================
   main.js
   Logika utama: boot sequence, navigasi, dashboard, modal,
   toast (notifikasi), achievement, dan Secret Room.
   Teks diambil dari messages.js, easter egg dari easter-eggs.js.
   ========================================================= */

(function () {
  "use strict";

  // Cek apakah pengguna minta animasi dikurangi
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (id) => document.getElementById(id);
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, reduceMotion ? 0 : ms));

  /* =======================================================
     1. Bintang di background
     ======================================================= */
  function makeStars() {
    const sky = document.querySelector(".stars");
    const colors = ["#F3F6FC", "#9EC5FF", "#FFCFD9", "#FFCF8A"];
    for (let i = 0; i < 70; i++) {
      const star = document.createElement("span");
      const size = Math.random() < 0.85 ? 2 : 3;
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      star.style.width = star.style.height = size + "px";
      star.style.background = colors[i % colors.length];
      star.style.animationDelay = (Math.random() * 5).toFixed(2) + "s";
      sky.appendChild(star);
    }
  }

  /* =======================================================
     2. Toast (notifikasi kecil di pojok)
     ======================================================= */
  function toast(message, tone = "blue", tag = "SYSTEM", duration = 4500) {
    const box = $("toasts");
    // Batasi maksimal 3 toast supaya layar HP nggak penuh
    while (box.children.length >= 3) box.firstElementChild.remove();

    const el = document.createElement("div");
    el.className = "toast toast--" + tone;
    el.innerHTML = '<span class="toast__tag mono"></span><p></p>';
    el.querySelector(".toast__tag").textContent = tag;
    el.querySelector("p").textContent = message;
    box.appendChild(el);

    setTimeout(() => {
      el.classList.add("is-leaving");
      setTimeout(() => el.remove(), reduceMotion ? 0 : 300);
    }, duration);
  }

  /* =======================================================
     3. Modal (pakai elemen <dialog> bawaan browser,
        otomatis bisa ditutup dengan Escape & menjebak fokus)
     ======================================================= */
  const modal = $("modal");
  let lastFocus = null;

  function openModal(title, body, tag = "support.msg") {
    lastFocus = document.activeElement;
    $("modalTitle").textContent = title;
    $("modalBody").textContent = body;
    $("modalTag").textContent = tag;
    modal.showModal();
    modal.querySelector(".btn[data-close]").focus();
  }

  function closeModal() {
    if (modal.open) modal.close();
  }

  modal.addEventListener("close", () => {
    if (lastFocus) lastFocus.focus();
  });
  modal.querySelectorAll("[data-close]").forEach((btn) => btn.addEventListener("click", closeModal));
  // Klik area gelap di luar kotak = tutup
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  /* =======================================================
     4. Boot sequence
     ======================================================= */
  let bootSkipped = false;

  function addBootLine(line) {
    const p = document.createElement("p");
    p.className = "line line--" + line.type;
    p.textContent = line.text;
    $("bootLog").appendChild(p);
  }

  async function runBoot() {
    for (const line of MESSAGES.boot) {
      if (bootSkipped) return;
      addBootLine(line);
      // Peringatan dikasih jeda lebih lama biar dramatis
      await wait(line.type === "warn" ? 550 : line.type === "title" ? 700 : 320);
    }
    finishBoot();
  }

  function skipBoot() {
    if (bootSkipped) return;
    bootSkipped = true;
    $("bootLog").innerHTML = "";
    MESSAGES.boot.forEach(addBootLine);
    finishBoot();
  }

  function finishBoot() {
    $("skipBoot").hidden = true;
    $("bootActions").hidden = false;
    $("btnGas").focus();
  }

  function enterDashboard() {
    const boot = $("boot");
    boot.classList.add("is-leaving");
    setTimeout(() => {
      boot.hidden = true;
      $("app").hidden = false;
      $("app").classList.add("is-entering");
      animateDashboard();
      window.scrollTo(0, 0);
      $("main").focus({ preventScroll: true });
    }, reduceMotion ? 0 : 450);
  }

  /* =======================================================
     5. Dashboard: kartu status & daftar tugas
     ======================================================= */
  function renderDashboard() {
    $("statusGrid").innerHTML = MESSAGES.statusCards
      .map(
        (c, i) => `
        <article class="card status reveal" style="--i:${i}">
          <p class="status__title">${c.title}</p>
          <span class="badge badge--${c.tone}">${c.status}</span>
          <p class="muted small">${c.desc}</p>
        </article>`
      )
      .join("");

    $("taskList").innerHTML = MESSAGES.tasks
      .map(
        (t, i) => `
        <li class="task reveal" style="--i:${i + 4}">
          <div>
            <p class="mono task__name">${t.name}</p>
            <p class="muted small">${t.note}</p>
          </div>
          <span class="badge badge--${t.status.toLowerCase()}">${t.status}</span>
        </li>`
      )
      .join("");

    $("taskCount").textContent = MESSAGES.tasks.length + " proses aktif";
  }

  function animateDashboard() {
    // Kelas .shown memicu animasi muncul bertahap (lihat CSS .reveal)
    requestAnimationFrame(() => {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("shown"));
      setMeter(0);
    });
  }

  /* STRONG Meter */
  let meterIndex = 0;
  function setMeter(index) {
    const level = MESSAGES.strongLevels[index];
    $("meterFill").style.width = level.value + "%";
    $("meterFill").classList.toggle("is-high", level.value > 80);
    $("meterText").textContent = level.text;
    document.querySelector(".meter").setAttribute("aria-valuenow", level.value);
  }
  function lowerStrong() {
    meterIndex = (meterIndex + 1) % MESSAGES.strongLevels.length;
    setMeter(meterIndex);
  }

  /* =======================================================
     6. Emergency Support
     ======================================================= */
  function renderSupport() {
    const grid = $("supportGrid");
    MESSAGES.support.forEach((s, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "sos";
      btn.innerHTML = `<span class="mono sos__code">${s.code}</span><span class="sos__label">${s.label}</span>`;
      btn.addEventListener("click", () => openModal(s.title, s.body, s.code.toLowerCase() + ".msg"));
      grid.appendChild(btn);
    });
  }

  /* =======================================================
     7. Achievement Center
     ======================================================= */
  function renderAchievements() {
    const grid = $("achGrid");
    MESSAGES.achievements.forEach((a) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ach";
      btn.setAttribute("aria-pressed", "false");
      btn.innerHTML = `
        <span class="ach__icon"><img src="${a.icon}" alt="" width="56" height="56"></span>
        <span class="ach__text">
          <span class="ach__state mono">LOCKED · tekan untuk membuka</span>
          <span class="ach__title">${a.title}</span>
          <span class="ach__desc">${a.desc}</span>
        </span>`;
      btn.addEventListener("click", () => {
        if (btn.classList.contains("is-unlocked")) {
          toast("Achievement ini sudah kebuka. Sistem nggak bisa mengunci ulang kenangan.", "blue", "ACHIEVEMENT");
          return;
        }
        btn.classList.add("is-unlocked");
        btn.setAttribute("aria-pressed", "true");
        btn.querySelector(".ach__state").textContent = "UNLOCKED";
        toast("Achievement unlocked: " + a.title, "warn", "ACHIEVEMENT");
      });
      grid.appendChild(btn);
    });
  }

  /* =======================================================
     8. Navigasi antar panel
     ======================================================= */
  function showPanel(id) {
    document.querySelectorAll(".panel").forEach((p) => {
      const active = p.id === id;
      p.hidden = !active;
      p.classList.toggle("is-active", active);
    });
    document.querySelectorAll(".nav__btn").forEach((b) => {
      const active = b.dataset.target === id;
      b.classList.toggle("is-active", active);
      if (active) b.setAttribute("aria-current", "page");
      else b.removeAttribute("aria-current");
    });
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  /* =======================================================
     9. Secret Room
     ======================================================= */
  async function openSecret() {
    $("app").hidden = true;
    const room = $("secret");
    room.hidden = false;
    room.classList.add("is-entering");
    $("secretTitle").focus();

    const box = $("secretMessage");
    box.innerHTML = "";
    for (let i = 0; i < MESSAGES.secret.length; i++) {
      const p = document.createElement("p");
      p.textContent = MESSAGES.secret[i];
      if (i === MESSAGES.secret.length - 1) p.className = "sign";
      box.appendChild(p);
      await wait(60);
      p.classList.add("shown");
      await wait(900);
    }
  }

  function leaveSecret() {
    $("secret").hidden = true;
    $("app").hidden = false;
    showPanel("panel-dashboard");
    $("planet").focus();
  }

  /* =======================================================
     10. Pasang semua event
     ======================================================= */
  function bindEvents() {
    $("skipBoot").addEventListener("click", skipBoot);
    $("btnGas").addEventListener("click", enterDashboard);
    $("btnRebahan").addEventListener("click", () =>
      openModal(MESSAGES.rebahan.title, MESSAGES.rebahan.body, "rebahan.mode")
    );
    $("btnCalm").addEventListener("click", lowerStrong);
    $("btnLeaveSecret").addEventListener("click", leaveSecret);

    document.querySelectorAll(".nav__btn").forEach((btn) =>
      btn.addEventListener("click", () => showPanel(btn.dataset.target))
    );

    // Setiap klik tombol dihitung untuk easter egg pesan tersembunyi
    document.addEventListener("click", (e) => {
      if (e.target.closest("button")) EasterEggs.track();
    });
  }

  /* =======================================================
     Start!
     ======================================================= */
  makeStars();
  renderDashboard();
  renderSupport();
  renderAchievements();
  bindEvents();
  EasterEggs.init({ toast, openSecret });
  runBoot();
})();

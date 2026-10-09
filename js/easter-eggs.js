/* =========================================================
   easter-eggs.js
   Semua logika rahasia ada di sini:
   1. Logo diklik 5x            -> pesan rahasia
   2. Tombol REQUEST COFFEE      -> notifikasi 2 tahap
   3. Setelah beberapa interaksi -> pesan tersembunyi
   4. Planet disapa 3x           -> membuka Secret Room
   main.js memanggil EasterEggs.init(ui) dan memberikan
   fungsi-fungsi tampilan (toast, buka secret room).
   ========================================================= */

const EasterEggs = (function () {
  const LOGO_CLICKS_NEEDED = 5;
  const LOGO_RESET_MS = 2500;        // jeda maksimal antar klik logo
  const PLANET_CLICKS_NEEDED = 3;
  const INTERACTIONS_NEEDED = 8;     // jumlah interaksi sebelum pesan tersembunyi

  let ui = null;
  let logoCount = 0;
  let logoTimer = null;
  let planetCount = 0;
  let interactions = 0;
  let hiddenShown = false;
  let coffeeBusy = false;

  function init(uiHelpers) {
    ui = uiHelpers;

    const logo = document.getElementById("logo");
    const coffee = document.getElementById("btnCoffee");
    const planet = document.getElementById("planet");

    logo.addEventListener("click", onLogoClick);
    coffee.addEventListener("click", onCoffeeClick);
    planet.addEventListener("click", onPlanetClick);
  }

  /* ---------- 1. Logo rahasia ---------- */
  function onLogoClick() {
    logoCount++;
    clearTimeout(logoTimer);
    logoTimer = setTimeout(() => { logoCount = 0; }, LOGO_RESET_MS);

    const logo = document.getElementById("logo");
    logo.classList.remove("wiggle");
    void logo.offsetWidth; // restart animasi
    logo.classList.add("wiggle");

    if (logoCount >= LOGO_CLICKS_NEEDED) {
      logoCount = 0;
      ui.toast(MESSAGES.easterEggs.logo, "pink", "EASTER_EGG.FOUND");
    }
  }

  /* ---------- 2. Request coffee ---------- */
  function onCoffeeClick() {
    if (coffeeBusy) return; // cegah spam klik selama proses
    coffeeBusy = true;
    const btn = document.getElementById("btnCoffee");
    btn.disabled = true;
    btn.textContent = "MEMPROSES...";

    ui.toast(MESSAGES.easterEggs.coffeeStep1, "blue", "PANTRY.REQUEST");

    setTimeout(() => {
      ui.toast(MESSAGES.easterEggs.coffeeStep2, "warn", "PANTRY.DENIED");
      btn.disabled = false;
      btn.textContent = "REQUEST COFFEE";
      coffeeBusy = false;
    }, 2400);
  }

  /* ---------- 3. Planet -> Secret Room ---------- */
  function onPlanetClick() {
    planetCount++;
    const planet = document.getElementById("planet");
    planet.classList.remove("bounce");
    void planet.offsetWidth;
    planet.classList.add("bounce");

    if (planetCount >= PLANET_CLICKS_NEEDED) {
      planetCount = 0;
      ui.openSecret();
    } else {
      ui.toast(MESSAGES.easterEggs.planetHints[planetCount - 1], "blue", "PLANET.EXE");
    }
  }

  /* ---------- 4. Pesan setelah beberapa interaksi ---------- */
  // Dipanggil dari main.js setiap kali pengguna menekan tombol apa pun.
  function track() {
    interactions++;
    if (!hiddenShown && interactions >= INTERACTIONS_NEEDED) {
      hiddenShown = true;
      setTimeout(() => {
        ui.toast(MESSAGES.easterEggs.hidden, "pink", "SYSTEM.WHISPER", 7000);
      }, 900);
    }
  }

  return { init, track };
})();

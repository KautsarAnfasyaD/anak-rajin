/* =========================================================
   messages.js
   Semua teks website dikumpulkan di sini supaya gampang diubah.
   Mau ganti kata-kata? Cukup edit file ini, nggak perlu
   menyentuh main.js.
   ========================================================= */

const MESSAGES = {
  // Baris-baris boot sequence. type: "normal" | "ok" | "warn" | "title"
  boot: [
    { text: "KAUTSAR INDUSTRIES™ PRESENTS", type: "title" },
    { text: "Initializing Anak Rajin.exe...", type: "normal" },
    { text: "Loading kesabaran.dll ........ OK", type: "ok" },
    { text: "User detected: Sani Safitri", type: "normal" },
    { text: "Scanning daily responsibilities...", type: "normal" },
    { text: "  Laprak.exe ........... RUNNING", type: "ok" },
    { text: "  Moderator.exe ........ RUNNING", type: "ok" },
    { text: "  Aslab.exe ............ RUNNING", type: "ok" },
    { text: "  Medanspor.exe ........ RUNNING", type: "ok" },
    { text: "  UnknownTask.exe ...... DETECTED", type: "warn" },
    { text: "WARNING: HUMAN RESOURCE OVERLOAD", type: "warn" },
    { text: "STRONG STATUS: STRESS TAK TERTOLONG", type: "warn" },
    { text: "Pilih mode operasi kamu:", type: "normal" }
  ],

  rebahan: {
    title: "AKHIRNYA ADA KEPUTUSAN YANG BENAR.",
    body: "Silakan istirahat tanpa rasa bersalah. Disclaimer: tombol ini tidak dapat menghapus deadline kamu."
  },

  statusCards: [
    {
      title: "Academic Load",
      status: "OVERLOAD",
      tone: "warn",
      desc: "Terlalu banyak tab terbuka, baik di browser maupun di kepala."
    },
    {
      title: "Human Battery",
      status: "NEEDS CHECK",
      tone: "pink",
      desc: "Energi manusia tidak bisa diisi ulang hanya dengan berkata ‘bentar lagi selesai’."
    },
    {
      title: "Coffee Protocol",
      status: "OPTIONAL",
      tone: "blue",
      desc: "Kafein bukan solusi universal. Minum air putih juga termasuk teknologi."
    },
    {
      title: "Moral Support",
      status: "AVAILABLE",
      tone: "ok",
      desc: "Sistem penyemangat tidak resmi siap digunakan."
    }
  ],

  // Status: RUNNING | PENDING | SURVIVING
  tasks: [
    { name: "Laprak.exe", note: "Halaman demi halaman, pelan tapi pasti.", status: "RUNNING" },
    { name: "Moderator.exe", note: "Menjaga acara tetap jalan, walau kepala mulai panas.", status: "RUNNING" },
    { name: "Aslab.exe", note: "Membimbing praktikan yang lupa bawa modul.", status: "SURVIVING" },
    { name: "Medanspor.exe", note: "Proses berat, butuh RAM tambahan.", status: "SURVIVING" },
    { name: "Tidur.exe", note: "Dijadwalkan ulang untuk ke-sekian kalinya.", status: "PENDING" },
    { name: "UnknownTask.exe", note: "Belum tahu apa, tapi pasti datang mendadak.", status: "PENDING" }
  ],

  // Teks STRONG Meter, dipakai bergantian saat tombol ditekan
  strongLevels: [
    { value: 87, text: "Level saat ini: 87% STRONG. Rekomendasi sistem: minum air dulu." },
    { value: 64, text: "Turun ke 64%. Air putih terbukti efektif, kata riset yang nggak pernah ada." },
    { value: 41, text: "41%. Bahu mulai turun dari telinga. Pertahankan." },
    { value: 18, text: "18%. Kamu sekarang resmi berstatus: tenang (sementara)." },
    { value: 99, text: "99%?! Oh, ternyata ada notifikasi grup baru. Ulangi proses dari awal." }
  ],

  support: [
    {
      label: "LAPRAK MAU MAKAN AKU",
      code: "ERR_LAPRAK_HUNGRY",
      title: "Laprak terdeteksi agresif",
      body: "Tarik napas, San. Satu halaman dulu, satu bagian dulu. Kamu nggak perlu mengalahkan seluruh laprak dalam satu tarikan napas. Kalau capek, istirahat sebentar. Deadline memang menyebalkan, tapi kamu manusia, bukan printer tugas."
    },
    {
      label: "OTAK AKU NGE-LAG",
      code: "ERR_BRAIN_LAG",
      title: "Ping otak: 9999 ms",
      body: "Error 404: ketenangan tidak ditemukan. Coba tutup tab yang nggak penting, minum dulu, lalu mulai dari satu hal yang paling mungkin diselesaikan. Pelan-pelan juga tetap maju."
    },
    {
      label: "HARI INI BERAT BANGET",
      code: "LOAD_HEAVY",
      title: "Pesan dari sistem",
      body: "Hei, San. Kamu nggak harus selalu menjadi orang yang bisa menangani semuanya. Kalau hari ini kamu cuma bisa menyelesaikan sedikit, bukan berarti usahamu sia-sia. Semoga besok terasa lebih ringan, ya."
    },
    {
      label: "AKU BUTUH KETAWA",
      code: "REQ_LAUGH",
      title: "Selamat, kamu menang!",
      body: "Selamat! Kamu telah memenangkan satu unit penyemangat digital yang dikembangkan oleh anak TMJ yang seharusnya sedang mengerjakan tugasnya sendiri. Garansi tidak berlaku jika developer ikut stres."
    }
  ],

  achievements: [
    {
      id: "multitask",
      title: "CERTIFIED MULTITASKER",
      icon: "assets/icons/multitask.svg",
      desc: "Berhasil membuka terlalu banyak tanggung jawab dalam satu kehidupan."
    },
    {
      id: "deadline",
      title: "DEADLINE SURVIVOR",
      icon: "assets/icons/hourglass.svg",
      desc: "Masih bertahan meskipun deadline terus berdatangan."
    },
    {
      id: "human",
      title: "HUMAN, NOT MACHINE",
      icon: "assets/icons/moon.svg",
      desc: "Pengingat bahwa istirahat bukan tanda kegagalan."
    },
    {
      id: "strong",
      title: "STRONG (VERSI ASLI)",
      icon: "assets/icons/bolt.svg",
      desc: "Bukan Stress Tak Tertolong. Kali ini artinya kuat beneran."
    }
  ],

  easterEggs: {
    logo: "Lah, kok kamu nemu? Developer aja hampir lupa naruh ini.",
    coffeeStep1: "Request diterima. Sistem sedang mengecek saldo developer...",
    coffeeStep2: "Request ditunda karena keterbatasan anggaran.",
    hidden: "Ada satu fitur yang sengaja dibuat bukan untuk meningkatkan produktivitas kamu, tapi sekadar buat bikin kamu senyum.",
    planetHints: [
      "Planet: “...halo?”",
      "Planet: “Satu kali lagi, aku lagi buka pintunya.”"
    ]
  },

  secret: [
    "San, aku tahu kamu punya banyak kesibukan dan sering harus membagi waktu buat banyak hal. Aku cuma mau kamu tahu kalau kamu nggak harus melakukan semuanya dengan sempurna.",
    "Aku senang bisa kenal kamu dan ngobrol sama kamu. Semoga di tengah semua kesibukan kamu, masih ada waktu buat hal-hal yang bikin kamu senang juga.",
    "Kalau lagi capek, jangan lupa kasih waktu buat diri sendiri, ya. Kamu juga pantas dapat istirahat dan hal-hal baik.",
    "— Kautsar, developer sekaligus penyemangat tidak resmi"
  ]
};

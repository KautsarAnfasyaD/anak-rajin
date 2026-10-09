# Anak Rajin.exe

**Personal Survival Operating System** buatan Kautsar untuk San (Sani Safitri).

Website kecil bergaya sistem operasi retro bertema luar angkasa. Isinya boot sequence, dashboard status kesibukan, Emergency Support Center, Achievement Center, beberapa easter egg, dan satu ruangan rahasia. Semua dibuat dengan HTML, CSS, dan JavaScript biasa, tanpa framework, tanpa backend, tanpa pelacakan apa pun.

> Catatan resmi sistem: STRONG = Stress Tak Tertolong.

---

## Struktur Direktori

```
anak-rajin/
├── index.html            # Struktur halaman (boot, dashboard, modal, secret room)
├── css/
│   └── style.css         # Semua desain, warna, animasi, dan tampilan responsif
├── js/
│   ├── messages.js       # SEMUA teks website ada di sini
│   ├── easter-eggs.js    # Logika logo rahasia, request coffee, pesan tersembunyi, pintu Secret Room
│   └── main.js           # Boot sequence, navigasi, modal, toast, dashboard, achievement
├── assets/
│   ├── icons/            # Ikon pixel art (SVG): logo, achievement, kopi
│   └── images/           # Gambar planet pixel art (SVG)
└── README.md
```

Urutan pemanggilan script di `index.html` penting: `messages.js` → `easter-eggs.js` → `main.js`.

## Cara Menjalankan Secara Lokal

Cara paling gampang: buka `index.html` langsung dengan double-click. Semua fitur jalan tanpa server.

Kalau mau lebih mirip kondisi online, jalankan server lokal dari dalam folder `anak-rajin`:

```bash
# Pakai Python
python -m http.server 8000
# lalu buka http://localhost:8000
```

Atau pakai ekstensi **Live Server** di VS Code (klik kanan `index.html` → *Open with Live Server*).

## Fungsi Setiap File JavaScript

| File | Isi |
|---|---|
| `messages.js` | Objek `MESSAGES` berisi semua teks: baris boot, kartu status, daftar tugas, pesan support, achievement, easter egg, dan pesan Secret Room. |
| `easter-eggs.js` | Modul `EasterEggs` dengan fungsi `init()` dan `track()`. Menghitung klik logo (5x), klik planet (3x), jumlah interaksi (8x), dan menjalankan notifikasi dua tahap tombol REQUEST COFFEE. |
| `main.js` | Menjalankan boot sequence, membuat kartu dan tombol dari data `MESSAGES`, mengatur navigasi panel, modal (pakai elemen `<dialog>`), toast notifikasi, STRONG Meter, achievement, dan Secret Room. |

## Cara Mengubah Pesan dan Konten

Semua teks ada di `js/messages.js`. Contoh mengganti pesan tombol support:

```js
support: [
  {
    label: "LAPRAK MAU MAKAN AKU",   // tulisan di tombol
    code: "ERR_LAPRAK_HUNGRY",       // kode kecil di atas tombol
    title: "Laprak terdeteksi agresif", // judul modal
    body: "Tarik napas, San. ..."    // isi pesan
  },
  ...
]
```

- Mau tambah tugas di *Currently Running Tasks*? Tambah objek baru di `tasks` dengan status `RUNNING`, `PENDING`, atau `SURVIVING`.
- Mau tambah achievement? Tambah objek di `achievements` dan taruh ikonnya di `assets/icons/`.
- Mau mengubah jumlah klik easter egg? Ubah konstanta di bagian atas `js/easter-eggs.js` (`LOGO_CLICKS_NEEDED`, `PLANET_CLICKS_NEEDED`, `INTERACTIONS_NEEDED`).

## Cara Mengganti Nama, Warna, atau Desain

- **Nama**: cari "Sani" dan "San" di `messages.js` dan `index.html`.
- **Warna**: ubah variabel di bagian atas `css/style.css`:

```css
:root {
  --bg: #0B1220;
  --panel: #19283F;
  --blue: #9EC5FF;
  --pink: #FFCFD9;
  --yellow: #FFCF8A;
  --text: #F3F6FC;
  --text-2: #B6C8E8;
}
```

- **Font**: ganti link Google Fonts di `<head>` `index.html`, lalu ubah `--font` dan `--mono` di CSS.
- **Ikon**: file SVG di `assets/icons/` bisa diganti dengan ikon lain berukuran persegi.

## Publikasi dengan GitHub Pages

1. Buat repository baru di GitHub, misalnya `anak-rajin`.
2. Upload semua isi folder `anak-rajin` (pastikan `index.html` ada di root repository, bukan di dalam subfolder).
   - Lewat web: **Add file → Upload files**, seret semua file dan folder, lalu **Commit changes**.
   - Lewat terminal:
     ```bash
     git init
     git add .
     git commit -m "Anak Rajin.exe v1.0"
     git branch -M main
     git remote add origin https://github.com/USERNAME/anak-rajin.git
     git push -u origin main
     ```
3. Buka **Settings → Pages** di repository.
4. Di bagian **Build and deployment**, pilih *Deploy from a branch*, branch `main`, folder `/ (root)`, lalu **Save**.
5. Tunggu 1–2 menit. Website akan muncul di `https://USERNAME.github.io/anak-rajin/`.

## Checklist Pengujian Manual

Cek semua ini sebelum link dikirim ke San (sebaiknya di HP dan laptop):

**Boot sequence**
- [ ] Teks boot muncul bertahap saat halaman dibuka.
- [ ] Tombol SKIP langsung menampilkan semua baris.
- [ ] Tombol REBAHAN membuka pesan istirahat, lalu bisa ditutup.
- [ ] Tombol GAS LAH membuka dashboard dengan transisi halus.

**Dashboard**
- [ ] Empat kartu status dan daftar tugas muncul bertahap.
- [ ] Tombol TURUNKAN STRONG mengubah isi dan teks STRONG Meter.
- [ ] Navigasi Dashboard / Support / Achievement berpindah panel dengan benar.

**Emergency Support**
- [ ] Keempat tombol membuka modal dengan pesan yang berbeda.
- [ ] Modal bisa ditutup dengan tombol ×, tombol OKE NOTED, tombol Escape, dan klik area gelap.
- [ ] Setelah modal ditutup, fokus kembali ke tombol yang tadi ditekan.

**Achievement**
- [ ] Menekan lencana membuka achievement (ikon berwarna, deskripsi jelas) dan muncul notifikasi.
- [ ] Menekan lagi lencana yang sudah terbuka memunculkan pesan lucu, bukan error.

**Easter egg**
- [ ] Klik logo 5x cepat → muncul "Lah, kok kamu nemu?..."
- [ ] REQUEST COFFEE → dua notifikasi berurutan, tombol nggak bisa di-spam selama proses.
- [ ] Setelah sekitar 8 kali menekan tombol → muncul pesan tersembunyi (cuma sekali).
- [ ] Klik planet 3x → masuk Secret Room, pesan muncul pelan-pelan.
- [ ] Tombol BALIK KE DASHBOARD berfungsi.

**Aksesibilitas & tampilan**
- [ ] Semua tombol bisa dicapai dengan Tab dan punya garis fokus kuning.
- [ ] Tampilan rapi di layar HP (sekitar 360 px) dan desktop.
- [ ] Dengan "reduce motion" aktif di pengaturan perangkat, semua konten tetap muncul.
- [ ] Console browser (F12) nggak menampilkan error.

---

Dibuat oleh Kautsar Industries™. Garansi tidak berlaku jika developer ikut stres.

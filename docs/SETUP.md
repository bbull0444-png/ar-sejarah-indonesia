📘 SETUP.md

Panduan instalasi dan cara menjalankan project AR Sejarah Indonesia secara lokal maupun melalui deployment.

✅ 1. Persyaratan Sistem
Browser yang Didukung

Google Chrome (disarankan)

Safari Mobile / iOS

Koneksi Internet

Wajib internet, karena:

AR.js membutuhkan secure context via HTTPS

Aset Virtual Tour (foto 360°) di-load dari folder besar dan memerlukan bandwidth

Platform Deployment

Project ini dikembangkan untuk HTTPS

Deployment direkomendasikan menggunakan:

Vercel (yang saat ini digunakan)

Netlify / GitHub Pages juga kompatibel

✅ 2. Cara Menjalankan Secara Lokal (Local Setup)

Walaupun project utamanya berjalan di Vercel, Anda tetap bisa menjalankan lokal untuk testing dan pengembangan.

Opsi 1 — Live Server (VSCode) — Disarankan

Install extension Live Server

Klik kanan pada file index.html

Pilih Open with Live Server

Browser akan terbuka dengan alamat:

http://127.0.0.1:5500


Catatan: AR.js bisa berjalan di HTTP untuk localhost saja.

Opsi 2 — Python Local Server

Jika tidak memakai VSCode:

python -m http.server 8000


Kemudian buka di browser:

http://localhost:8000

Opsi 3 — Jalankan via Vercel (Deployment)

Jika ingin build baru atau update:

vercel deploy


Setelah itu, project akan otomatis di-hosting pada domain HTTPS aman — cocok untuk AR.

✅ 3. Struktur Folder (Ringkas)
ar-sejarah-indonesia/
│
├── index.html
├── ar-viewer.html
├── virtual-tour.html
│
├── assets/
│   ├── images/
│   ├── markers/
│   └── virtual-tours/
│
├── src/
│   ├── js/
│   └── css/
│
└── docs/
    ├── SETUP.md
    ├── USAGE.md
    ├── MARKERS.md
    └── screenshots/

✅ 4. Troubleshooting
❗ Kamera tidak muncul

Pastikan browser sudah mengizinkan akses kamera.

Safari iOS kadang perlu refresh 1–2 kali.

Pastikan diakses via HTTPS (Vercel sudah otomatis).

❗ Marker tidak terbaca

Pastikan marker dicetak tidak blur atau terlalu kecil.

Cahaya harus cukup.

Jarak ideal: 15–30 cm dari kamera.

❗ Virtual Tour tidak tampil

Koneksi internet lemah dapat membuat foto 360° gagal load.

Reload halaman biasanya memperbaiki.

❗ AR.js tidak berjalan sama sekali

Pastikan tidak menggunakan browser bawaan HP (misal: Mi Browser, Vivo Browser).

Gunakan Chrome atau Safari.

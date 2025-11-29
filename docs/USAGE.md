📘 USAGE.md

Panduan penggunaan aplikasi AR Sejarah Indonesia, mencakup cara menjalankan AR Viewer, Virtual Tour 360°, dan interaksi dengan objek sejarah.

🎯 1. Cara Menggunakan AR Viewer

Halaman AR utama ada di:

ar-viewer.html

📥 Langkah-langkah
1. Download Marker

Download file berisi semua marker barcode:

assets/markers/all-markers.pdf


Cetak atau tampilkan di layar lain.

2. Buka AR Viewer

Masuk ke halaman:

ar-viewer.html


Biasanya dari tombol di index.html:

🚀 Mulai AR Experience

3. Izinkan Akses Kamera

Saat pertama kali dibuka, browser akan meminta izin kamera.
Pilih Allow / Izinkan.

Tanpa izin kamera, AR tidak akan berjalan.

4. Scan Marker (0–9)

Arahkan kamera ke salah satu barcode.
Setiap barcode akan memunculkan objek yang berbeda.

Contoh:

0 → Prasasti Ciaruteun

1 → Kapak Genggam

2 → Kapak Lonjong

dst…

5. Lihat Informasi Objek

Ketika marker terdeteksi:

Objek sejarah muncul di layar

Keterangan muncul dalam modal / panel info (tergantung implementasi lo)

Kamu bisa membaca detail sejarahnya

🕹️ 2. Cara Menggunakan Virtual Tour 360°

Halaman Virtual Tour:

virtual-tour.html

🌐 Langkah-langkah:
1. Pilih Lokasi Candi

Biasanya tersedia:

Borobudur

Prambanan

Scene 360° dipilih dari menu atau hotspot.

2. Navigasi di Dalam Panorama

Fitur interaktif:

Drag layar → melihat sekeliling

Klik hotspot → pindah scene

Zoom in/out (scroll / pinch)

3. Mode VR (Opsional)

Jika browser mendukung:

Klik ikon VR

Masukkan HP ke Cardboard (jika ada)

🧭 3. Navigasi Menu Utama

Di index.html, terdapat 3 bagian utama:

1. AR Experience

Menu untuk membuka pemindaian AR.

2. Daftar Objek

Menampilkan daftar objek sejarah:

Nama objek

Barcode yang diperlukan

3. Virtual Tour

Masuk ke halaman panorama 360°.

💡 Tips Penggunaan
• Gunakan cahaya yang cukup

Marker sulit terbaca di kondisi gelap.

• Jangan terlalu dekat dengan kamera

Jarak ideal: 15–30 cm.

• Pastikan marker tidak terlipat / blur

Marker buram atau kecil sering gagal terdeteksi.

• Gunakan browser yang didukung

Chrome (Android), Safari (iOS).

❗ Troubleshooting Singkat
Masalah	Penyebab	Solusi
Kamera tidak hidup	Izin kamera ditolak	Refresh dan izinkan kamera
Objek tidak muncul	Marker tidak terdeteksi	Naikkan cahaya, jaga jarak
Virtual tour tidak load	Koneksi lambat	Reload, cek internet
AR tidak bekerja	Browser tidak kompatibel	Pakai Chrome/Safari

📘 MARKERS.md

Dokumentasi lengkap mengenai sistem marker pada aplikasi AR Sejarah Indonesia.

Setiap marker direpresentasikan sebagai barcode bergaya AR.js (pattern marker) yang digunakan untuk memunculkan objek sejarah di AR Viewer.

🎯 1. Apa Itu Marker?

Marker adalah barcode hitam-putih yang dipindai oleh kamera pada halaman:

ar-viewer.html


Setiap marker memiliki ID unik (0–9) yang terhubung ke satu objek sejarah.

Semua marker tersedia dalam satu file PDF:

assets/markers/all-markers.pdf

🗂️ 2. Daftar Marker & Objek

Berikut daftar lengkap marker serta objek yang ditampilkan:

ID Marker	Nama Objek	Kategori	File Gambar
0	Prasasti Ciaruteun	Prasasti	assets/images/artifacts/prasasti-ciaruteun.png
1	Kapak Genggam	Artefak	assets/images/artifacts/kapak-genggam.png
2	Kapak Lonjong	Artefak	assets/images/artifacts/kapak-lonjong.png
3	Homo Erectus	Fosil	assets/images/fossils/homo-erectus.png
4	Meganthropus	Fosil	assets/images/fossils/meganthropus.png
5	Dolmen	Struktur Megalitik	assets/images/structures/dolmen.png
6	Kjokkenmoddinger	Struktur	assets/images/structures/kjokkenmoddinger.png
7	Menhir	Struktur	assets/images/structures/menhir.png
8	Candi Borobudur	Candi / Virtual Tour	assets/virtual-tours/borobudur/scene-1.jpg
9	Candi Prambanan	Candi / Virtual Tour	assets/virtual-tours/prambanan/scene-1.jpg
🖨️ 3. Cara Mencetak Marker
1. Gunakan file PDF (all-markers.pdf)

Sudah rapi, full resolution, siap cetak.

2. Cetak dengan ukuran minimal:

7 cm x 7 cm (ideal)

Maksimum: bebas

3. Aturan penting:

Jangan crop / potong pattern barcode

Jangan buram

Gunakan pencahayaan yang baik saat scan

Jangan terlalu kecil (AR.js sulit mendeteksi)

📸 4. Cara Menggunakan Marker

Buka ar-viewer.html

Izinkan akses kamera

Pegang marker menghadap ke kamera

Jarak ideal: 15–30 cm

Jika marker terbaca → objek langsung muncul

🔧 5. Cara Kerja Marker di AR.js (Penjelasan Teknis)

Setiap marker memiliki pattern .patt yang biasanya dipanggil seperti:

<a-marker type="pattern" url="assets/markers/barcode-0.patt">


Setelah AR.js membaca ID marker, JavaScript akan menampilkan objek sesuai mapping di:

src/js/ar-handler.js


Contoh pseudo-mapping:

const markers = {
  0: "prasasti-ciaruteun.png",
  1: "kapak-genggam.png",
  ...
};


Lo nggak perlu tulis ini di README, cuma info biar lu paham struktur internalnya.

⚠️ 6. Troubleshooting Marker
Masalah	Penyebab	Solusi
Marker tidak terdeteksi	Cahaya kurang	Tambah cahaya
Objek muncul/menghilang	Goyang terlalu cepat	Stabilkan marker
Kamera tidak aktif	Izin ditolak	Refresh → allow camera
Marker blur	Cetak kualitas rendah	Gunakan PDF asli

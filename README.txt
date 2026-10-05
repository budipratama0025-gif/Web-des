# Sistem Bagikan Lokasi dengan Persetujuan

## 1. Buat database
Buat Google Sheet baru. Buka Extensions > Apps Script.
Hapus kode lama dan tempel isi `Code.gs`.
Klik Deploy > New deployment > Web app.
Execute as: Me.
Who has access: Anyone.
Salin URL Web App.

## 2. Hubungkan website
Pada `index.html` dan `admin.html`, ganti:
GANTI_DENGAN_URL_WEB_APP_APPS_SCRIPT
dengan URL Web App Apps Script.

## 3. Pasang ke GitHub Pages
Upload `index.html` dan `admin.html` ke repository GitHub Pages.
Pastikan website menggunakan HTTPS.

## Catatan privasi
Sistem ini hanya mengambil dan mengirim lokasi setelah pengguna menekan tombol dan menyetujui permintaan lokasi browser. Jangan gunakan untuk mengambil lokasi seseorang secara diam-diam.

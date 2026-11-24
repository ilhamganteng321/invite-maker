# Timeline Pengerjaan — Undangan Video Maker

> **Estimasi:** 4 minggu / 20 hari kerja  
> **Tim asumsi:** 1 frontend developer + 1 UI/UX designer (paruh waktu) + QA oleh developer  
> **Metode:** Iteratif, setiap minggu menghasilkan bagian aplikasi yang dapat diuji.

---

## Ringkasan Timeline

| Minggu | Fokus | Hasil |
|---|---|---|
| 1 | Analisis, desain UI, setup, form | Form undangan dapat digunakan |
| 2 | Upload foto, penyimpanan lokal, Studio UI | Data terhubung ke preview enam scene |
| 3 | Animasi dan video renderer | Preview animasi dan ekspor video berjalan |
| 4 | Integrasi, pengujian, optimasi, rilis | MVP siap diuji pengguna |

## Detail Pengerjaan

### Minggu 1 — Fondasi dan Form Undangan

| Hari | Pekerjaan | Output | Prioritas |
|---|---|---|---|
| 1 | Finalisasi scope MVP, user flow, field form, dan keputusan format ekspor | Scope dan acceptance criteria final | Must |
| 2 | Setup Vite, React JavaScript, Tailwind CSS, routing, struktur folder | Project berjalan dan siap dikembangkan | Must |
| 3 | Membuat layout halaman Form, header, stepper, tombol navigasi | Kerangka UI form | Must |
| 4 | Membuat form data mempelai, orang tua, dan sambutan | Form bagian 1–2 | Must |
| 5 | Membuat form akad, resepsi, validasi, dan halaman review | Form lengkap dan validasi awal | Must |

**Milestone 1:** Pengguna dapat mengisi seluruh data undangan dan melihat ringkasannya.

### Minggu 2 — Foto, Penyimpanan, dan Studio

| Hari | Pekerjaan | Output | Prioritas |
|---|---|---|---|
| 6 | Implementasi upload foto, preview thumbnail, validasi format/ukuran | Upload foto berjalan | Must |
| 7 | Fitur ganti/hapus foto dan pengaturan posisi/crop sederhana | Manajemen foto | Must |
| 8 | Penyimpanan draft teks dan Blob foto menggunakan localStorage + IndexedDB | Data bertahan saat refresh | Should |
| 9 | Membuat layout Studio: preview vertikal, timeline enam scene, panel kontrol | Kerangka Studio | Must |
| 10 | Menghubungkan data form ke enam komponen scene statis | Keenam scene tampil sesuai input | Must |

**Milestone 2:** Data form dan foto tampil pada Studio dalam enam scene.

### Minggu 3 — Animasi dan Rendering Video

| Hari | Pekerjaan | Output | Prioritas |
|---|---|---|---|
| 11 | Menentukan sistem durasi, urutan scene, dan transisi | Konfigurasi timeline | Must |
| 12 | Implementasi animasi scene dengan Motion untuk preview | Preview animasi | Must |
| 13 | Membuat renderer Canvas 2D untuk menggambar scene berdasarkan waktu | Frame renderer | Must |
| 14 | Implementasi canvas.captureStream dan MediaRecorder | File video dapat dibuat | Must |
| 15 | Membuat progress, status, penanganan error, dan tombol unduh | Alur ekspor lengkap | Must |

**Milestone 3:** Pengguna dapat memutar preview animasi dan mengekspor file video dari browser.

### Minggu 4 — Integrasi, QA, dan Rilis MVP

| Hari | Pekerjaan | Output | Prioritas |
|---|---|---|---|
| 16 | Menyamakan tampilan preview dengan hasil renderer dan menangani font/foto | Output lebih konsisten | Must |
| 17 | Uji Chrome dan Edge, uji format MediaRecorder, uji berbagai ukuran foto | Catatan kompatibilitas | Must |
| 18 | Optimasi ukuran gambar, memori, FPS, dan resolusi ekspor | Render lebih stabil | Must |
| 19 | Perbaikan bug, responsivitas, aksesibilitas dasar, empty/error states | Kandidat rilis | Must |
| 20 | UAT, dokumentasi singkat, build production, dan rilis MVP | MVP siap diuji pengguna | Must |

**Milestone 4:** MVP lolos pengujian alur utama dan siap digunakan untuk uji coba terbatas.

---

## Dependency / Urutan Teknis

```text
Setup project
   |
   v
Form + data model
   |
   v
Upload foto + local storage
   |
   v
Studio + enam scene
   |
   v
Timeline + animasi preview
   |
   v
Canvas renderer
   |
   v
MediaRecorder + export
   |
   v
QA browser + optimasi
   |
   v
MVP release
```

## Prioritas Fitur

### Must Have — masuk MVP

- Form enam bagian/kelompok data.
- Validasi field wajib.
- Upload, preview, ganti, dan hapus foto.
- Data form tersedia di halaman Studio.
- Enam scene undangan.
- Preview dan kontrol play/pause.
- Animasi dasar.
- Ekspor video browser-side.
- Progress ekspor dan tombol unduh.
- Error handling dan pengujian Chrome/Edge.

### Should Have — jika waktu memungkinkan

- Penyimpanan draft otomatis di browser.
- Pengaturan crop/focal point foto.
- Pilihan resolusi 720p dan 1080p.
- Tombol reset draft.
- Pengaturan durasi scene sederhana.

### Could Have — setelah MVP

- Beberapa template desain.
- Musik latar dan kontrol volume.
- Ekspor MP4 lintas browser.
- Share ke WhatsApp menggunakan Web Share API atau tautan share.
- Simpan/muat proyek sebagai file.
- Editor teks dan warna yang lebih fleksibel.

---

## Definition of Done per Fitur

Sebuah fitur dianggap selesai jika:

1. Fungsi utama berjalan sesuai acceptance criteria PRD.
2. Tampilan memiliki state normal, loading, kosong, dan error bila relevan.
3. Tidak ada error console yang menghambat alur.
4. Diuji pada Chrome desktop.
5. Data tidak hilang pada perpindahan halaman yang menjadi bagian alur.
6. Perubahan tidak merusak fitur yang sudah selesai.

## Checklist QA MVP

### Form
- [ ] Semua field wajib tervalidasi.
- [ ] Pesan error tampil dekat field terkait.
- [ ] Pengguna dapat kembali ke langkah sebelumnya.
- [ ] Data tetap ada ketika masuk ke Studio.
- [ ] Tanggal dan teks panjang ditampilkan dengan benar.

### Foto
- [ ] JPG, PNG, dan WebP dapat diproses.
- [ ] File yang terlalu besar ditolak dengan pesan yang jelas.
- [ ] Foto dapat diganti dan dihapus.
- [ ] Orientasi dan crop foto tidak merusak layout scene.

### Studio
- [ ] Enam scene tampil sesuai urutan.
- [ ] Nama, tanggal, orang tua, sambutan, dan lokasi sesuai input.
- [ ] Ayat Arab dan terjemahan terbaca.
- [ ] Play, pause, restart, dan pemilihan scene bekerja.
- [ ] Preview tidak menampilkan data yang terpotong.

### Ekspor
- [ ] Browser diperiksa dukungan MediaRecorder dan MIME type.
- [ ] Progress dan status proses tampil.
- [ ] File hasil ekspor dapat diunduh.
- [ ] File dapat diputar pada browser target.
- [ ] Error ekspor menampilkan pesan dan langkah pemulihan.
- [ ] Uji perangkat dengan memori terbatas dilakukan.

---

## Asumsi dan Catatan Estimasi

- Estimasi 20 hari kerja adalah rencana awal, bukan jaminan durasi.
- Estimasi mengasumsikan satu template, satu format ekspor utama (WebM), dan tidak ada backend.
- Implementasi ekspor video adalah bagian dengan risiko teknis tertinggi. Sisihkan waktu QA tambahan jika target MP4 wajib.
- Ekspor 1080 × 1920 dapat berat pada perangkat tertentu. Sediakan fallback resolusi lebih rendah.
- Video.js tidak dibutuhkan untuk merekam halaman. Gunakan MediaRecorder untuk perekaman stream; gunakan elemen video native untuk playback, atau Video.js jika fitur player tambahan benar-benar diperlukan.
- Perubahan scope seperti multi-template, MP4 lintas browser, atau editor musik dapat menambah estimasi.

## Rencana Setelah MVP

1. Uji kepada 5–10 pengguna dan kumpulkan masalah utama.
2. Evaluasi kualitas hasil video pada beberapa perangkat.
3. Prioritaskan MP4 jika kebutuhan pengguna mengharuskannya.
4. Tambahkan template kedua setelah sistem scene dan renderer stabil.
5. Tambahkan musik dan fitur berbagi setelah ekspor inti dapat diandalkan.

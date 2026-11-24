# PRD — Undangan Video Maker

> **Status:** Draft v1.0  
> **Produk:** Web-based Wedding Video Invitation Maker  
> **Platform:** Web desktop-first, responsive  
> **Stack utama:** React + JavaScript + Tailwind CSS  
> **Rendering:** Browser-side Canvas + MediaRecorder  
> **Bahasa UI:** Bahasa Indonesia

---

## 1. Ringkasan Produk

Undangan Video Maker adalah aplikasi web untuk membuat video undangan pernikahan dari data yang diisi pengguna. Pengguna mengisi informasi mempelai, orang tua, sambutan, jadwal akad dan resepsi, memilih foto, melihat preview animasi, lalu mengekspor video langsung dari browser.

Aplikasi memiliki dua halaman utama:

1. **Halaman Form Undangan** — mengumpulkan seluruh informasi dan foto yang diperlukan.
2. **Halaman Studio / Proses Video** — menampilkan preview enam scene, menjalankan animasi, dan menghasilkan file video.

Seluruh data dan proses rendering MVP berjalan di sisi browser. Tidak diperlukan akun, database, atau server rendering untuk versi awal.

## 2. Masalah yang Ingin Diselesaikan

Pembuatan video undangan biasanya membutuhkan aplikasi editing video dan keterampilan desain. Produk ini menyederhanakan proses menjadi pengisian form, pemilihan foto, preview, dan ekspor.

## 3. Tujuan Produk

- Pengguna dapat membuat video undangan tanpa kemampuan editing video.
- Pengguna dapat mengisi data satu kali dan menggunakannya di seluruh scene.
- Pengguna dapat melihat preview sebelum mengekspor.
- Pengguna dapat mengunduh hasil video tanpa mengunggah data pribadi ke server.
- Pengalaman pembuatan video mudah dipahami dan berjalan di browser modern.

### Bukan tujuan MVP

- Marketplace template atau sistem pembayaran.
- Login, akun pengguna, dan penyimpanan cloud.
- Kolaborasi beberapa pengguna.
- Editor video profesional dengan multi-track, keyframe bebas, atau pemotongan audio kompleks.
- Pengiriman undangan otomatis ke WhatsApp.
- Rendering di server.

## 4. Target Pengguna

- Calon pengantin yang ingin membuat undangan video sendiri.
- Keluarga atau teman yang membantu menyiapkan undangan.
- Pengguna umum yang membutuhkan hasil cepat tanpa software editing.

## 5. Alur Pengguna Utama

```text
Landing / Form Undangan
        |
        v
Isi data mempelai dan acara
        |
        v
Upload dan atur foto
        |
        v
Validasi data
        |
        v
Buka Studio Video
        |
        v
Preview 6 scene + animasi
        |
        v
Render dan rekam di browser
        |
        v
Unduh video
```

### Pemetaan dengan flow pada referensi

| Tahap | Fungsi | Subfitur |
|---|---|---|
| Isi Form Undangan | Mengumpulkan data | Data mempelai, sambutan orang tua, detail akad nikah |
| Upload Foto | Menyiapkan aset | Pilih foto, atur posisi/crop, ganti atau hapus |
| Preview Animasi | Memeriksa hasil | Putar undangan, lihat animasi teks, cek tampilan ponsel |
| Simpan & Unduh | Menghasilkan file | Proses video, simpan ke perangkat, opsi berbagi WhatsApp |

---

## 6. Ruang Lingkup Halaman

## 6.1 Halaman 1 — Form Undangan

### Tujuan

Mengumpulkan seluruh data yang dibutuhkan oleh enam scene video. Form dibuat bertahap agar tidak terasa panjang.

### Struktur UI yang disarankan

- Header: logo/nama aplikasi dan indikator langkah.
- Progress stepper: Data Mempelai → Sambutan → Akad → Resepsi → Foto → Review.
- Form utama di tengah.
- Tombol **Sebelumnya**, **Simpan Draft**, dan **Lanjutkan**.
- Ringkasan data di langkah review.
- Validasi inline dengan pesan yang jelas.

### Data form

#### A. Data mempelai dan tanggal

| Field | Tipe | Wajib | Keterangan |
|---|---|---:|---|
| Nama lengkap mempelai pria | Text | Ya | Ditampilkan pada scene 1 dan 6 |
| Nama lengkap mempelai wanita | Text | Ya | Ditampilkan pada scene 1 dan 6 |
| Nama panggilan pria | Text | Tidak | Opsional untuk desain |
| Nama panggilan wanita | Text | Tidak | Opsional untuk desain |
| Tanggal pernikahan | Date | Ya | Tanggal utama acara |
| Foto utama / foto pasangan | Image | Ya | Foto pembuka atau hero |

#### B. Orang tua dan sambutan

| Field | Tipe | Wajib | Keterangan |
|---|---|---:|---|
| Nama ayah mempelai pria | Text | Tidak | Dapat dikosongkan bila tidak digunakan |
| Nama ibu mempelai pria | Text | Tidak | Dapat dikosongkan bila tidak digunakan |
| Nama ayah mempelai wanita | Text | Tidak | Dapat dikosongkan bila tidak digunakan |
| Nama ibu mempelai wanita | Text | Tidak | Dapat dikosongkan bila tidak digunakan |
| Teks sambutan / kalimat undangan | Textarea | Ya | Kalimat yang mengundang tamu |

#### C. Detail akad nikah

| Field | Tipe | Wajib | Keterangan |
|---|---|---:|---|
| Tanggal akad | Date | Ya | Tanggal pelaksanaan akad |
| Waktu akad | Time | Tidak | Opsional |
| Lokasi akad | Textarea | Ya | Nama tempat dan alamat |
| Catatan akad | Text | Tidak | Opsional |

#### D. Detail resepsi

| Field | Tipe | Wajib | Keterangan |
|---|---|---:|---|
| Tanggal resepsi | Date | Ya | Tanggal pelaksanaan resepsi |
| Waktu resepsi | Time | Tidak | Opsional |
| Lokasi resepsi | Textarea | Ya | Nama tempat dan alamat |
| Catatan resepsi | Text | Tidak | Opsional |

#### E. Foto

- Upload foto utama/pasangan.
- Upload foto tambahan bila template membutuhkannya.
- Tampilkan thumbnail dan status upload.
- Ganti foto dan hapus foto.
- Atur posisi foto (fit/crop dan focal point sederhana).
- Validasi format JPG, PNG, atau WebP.
- Validasi ukuran file; rekomendasi batas awal 10 MB per foto.
- Tampilkan pesan jika file terlalu besar atau format tidak didukung.

#### F. Review

- Tampilkan ringkasan seluruh data.
- Pengguna dapat kembali ke bagian tertentu untuk mengedit.
- Tombol **Buat Preview Video** membuka halaman Studio.

### Validasi

- Field wajib tidak boleh kosong.
- Nama dan teks ditampilkan sesuai input; lakukan trim spasi berlebih.
- Tanggal harus berupa tanggal valid.
- File gambar harus dapat dibaca browser.
- Teks panjang tidak boleh keluar dari area scene; gunakan batas karakter yang disarankan dan auto-fit font.
- Berikan peringatan jika data opsional belum diisi tetapi scene terkait membutuhkannya.

---

## 6.2 Halaman 2 — Studio Video

### Tujuan

Menampilkan enam scene video, mengontrol preview, dan menghasilkan video dari data form.

### Layout yang disarankan

- **Top bar:** tombol kembali ke form, nama proyek, status data.
- **Area preview:** rasio 9:16 sebagai default (1080 × 1920).
- **Timeline scene:** enam thumbnail/segmen yang dapat dipilih.
- **Panel kontrol:** play/pause, restart, mute, durasi, kualitas ekspor.
- **Panel ekspor:** tombol Render / Buat Video, progress, Unduh.
- **Status:** siap, sedang merender, selesai, atau gagal.

### Enam scene video

Durasi awal adalah rekomendasi dan harus dapat disesuaikan saat implementasi.

| Scene | Isi | Durasi awal |
|---|---|---:|
| 1. Pembuka | Foto pasangan, nama mempelai, tanggal pernikahan | 5 detik |
| 2. Sambutan | Nama mempelai, nama orang tua, kalimat undangan | 7 detik |
| 3. Akad | Judul akad, tanggal, waktu, lokasi | 5 detik |
| 4. Resepsi | Judul resepsi, tanggal, waktu, lokasi | 5 detik |
| 5. Ayat | QS. Ar-Rum ayat 21 dan terjemahan | 7 detik |
| 6. Penutup | Nama mempelai, tanggal, teks “Made with love” | 5 detik |
| **Total** | Tidak termasuk transisi tambahan | **34 detik** |

### Konten scene 5 — QS. Ar-Rum ayat 21

Teks yang ditampilkan:

**وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً**

Terjemahan ringkas yang dapat digunakan:

“Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.”

Catatan produk:
- Cantumkan referensi **QS. Ar-Rum: 21**.
- Pastikan teks Arab menggunakan font yang mendukung aksara Arab dan arah kanan-ke-kiri.
- Sediakan ruang agar ayat dan terjemahan terbaca.
- Sebelum rilis, verifikasi ejaan Arab dan terjemahan terhadap mushaf/terjemahan resmi yang dipilih.

### Kontrol preview

- Play / Pause.
- Restart dari awal.
- Pindah ke scene sebelumnya/berikutnya.
- Pilih scene dari timeline.
- Preview rasio 9:16.
- Toggle suara bila musik ditambahkan.
- Indikator waktu berjalan dan total durasi.

### Ekspor video

- Tombol **Buat Video** memulai proses render.
- Tampilkan progress dan status proses.
- Pengguna tidak boleh menutup halaman selama proses berjalan; tampilkan peringatan jika mencoba meninggalkan halaman.
- Setelah selesai, tampilkan tombol **Unduh Video**.
- Nama file default: `undangan-[nama-mempelai]-[tanggal].webm`.
- Sediakan tombol **Buat Ulang** jika hasil tidak sesuai.
- Sediakan opsi kembali ke form untuk mengubah data.

### Catatan teknis penting

Video.js pada dasarnya adalah **video player**, bukan alat utama untuk merekam DOM menjadi file video. Untuk MVP:

1. Gunakan React untuk UI dan scene preview.
2. Gunakan Motion (paket `motion` / Motion for React) untuk animasi elemen UI dan transisi.
3. Buat renderer scene berbasis Canvas 2D untuk output video yang konsisten.
4. Render frame ke canvas sesuai waktu/timeline.
5. Ambil stream dengan `canvas.captureStream(fps)`.
6. Rekam stream menggunakan `MediaRecorder`.
7. Buat file Blob dan sediakan tautan unduh.
8. Gunakan elemen `<video>` native untuk preview hasil ekspor. Video.js bersifat opsional jika memang membutuhkan fitur player yang lebih lengkap.

**Penting:** `MediaRecorder` dan codec yang tersedia berbeda antar-browser. Format WebM merupakan target MVP yang lebih realistis untuk ekspor langsung di browser. MP4 dapat menjadi fase lanjutan menggunakan WebCodecs atau FFmpeg.wasm, dengan konsekuensi ukuran bundle, waktu proses, dan kebutuhan memori yang lebih besar.

Alternatif merekam tab dengan `getDisplayMedia()` tidak direkomendasikan sebagai alur utama karena membutuhkan izin dan interaksi screen-sharing dari pengguna. Jangan mengandalkan screenshot/record screen halaman sebagai satu-satunya mekanisme ekspor.

---

## 7. Persyaratan Fungsional

| ID | Fitur | Prioritas | Kriteria penerimaan |
|---|---|---|---|
| FR-01 | Form data mempelai | Must | Pengguna dapat mengisi dan mengedit nama serta tanggal |
| FR-02 | Form orang tua dan sambutan | Must | Data tampil pada scene 2 |
| FR-03 | Form akad | Must | Data tanggal, waktu, dan lokasi tampil pada scene 3 |
| FR-04 | Form resepsi | Must | Data tanggal, waktu, dan lokasi tampil pada scene 4 |
| FR-05 | Upload foto | Must | Foto dapat dipilih, dipreview, diganti, dan dihapus |
| FR-06 | Validasi form | Must | Pengguna mendapat pesan pada field yang belum valid |
| FR-07 | Penyimpanan draft lokal | Should | Data dapat dipulihkan setelah refresh pada browser yang sama |
| FR-08 | Preview enam scene | Must | Semua scene menggunakan data form aktual |
| FR-09 | Animasi | Must | Teks dan foto memiliki animasi masuk/keluar yang halus |
| FR-10 | Kontrol timeline | Should | Pengguna dapat memilih scene dan memutar preview |
| FR-11 | Ekspor video | Must | Browser menghasilkan file video yang dapat diunduh |
| FR-12 | Progress ekspor | Must | Status dan progress proses ditampilkan |
| FR-13 | Ubah data dari studio | Must | Pengguna dapat kembali ke form tanpa kehilangan data |
| FR-14 | Berbagi WhatsApp | Could | Membuka WhatsApp share link atau native share jika didukung |
| FR-15 | Musik latar | Could | Pengguna dapat memilih/menambahkan audio yang hak penggunaannya jelas |

**Definisi prioritas:** Must = wajib untuk MVP; Should = penting tetapi dapat menyusul; Could = tambahan.

## 8. Persyaratan Non-Fungsional

### Performa

- Form tetap responsif saat gambar dipilih.
- Preview tidak memuat semua gambar resolusi penuh jika tidak diperlukan.
- Tampilkan status proses untuk pekerjaan yang memakan waktu.
- Batasi resolusi/FPS ekspor sesuai kemampuan perangkat.
- Hindari membuat banyak salinan gambar besar di memori.

### Kompatibilitas

- Target utama: Chrome dan Edge desktop versi modern.
- Uji Safari dan Firefox secara terpisah karena dukungan codec dan MediaRecorder dapat berbeda.
- Jika format ekspor tidak didukung, tampilkan pesan dan opsi yang tersedia; jangan mengklaim ekspor berhasil.

### Privasi

- Foto dan data pribadi diproses secara lokal pada MVP.
- Tidak ada upload otomatis ke server.
- Jelaskan bahwa draft lokal tersimpan pada browser/perangkat yang sama.
- Sediakan tombol hapus/reset data lokal.
- Jangan menyimpan data pribadi pada analytics atau log.

### Aksesibilitas dan UX

- Label form jelas.
- Navigasi dapat digunakan dengan keyboard.
- Kontras teks memadai.
- Status error dan proses tidak hanya dibedakan dengan warna.
- Animasi tidak berlebihan dan menghormati `prefers-reduced-motion` pada UI.

---

## 9. Rekomendasi Teknologi

| Area | Teknologi | Tanggung jawab |
|---|---|---|
| UI | React + JavaScript | Komponen dan state aplikasi |
| Styling | Tailwind CSS | Layout dan desain responsif |
| Routing | React Router | Navigasi Form dan Studio |
| Form | React Hook Form (opsional) | State, validasi, dan error form |
| Schema validation | Zod (opsional) | Validasi data terstruktur |
| Animasi UI | Motion for React | Animasi transisi dan elemen UI |
| Video rendering | Canvas 2D API | Menggambar frame setiap scene |
| Video capture | `canvas.captureStream()` | Menghasilkan MediaStream |
| Video encoding | `MediaRecorder` | Merekam stream menjadi Blob |
| Preview video | HTML `<video>` | Memutar hasil ekspor |
| Penyimpanan draft | localStorage / IndexedDB | Menyimpan data dan aset lokal |
| Build tool | Vite | Development dan build |

### Catatan penyimpanan

- Gunakan `localStorage` untuk data teks sederhana.
- Gunakan IndexedDB untuk foto/Blob dan draft yang lebih besar.
- Jangan menyimpan base64 foto besar ke localStorage.
- Sediakan mekanisme reset draft.
- Pengguna perlu diberi tahu bahwa data lokal dapat hilang jika storage browser dibersihkan.

### Struktur folder yang disarankan

```text
src/
├── app/
│   ├── App.jsx
│   └── router.jsx
├── components/
│   ├── form/
│   ├── studio/
│   ├── timeline/
│   └── common/
├── pages/
│   ├── InvitationFormPage.jsx
│   └── VideoStudioPage.jsx
├── features/
│   ├── invitation/
│   │   ├── invitation.schema.js
│   │   ├── invitation.defaults.js
│   │   └── invitation.storage.js
│   ├── photo/
│   └── video/
│       ├── scenes/
│       │   ├── OpeningScene.js
│       │   ├── WelcomeScene.js
│       │   ├── AkadScene.js
│       │   ├── ReceptionScene.js
│       │   ├── QuranScene.js
│       │   └── ClosingScene.js
│       ├── canvasRenderer.js
│       ├── recorder.js
│       └── video.utils.js
├── hooks/
├── utils/
└── styles/
```

---

## 10. Model Data Awal

Contoh struktur data aplikasi:

```js
const invitation = {
  couple: {
    groomName: "",
    brideName: "",
    groomNickname: "",
    brideNickname: "",
    weddingDate: ""
  },
  parents: {
    groomFather: "",
    groomMother: "",
    brideFather: "",
    brideMother: ""
  },
  welcomeMessage: "",
  akad: {
    date: "",
    time: "",
    location: "",
    note: ""
  },
  reception: {
    date: "",
    time: "",
    location: "",
    note: ""
  },
  photos: {
    main: null,
    additional: []
  },
  preferences: {
    aspectRatio: "9:16",
    resolution: "1080x1920",
    fps: 30
  }
};
```

Foto disimpan sebagai Blob/record IndexedDB, bukan sebagai string base64 pada object ini.

---

## 11. Desain dan Pengalaman Pengguna

### Arah visual

- Elegan, romantis, bersih, dan modern.
- Warna awal: ivory, beige, champagne, dusty rose, atau dark navy sebagai aksen.
- Tipografi kombinasi serif untuk nama mempelai dan sans-serif untuk informasi.
- Gunakan ruang kosong yang cukup.
- Preview video mengutamakan rasio vertikal 9:16.

### Prinsip UX

- Pengguna selalu mengetahui sedang berada di langkah mana.
- Data tidak hilang saat berpindah halaman.
- Tombol utama memiliki label yang jelas.
- Preview harus merepresentasikan hasil ekspor sedekat mungkin.
- Error ekspor harus menjelaskan penyebab dan tindakan berikutnya.

---

## 12. Acceptance Criteria MVP

MVP dinyatakan siap diuji ketika:

1. Pengguna dapat mengisi seluruh field wajib.
2. Pengguna dapat mengunggah, melihat, mengganti, dan menghapus foto.
3. Data form tetap tersedia ketika berpindah ke Studio.
4. Keenam scene menampilkan data yang benar.
5. Animasi preview berjalan dan dapat diputar ulang.
6. Pengguna dapat mengekspor video melalui browser tanpa mengunggah aset ke server.
7. File hasil ekspor dapat diunduh dan diputar pada browser/perangkat yang mendukung formatnya.
8. Aplikasi memberi pesan yang jelas jika browser tidak mendukung proses ekspor.
9. Pengguna dapat kembali mengedit data dan membuat ulang video.
10. Pengujian dilakukan pada minimal Chrome dan Edge desktop.

---

## 13. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Codec berbeda antar-browser | Ekspor gagal atau format berbeda | Deteksi `MediaRecorder.isTypeSupported()` dan fallback |
| Memori perangkat terbatas | Tab crash saat render | Batasi resolusi/FPS, optimalkan gambar, uji durasi |
| Canvas dan preview tidak sinkron | Hasil video berbeda dari preview | Gunakan satu definisi scene/timing untuk preview dan renderer |
| Font belum siap saat render | Teks berubah atau tidak tampil | Tunggu `document.fonts.ready` sebelum rendering |
| Foto terlalu besar | Render lambat | Resize/canvas decode dan batasi ukuran file |
| Ayat Arab tidak terbaca | Kesalahan tampilan konten | Font Arab yang sesuai dan verifikasi visual |
| Draft lokal terhapus | Data pengguna hilang | Beri informasi penyimpanan lokal dan opsi ekspor data draft pada fase lanjutan |

---

## 14. Metrik Keberhasilan

- Pengguna dapat menyelesaikan pengisian form tanpa bantuan.
- Minimal satu video berhasil diekspor pada browser target.
- Tidak ada kehilangan data saat berpindah antara Form dan Studio.
- Semua enam scene tampil sesuai data.
- Tidak ada error kritis pada alur utama.
- Waktu render dicatat pada perangkat uji untuk menetapkan target performa realistis.

---

## 15. Keputusan Produk yang Perlu Dikonfirmasi

Sebelum implementasi final, konfirmasi keputusan berikut:

1. **Format video:** MVP WebM terlebih dahulu atau MP4 wajib sejak versi pertama?
2. **Template:** MVP memakai satu template desain atau beberapa pilihan template?
3. **Musik:** Apakah musik latar disediakan aplikasi, diunggah pengguna, atau tidak termasuk MVP?
4. **Resolusi:** Apakah 1080 × 1920 menjadi target utama, dengan opsi 720 × 1280 untuk perangkat terbatas?
5. **Foto:** Apakah hanya satu foto pasangan atau beberapa foto untuk scene berbeda?

### Rekomendasi default MVP

- Satu template elegan.
- Video vertikal 9:16.
- Target ekspor WebM pada browser yang mendukung.
- Satu foto utama dan foto tambahan opsional.
- Tanpa backend dan tanpa login.
- Musik latar menjadi fitur opsional setelah alur ekspor dasar stabil.

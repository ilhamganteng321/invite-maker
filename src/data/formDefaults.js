export const formDefaults = {
  // Data mempelai
  namaPria: '',
  namaWanita: '',
  tanggalNikah: '',
  foto: null,

  // Orang tua & sambutan
  ayahPria: '',
  ibuPria: '',
  ayahWanita: '',
  ibuWanita: '',
  kataSambutan: '',

  // Akad
  tanggalAkad: '',
  waktuAkad: '',
  lokasiAkad: '',

  // Resepsi
  tanggalResepsi: '',
  waktuResepsi: '',
  lokasiResepsi: '',
};

export const initialForm = () => ({ ...formDefaults });
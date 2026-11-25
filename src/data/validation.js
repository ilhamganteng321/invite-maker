export const requiredFields = [
  'namaPria',
  'namaWanita',
  'tanggalNikah',
  'foto',
  'ayahPria',
  'ibuPria',
  'ayahWanita',
  'ibuWanita',
  'kataSambutan',
  'tanggalAkad',
  'waktuAkad',
  'lokasiAkad',
  'tanggalResepsi',
  'waktuResepsi',
  'lokasiResepsi',
];

export function validateForm(form) {
  const errors = {};
  requiredFields.forEach((field) => {
    if (!form[field] || String(form[field]).trim() === '') {
      errors[field] = 'Field ini wajib diisi.';
    }
  });
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateSection(form, fields) {
  const errors = {};
  fields.forEach((field) => {
    if (!form[field] || String(form[field]).trim() === '') {
      errors[field] = 'Field ini wajib diisi.';
    }
  });
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
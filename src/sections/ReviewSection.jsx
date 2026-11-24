export default function ReviewSection({ form }) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Ringkasan Data Undangan</h2>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Nama Pria</span>
          <span className="font-medium">{form.namaPria || '-'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Nama Wanita</span>
          <span className="font-medium">{form.namaWanita || '-'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tanggal Pernikahan</span>
          <span className="font-medium">{form.tanggalNikah || '-'}</span>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Orang Tua</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase">Ayah Pria</p>
              <p>{form.ayahPria || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Ibu Pria</p>
              <p>{form.ibuPria || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Ayah Wanita</p>
              <p>{form.ayahWanita || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Ibu Wanita</p>
              <p>{form.ibuWanita || '-'}</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 uppercase mb-3">Sambutan</p>
          <p className="text-gray-700">{form.kataSambutan || '-'}</p>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Akad Nikah</h3>
          <div className="flex justify-between">
            <span className="text-gray-600">Tanggal</span>
            <span className="font-medium">{form.tanggalAkad || '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Waktu</span>
            <span className="font-medium">{form.waktuAkad || '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Lokasi</span>
            <span className="font-medium">{form.lokasiAkad || '-'}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Resepsi</h3>
          <div className="flex justify-between">
            <span className="text-gray-600">Tanggal</span>
            <span className="font-medium">{form.tanggalResepsi || '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Waktu</span>
            <span className="font-medium">{form.waktuResepsi || '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Lokasi</span>
            <span className="font-medium">{form.lokasiResepsi || '-'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
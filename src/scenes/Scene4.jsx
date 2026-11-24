export default function Scene4({ data }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2 italic">Resepsi</h2>
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border border-gray-200">
          <span className="text-gray-600">Tanggal</span>
          <span className="font-medium text-gray-900">{data.tanggalResepsi || '-'}</span>
        </div>
        <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border border-gray-200">
          <span className="text-gray-600">Waktu</span>
          <span className="font-medium text-gray-900">{data.waktuResepsi || '-'}</span>
        </div>
        <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border border-gray-200">
          <span className="text-gray-600">Lokasi</span>
          <span className="font-medium text-gray-900">{data.lokasiResepsi || '-'}</span>
        </div>
      </div>
    </div>
  );
}
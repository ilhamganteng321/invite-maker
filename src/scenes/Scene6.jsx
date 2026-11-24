export default function Scene6({ data }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2 italic">
        {data.namaPria} & {data.namaWanita}
      </h2>
      <p className="text-gray-600 mb-6">{data.tanggalNikah || 'Tanggal pernikahan'}</p>
      <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
        <p className="text-indigo-900 font-medium text-lg italic">
          Made with love
        </p>
      </div>
    </div>
  );
}
export default function Scene1({ data }) {
  const photoUrl = data.foto ? URL.createObjectURL(data.foto) : null;

  return (
    <div className="relative flex flex-col items-center justify-center p-6">
      {photoUrl && (
        <img
          src={photoUrl}
          alt="Foto mempelai"
          className="w-48 h-48 rounded-full object-cover mb-4 border-4 border-white shadow-lg"
        />
      )}
      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-1 italic">
        {data.namaPria} & {data.namaWanita}
      </h2>
      <p className="text-lg text-gray-600">
        {data.tanggalNikah || 'Tanggal pernikahan'}
      </p>
    </div>
  );
}
export default function Scene2({ data }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2 italic">
        Sambutan
      </h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-500 uppercase">Orang Tua Pria</p>
          <p className="text-gray-700">
            {data.ayahPria} &amp; {data.ibuPria}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-500 uppercase">Orang Tua Wanita</p>
          <p className="text-gray-700">
            {data.ayahWanita} &amp; {data.ibuWanita}
          </p>
        </div>
      </div>
      <div className="max-w-xl mx-auto bg-gray-50 rounded-lg p-6 border border-gray-200 italic">
        <p className="text-gray-800">{data.kataSambutan}</p>
      </div>
    </div>
  );
}
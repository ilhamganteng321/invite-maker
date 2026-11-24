export default function Header({ title = 'Undangan Video Maker' }) {
  return (
    <header className="mb-6 flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
        UV
      </div>
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
    </header>
  );
}
export default function Header() {
  return (
    <header className="bg-slate-900 text-white py-4 shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <span className="text-amber-400">تينبو</span> | أسعار الذهب والعملات
        </div>
        <nav className="text-sm text-slate-300">
          مصر مباشر
        </nav>
      </div>
    </header>
  );
}
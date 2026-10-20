export default function SilverTable({ silver }: { silver: { gram999: number; gram925: number } }) {
  return (
    <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl text-white">
      <h2 className="text-xl font-bold mb-4 text-amber-400 border-b border-slate-800 pb-2 flex justify-between items-center">
        <span>أسعار الفضة في مصر</span>
        <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">
          سعر مباشر
        </span>
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
          <p className="text-xs text-slate-400 mb-1">فضة عيار 999 (نقي)</p>
          <p className="text-xl font-extrabold text-amber-300">{silver.gram999} <span className="text-xs font-normal">ج.م</span></p>
        </div>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
          <p className="text-xs text-slate-400 mb-1">فضة عيار 925 (استرليني)</p>
          <p className="text-xl font-extrabold text-amber-300">{silver.gram925} <span className="text-xs font-normal">ج.م</span></p>
        </div>
      </div>
    </div>
  );
}
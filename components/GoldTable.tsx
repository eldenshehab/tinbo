interface GoldData {
  gram24: number;
  gram22: number;
  gram21: number;
  gram18: number;
  gram14: number;
  pound: number;
}

export default function GoldTable({ data }: { data: GoldData }) {
  if (!data) return null;

  const rows = [
    { name: "عيار 24", price: data.gram24 },
    { name: "عيار 22", price: data.gram22 },
    { name: "عيار 21 (الأكثر مبيعاً)", price: data.gram21, highlight: true },
    { name: "عيار 18", price: data.gram18 },
    { name: "عيار 14", price: data.gram14 },
    { name: "الجنيه الذهب (8 جرام 21)", price: data.pound, isPound: true },
  ];

  return (
    <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl text-white">
      <h3 className="text-xl font-bold mb-4 text-amber-400 border-b border-slate-800 pb-3 flex justify-between items-center">
        <span>جدول أسعار الذهب اليوم</span>
        <span className="text-xs bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded-full border border-amber-500/30">
          بدون مصنعية
        </span>
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse text-sm">
          <thead>
            <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <th className="p-3 font-semibold">العيار</th>
              <th className="p-3 font-semibold text-center">السعر بالجنيه المصري</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr 
                key={index} 
                className={`border-b border-slate-800/60 transition-colors ${
                  row.highlight ? "bg-amber-500/10 font-bold" : "hover:bg-slate-800/40"
                }`}
              >
                <td className="p-3.5 text-slate-200 font-medium flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${row.isPound ? "bg-amber-400" : "bg-slate-600"}`}></span>
                  {row.name}
                </td>
                <td className="p-3.5 text-center font-extrabold text-amber-300 text-base">
                  {row.price ? row.price.toLocaleString("ar-EG") : "---"} <span className="text-xs font-normal text-slate-400">ج.م</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
"import client";
"use client";

import { useState } from "react";

interface Currency {
  name: string;
  code: string;
  buy: number;
  sell: number;
}

export default function CurrencyTable({ currencies }: { currencies?: Currency[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const list = currencies || [];

  // تصفية العملات بناءً على البحث
  const filteredCurrencies = list.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl text-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-amber-400">أسعار العملات مقابل الجنيه</h2>
          <p className="text-xs text-slate-400 mt-1">تحديث مباشر من البنوك والسوق المصرفي</p>
        </div>
        
        {/* خانة البحث المطلوبة */}
        <div className="w-full md:w-auto">
          <input
            type="text"
            placeholder="ابحث عن اسم أو رمز العملة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 bg-slate-950 border border-amber-500/40 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-all"
          />
        </div>
      </div>

      <div className="overflow-x-auto max-h-[350px] overflow-y-auto custom-scrollbar">
        <table className="w-full text-right border-collapse text-sm">
          <thead>
            <tr className="bg-slate-950 text-amber-400 border-b border-slate-800 sticky top-0">
              <th className="p-3 font-semibold">العملة</th>
              <th className="p-3 font-semibold text-center">شراء</th>
              <th className="p-3 font-semibold text-center">بيع</th>
            </tr>
          </thead>
          <tbody>
            {filteredCurrencies.length > 0 ? (
              filteredCurrencies.map((item, index) => (
                <tr key={index} className="border-b border-slate-800/60 hover:bg-slate-800/50 transition-colors">
                  <td className="p-3 font-medium text-slate-200 flex items-center gap-2">
                    <span>{item.name}</span>
                    <span className="text-xs bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20">{item.code}</span>
                  </td>
                  <td className="p-3 text-center font-bold text-amber-300">
                    {item.buy.toFixed(2)} ج.م
                  </td>
                  <td className="p-3 text-center font-bold text-emerald-400">
                    {item.sell.toFixed(2)} ج.م
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-6 text-slate-500">
                  لا توجد نتائج مطابقة لـ "{searchQuery}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
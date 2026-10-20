"use client";

import { useState } from "react";

export default function GoldCalculator({ price21 }: { price21: number }) {
  const [grams, setGrams] = useState<number>(1);
  const [workmanship, setWorkmanship] = useState<number>(100);

  const totalPrice = (price21 + (workmanship || 0)) * (grams || 0);

  return (
    <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl text-white">
      <h3 className="text-xl font-bold mb-4 text-amber-400 border-b border-slate-800 pb-3">
        حاسبة الذهب والمصنعية
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1">عدد الجرامات (عيار 21):</label>
          <input
            type="number"
            min="1"
            value={grams}
            onChange={(e) => setGrams(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">المصنعية التقديرية للجرام (ج.م):</label>
          <input
            type="number"
            min="0"
            value={workmanship}
            onChange={(e) => setWorkmanship(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/20 text-center mt-4">
          <p className="text-xs text-slate-400 mb-1">الإجمالي الشامل والموقع التقديري:</p>
          <p className="text-2xl font-black text-amber-400">
            {totalPrice.toLocaleString("ar-EG")} <span className="text-sm font-normal text-slate-300">ج.م</span>
          </p>
        </div>
      </div>
    </div>
  );
}
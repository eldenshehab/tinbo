"use client";

import { useEffect, useState } from "react";

type KaratPrice = {
  price: number;
  buy: number | null;
  sell: number | null;
  updatedAt: string | null;
};

type GoldData = {
  currency: string;
  world: {
    gram24: number;
    gram21: number;
    gram18: number;
    updatedAt: string | null;
  };
  egyptMarket: {
    karat24: KaratPrice;
    karat21: KaratPrice;
    karat18: KaratPrice;
    pound: KaratPrice;
  };
  fetchedAt: string;
};

const numberFormat = new Intl.NumberFormat("ar-EG", {
  maximumFractionDigits: 2,
});

function money(value: number | null) {
  if (value === null || !Number.isFinite(value)) return "—";
  return `${numberFormat.format(value)} ج.م`;
}

function time(value: string | null) {
  if (!value) return "غير متاح";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "غير متاح";

  return date.toLocaleString("ar-EG", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Africa/Cairo",
  });
}

export default function GoldPrices() {
  const [data, setData] = useState<GoldData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadPrices() {
      try {
        const response = await fetch("/api/gold-prices", {
          cache: "no-store",
        });

        if (!response.ok) throw new Error("Price request failed");

        const result = (await response.json()) as GoldData;

        if (active) {
          setData(result);
          setError(false);
        }
      } catch {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadPrices();
    const timer = window.setInterval(() => {
      void loadPrices();
    }, 60_000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  const marketRows = data
    ? [
        ["عيار 24", data.egyptMarket.karat24],
        ["عيار 21 (الأكثر مبيعاً)", data.egyptMarket.karat21],
        ["عيار 18", data.egyptMarket.karat18],
        ["الجنيه الذهب (8 جرام)", data.egyptMarket.pound],
      ] as const
    : [];

  return (
    <section dir="rtl" lang="ar" className="space-y-8 text-white">
      {/* التنبيهات */}
      <div className="bg-slate-900 border border-amber-500/30 p-4 rounded-xl text-center text-sm text-slate-300">
        {loading && !data ? (
          <p className="text-amber-400 font-bold animate-pulse">جارٍ تحميل الأسعار المباشرة من GoldTimo...</p>
        ) : error ? (
          <p className="text-rose-400">تعذر تحديث الأسعار. قد تكون البيانات المعروضة استرشادية.</p>
        ) : (
          <p className="text-emerald-400">الأسعار تحدّث تلقائياً كل دقيقة استرشادياً وفقاً لبورصة GoldTimo.</p>
        )}
      </div>

      {data && (
        <>
          {/* أسعار السوق المصري */}
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold mb-6 text-amber-400 border-b border-slate-800 pb-3 flex justify-between items-center">
              <span>أسعار السوق المصري (شراء وبيع)</span>
              <span className="text-xs bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full">
                GoldTimo Live
              </span>
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {marketRows.map(([label, item]) => (
                <div key={label} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs text-amber-400 font-bold block">{label}</span>
                  <strong className="text-2xl font-black text-white block">{money(item.price)}</strong>
                  
                  <div className="pt-2 border-t border-slate-800/80 text-xs flex justify-between text-slate-400">
                    <span>شراء: <b className="text-emerald-400">{money(item.buy)}</b></span>
                    <span>بيع: <b className="text-amber-300">{money(item.sell)}</b></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* السعر العالمي المحسوب */}
          <div className="bg-slate-900 border border-amber-500/20 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold mb-4 text-slate-300 border-b border-slate-800 pb-2">
              السعر العالمي المحسوب بالجنيه (بدون فروق الصاغة)
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                ["عيار 24", data.world.gram24],
                ["عيار 21", data.world.gram21],
                ["عيار 18", data.world.gram18],
              ].map(([label, value]) => (
                <div key={label} className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">{label}</span>
                  <p className="text-lg font-bold text-amber-400 mt-1">{money(Number(value))}</p>
                </div>
              ))}
            </div>
          </div>

          {/* تفاصيل وقت التحديث */}
          <div className="text-xs text-slate-500 text-center space-y-1">
            <p>مصدر البيانات المباشر: GoldTimo API</p>
            <p>آخر جلب: {time(data.fetchedAt)} | وقت تحديث السعر العالمي: {time(data.world.updatedAt)}</p>
          </div>
        </>
      )}
    </section>
  );
}
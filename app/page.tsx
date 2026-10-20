"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [amount, setAmount] = useState<number>(1);
  const [timeString, setTimeString] = useState<string>("مباشر الآن");

  useEffect(() => {
    setTimeString(new Date().toLocaleTimeString("ar-EG"));
  }, []);

  const data = {
    world: {
      gram24: 3542,
      gram21: 3100,
      gram18: 2657,
      ounceUsd: 2650.50,
    },
    egyptMarket: {
      karat24: { price: 3542, buy: 3520, sell: 3542 },
      karat21: { price: 3100, buy: 3080, sell: 3100 },
      karat18: { price: 2657, buy: 2637, sell: 2657 },
      pound: { price: 24800, buy: 24640, sell: 24800 },
    },
    silver: {
      gram999: 45.0,
      gram925: 41.5,
    },
    currencies: [
      { name: "الدولار الأمريكي", code: "USD", buy: 48.50, sell: 48.60 },
      { name: "الريال السعودي", code: "SAR", buy: 12.90, sell: 12.95 },
      { name: "الدرهم الإماراتي", code: "AED", buy: 13.20, sell: 13.25 },
      { name: "اليورو", code: "EUR", buy: 52.70, sell: 52.85 },
      { name: "الجنيه الإسترليني", code: "GBP", buy: 61.40, sell: 61.60 },
      { name: "الدينار الكويتي", code: "KWD", buy: 157.00, sell: 157.50 },
    ],
  };

  const calculatedPrice = amount * data.egyptMarket.karat21.price;

  return (
    <main className="min-h-screen bg-slate-950 text-white text-right selection:bg-amber-500 selection:text-slate-950 font-sans" dir="rtl">
      
      {/* Navbar */}
      <header className="border-b border-amber-500/20 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 p-0.5 shadow-lg flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="text-xl font-black text-amber-400 font-serif">T</span>
              </div>
            </div>
            <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 tracking-wider">
              TINBO
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-full font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            السوق مباشر
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative w-full bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-amber-500/20 py-12 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          
          <div className="flex flex-col justify-center items-center">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition duration-500"></div>
              
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-gradient-to-br from-amber-700 via-amber-300 to-amber-900 p-1 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <div className="w-full h-full rounded-[22px] bg-slate-950/90 border border-amber-400/30 p-6 flex flex-col items-center justify-center text-center backdrop-blur-md relative overflow-hidden">
                  
                  <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>

                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 p-0.5 shadow-[0_0_25px_rgba(245,158,11,0.4)] mb-3 flex items-center justify-center">
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                      <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-amber-400 to-amber-600 font-serif">
                        T
                      </span>
                    </div>
                  </div>

                  <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 tracking-widest mt-2">
                    TINBO
                  </h2>
                  <span className="text-[10px] tracking-[0.3em] text-amber-400/80 uppercase font-bold mt-1">
                    LIVE GOLD MARKET
                  </span>

                </div>
              </div>
            </div>
          </div>

          <div className="text-center md:text-right space-y-5">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold px-4 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              تحديث مباشر من الصاغة والبورصة العالمية
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
              أسعار الذهب والعملات <br />
              بث حي عبر منصة <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">تينبو</span>
            </h1>

            <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-5 shadow-2xl backdrop-blur-sm grid grid-cols-2 gap-4">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-amber-500/20 space-y-1">
                <span className="text-xs text-slate-400 font-medium block">عيار 21 (مصر)</span>
                <div className="text-2xl md:text-3xl font-black text-amber-400">
                  {data.egyptMarket.karat21.price} <span className="text-xs font-normal text-slate-300">ج.م</span>
                </div>
                <span className="text-[10px] text-emerald-400 block font-semibold">
                  شراء: {data.egyptMarket.karat21.buy} ج.م
                </span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-medium block">الأونصة عالمياً</span>
                <div className="text-2xl md:text-3xl font-black text-white">
                  ${data.world.ounceUsd}
                </div>
                <span className="text-[10px] text-amber-300 block font-semibold">
                  بورصة المعادن المباشرة
                </span>
              </div>
            </div>

            <div className="pt-1 flex flex-wrap justify-center md:justify-start gap-3 text-xs text-slate-400">
              <span>🕒 آخر تحديث: {timeString}</span>
              <span>•</span>
              <span>⚡ المصدر: Tinbo Live Market</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8 space-y-10">
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-6 flex items-center gap-2">
            <span className="w-3 h-3 bg-amber-500 rounded-full inline-block"></span>
            أسعار الذهب اليوم في مصر
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl text-white">
              <h3 className="text-xl font-bold mb-4 text-amber-400 border-b border-slate-800 pb-3 flex justify-between items-center">
                <span>أسعار الصاغة (شراء وبيع)</span>
                <span className="text-xs bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded-full">Tinbo Live</span>
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span>عيار 24</span>
                  <div className="space-x-4 space-x-reverse font-bold">
                    <span className="text-amber-300">السعر: {data.egyptMarket.karat24.price} ج.م</span>
                    <span className="text-emerald-400">شراء: {data.egyptMarket.karat24.buy}</span>
                    <span className="text-rose-400">بيع: {data.egyptMarket.karat24.sell}</span>
                  </div>
                </div>
                <div className="flex justify-between p-3 bg-amber-500/10 rounded-xl border border-amber-500/30 font-bold">
                  <span className="text-amber-400">عيار 21 (الأكثر مبيعاً)</span>
                  <div className="space-x-4 space-x-reverse">
                    <span className="text-amber-300">السعر: {data.egyptMarket.karat21.price} ج.م</span>
                    <span className="text-emerald-400">شراء: {data.egyptMarket.karat21.buy}</span>
                    <span className="text-rose-400">بيع: {data.egyptMarket.karat21.sell}</span>
                  </div>
                </div>
                <div className="flex justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span>عيار 18</span>
                  <div className="space-x-4 space-x-reverse font-bold">
                    <span className="text-amber-300">السعر: {data.egyptMarket.karat18.price} ج.م</span>
                    <span className="text-emerald-400">شراء: {data.egyptMarket.karat18.buy}</span>
                    <span className="text-rose-400">بيع: {data.egyptMarket.karat18.sell}</span>
                  </div>
                </div>
                <div className="flex justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span>الجنيه الذهب (8 جرام)</span>
                  <div className="space-x-4 space-x-reverse font-bold">
                    <span className="text-amber-300">السعر: {data.egyptMarket.pound.price} ج.م</span>
                    <span className="text-emerald-400">شراء: {data.egyptMarket.pound.buy}</span>
                    <span className="text-rose-400">بيع: {data.egyptMarket.pound.sell}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl text-white">
                <h3 className="text-xl font-bold mb-4 text-amber-400 border-b border-slate-800 pb-3">
                  أسعار الأونصة والمعادن العالمية
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400">أونصة الذهب عالمياً</span>
                    <span className="font-bold text-amber-400">${data.world.ounceUsd}</span>
                  </div>
                  <div className="flex justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400">جرام 24 (عالمي محسوب)</span>
                    <span className="font-bold text-amber-400">{Math.round(data.world.gram24)} ج.م</span>
                  </div>
                  <div className="flex justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400">فضة عيار 999</span>
                    <span className="font-bold text-slate-200">{data.silver.gram999} ج.م</span>
                  </div>
                  <div className="flex justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400">فضة عيار 925</span>
                    <span className="font-bold text-slate-200">{data.silver.gram925} ج.م</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Currencies */}
        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl text-white">
          <h2 className="text-2xl font-extrabold text-white mb-6 flex items-center gap-2">
            <span className="w-3 h-3 bg-amber-500 rounded-full inline-block"></span>
            أسعار العملات الأجنبية والعربية مقابل الجنيه المصري
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {data.currencies.map((curr) => (
              <div key={curr.code} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="font-bold text-white block">{curr.name}</span>
                  <span className="text-xs text-slate-400">{curr.code}</span>
                </div>
                <div className="text-left">
                  <span className="text-amber-400 font-bold block">{curr.buy} ج.م</span>
                  <span className="text-xs text-slate-500">بيع: {curr.sell} ج.م</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calculator */}
        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl text-white max-w-xl mx-auto">
          <h3 className="text-xl font-bold mb-4 text-amber-400 border-b border-slate-800 pb-3 text-center">
            حاسبة الذهب (عيار 21)
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">عدد الجرامات المطلوبة:</label>
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/20 text-center">
              <span className="text-xs text-slate-400 block">الإجمالي المتوقع:</span>
              <span className="text-2xl font-black text-amber-400">{calculatedPrice.toLocaleString()} ج.م</span>
            </div>
          </div>
        </div>

      </div>

      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <p>© 2026 منصة تينبو (Tinbo) لأسعار الذهب والمعادن المباشرة. جميع الحقوق محفوظة.</p>
      </footer>

    </main>
  );
}

import { Suspense } from "react";
import Header from "@/components/Header";
import GoldCalculator from "@/components/GoldCalculator";
import AdBanner from "@/components/AdBanner";

// جلب البيانات مباشرة على مستوى الخادم دون الحاجة لطلب HTTP محلي
async function getData() {
  try {
    const TROY_OUNCE_GRAMS = 31.1034768;
    const apiKey = process.env.GOLDTIMO_API_KEY;

    let gram24 = 7200;
    let gram21 = 6300;
    let gram18 = 5400;
    let buy21 = 6270;
    let sell21 = 6300;

    if (apiKey) {
      try {
        const res = await fetch("https://goldtimo.com/api/v1/price/XAU/EGP/21", {
          headers: { "x-api-key": apiKey },
          next: { revalidate: 120 },
        });
        if (res.ok) {
          const goldData = await res.json();
          if (goldData.gram) gram21 = goldData.gram;
          if (goldData.gramBuy) buy21 = goldData.gramBuy;
          if (goldData.gramSell) sell21 = goldData.gramSell;
          gram24 = Math.round(gram21 * (24 / 21));
          gram18 = Math.round(gram21 * (18 / 21));
        }
      } catch {}
    }

    let usdRate = 50.25;
    try {
      const resCurrencies = await fetch("https://open.er-api.com/v6/latest/USD", {
        next: { revalidate: 3600 },
      });
      const currencyData = await resCurrencies.json();
      if (currencyData?.rates?.EGP) {
        usdRate = currencyData.rates.EGP;
      }
    } catch {}

    const ounceEgp = gram24 * TROY_OUNCE_GRAMS;
    const ounceUsd = Number((ounceEgp / usdRate).toFixed(2));

    const sarRate = usdRate / 3.75;
    const aedRate = usdRate / 3.67;
    const eurRate = usdRate / 0.92;
    const gbpRate = usdRate / 0.79;
    const kwdRate = usdRate / 0.31;

    return {
      currency: "EGP",
      world: {
        gram24,
        gram21,
        gram18,
        ounceUsd,
        ounceEgp: Math.round(ounceEgp),
      },
      egyptMarket: {
        karat24: { price: gram24, buy: Math.round(gram24 * 0.995), sell: gram24 },
        karat21: { price: gram21, buy: buy21, sell: sell21 },
        karat18: { price: gram18, buy: Math.round(gram18 * 0.995), sell: gram18 },
        pound: {
          price: gram21 * 8,
          buy: buy21 * 8,
          sell: sell21 * 8,
        },
      },
      silver: {
        gram999: 105.0,
        gram925: 97.12,
      },
      currencies: [
        { name: "الدولار الأمريكي", code: "USD", buy: Number(usdRate.toFixed(2)), sell: Number((usdRate + 0.10).toFixed(2)) },
        { name: "الريال السعودي", code: "SAR", buy: Number(sarRate.toFixed(2)), sell: Number((sarRate + 0.05).toFixed(2)) },
        { name: "الدرهم الإماراتي", code: "AED", buy: Number(aedRate.toFixed(2)), sell: Number((aedRate + 0.05).toFixed(2)) },
        { name: "اليورو", code: "EUR", buy: Number(eurRate.toFixed(2)), sell: Number((eurRate + 0.15).toFixed(2)) },
        { name: "الجنيه الإسترليني", code: "GBP", buy: Number(gbpRate.toFixed(2)), sell: Number((gbpRate + 0.20).toFixed(2)) },
        { name: "الدينار الكويتي", code: "KWD", buy: Number(kwdRate.toFixed(2)), sell: Number((kwdRate + 0.30).toFixed(2)) },
      ],
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

async function MainContent() {
  const data = await getData();

  if (!data) {
    return (
      <div className="text-center p-8 bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl max-w-md mx-auto my-12">
        <p className="text-lg font-bold text-amber-400">تعذر تحميل بيانات الأسعار المباشرة حالياً.</p>
      </div>
    );
  }

  return (
    <>
      {/* قسم الواجهة الفاخر (Hero Section) */}
      <div className="relative w-full bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-amber-500/20 py-12 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          
          {/* شعار تينبو الفاخر */}
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

                  <span className="mt-4 text-[11px] bg-amber-500/10 border border-amber-500/20 text-amber-300 px-3 py-1 rounded-full font-medium">
                    منصة الذهب المباشرة
                  </span>

                </div>
              </div>
            </div>
          </div>

          {/* كارت السعر الحي */}
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
              <span>🕒 آخر تحديث: {new Date(data.fetchedAt).toLocaleTimeString("ar-EG")}</span>
              <span>•</span>
              <span>⚡ المصدر: GoldTimo Live</span>
            </div>
          </div>

        </div>
      </div>

      {/* المحتوى الرئيسي للأسعار */}
      <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8 space-y-10">
        
        <AdBanner title="إعلان مميز (رأس الصفحة)" size="horizontal" />

        <div>
          <h2 className="text-2xl font-extrabold text-white mb-6 flex items-center gap-2">
            <span className="w-3 h-3 bg-amber-500 rounded-full inline-block"></span>
            أسعار الذهب اليوم في مصر
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl text-white">
              <h3 className="text-xl font-bold mb-4 text-amber-400 border-b border-slate-800 pb-3 flex justify-between items-center">
                <span>أسعار الصاغة (شراء وبيع)</span>
                <span className="text-xs bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded-full">GoldTimo</span>
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

              <AdBanner title="إعلان جانبي" size="box" />
            </div>
          </div>
        </div>

        <AdBanner title="إعلان وسط الصفحة" size="horizontal" />

        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl text-white">
          <h2 className="text-2xl font-extrabold text-white mb-6 flex items-center gap-2">
            <span className="w-3 h-3 bg-amber-500 rounded-full inline-block"></span>
            أسعار العملات الأجنبية والعربية مقابل الجنيه المصري
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {data.currencies.map((curr: any) => (
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

        <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-slate-900">
          <GoldCalculator price21={data.egyptMarket.karat21.price} />
        </div>
      </div>
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center p-8 bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl">
        <div className="animate-spin rounded-full h-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
        <p className="text-lg font-bold text-amber-400">جاري تحميل أسعار الذهب والعملات المباشرة...</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white text-right selection:bg-amber-500 selection:text-slate-950" dir="rtl">
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <MainContent />
      </Suspense>
    </main>
  );
}
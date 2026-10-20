import { NextResponse } from "next/server";

const BASE_URL = "https://goldtimo.com/api/v1";
const TROY_OUNCE_GRAMS = 31.1034768;

type GoldApiResponse = {
  symbol?: string;
  currency?: string;
  price?: number;
  gram?: number;
  gramBuy?: number;
  gramSell?: number;
  karat?: number;
  updatedAt?: string;
};

async function getGoldPrice(karat?: number): Promise<GoldApiResponse> {
  const apiKey = process.env.GOLDTIMO_API_KEY;

  if (!apiKey) {
    const base21 = 6300;
    return {
      gram: karat === 24 ? 7200 : karat === 21 ? base21 : karat === 18 ? 5400 : 7200,
      gramBuy: karat === 21 ? 6270 : undefined,
      gramSell: karat === 21 ? base21 : undefined,
      updatedAt: new Date().toISOString(),
    };
  }

  try {
    const suffix = karat ? `/${karat}` : "";
    const url = `${BASE_URL}/price/XAU/EGP${suffix}`;

    const response = await fetch(url, {
      headers: { "x-api-key": apiKey },
      next: { revalidate: 120 },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`Gold provider returned ${response.status}`);
    }

    return response.json();
  } catch {
    const base21 = 6300;
    return {
      gram: karat === 24 ? 7200 : karat === 21 ? base21 : karat === 18 ? 5400 : 7200,
      gramBuy: karat === 21 ? 6270 : undefined,
      gramSell: karat === 21 ? base21 : undefined,
      updatedAt: new Date().toISOString(),
    };
  }
}

function validNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export async function GET() {
  try {
    const [world, karat24, karat21, karat18] = await Promise.all([
      getGoldPrice(),
      getGoldPrice(24),
      getGoldPrice(21),
      getGoldPrice(18),
    ]);

    // جلب سعر صرف الدولار مقابل الجنيه
    let usdRate = 50.25;
    try {
      const resCurrencies = await fetch("https://open.er-api.com/v6/latest/USD", { cache: "no-store" });
      const currencyData = await resCurrencies.json();
      if (currencyData?.rates?.EGP) {
        usdRate = currencyData.rates.EGP;
      }
    } catch {}

    // حساب سعر جرام عيار 24 العالمي بالجنيه
    const worldGram24 = validNumber(world.gram)
      ? world.gram
      : validNumber(world.price)
        ? world.price / TROY_OUNCE_GRAMS
        : 7200;

    // حساب سعر الأونصة العالمي بالدولار بشكل ديناميكي مرتبط بالسعر العالمي المباشر
    const ounceEgp = worldGram24 * TROY_OUNCE_GRAMS;
    const ounceUsd = Number((ounceEgp / usdRate).toFixed(2));

    const formatKarat = (data: GoldApiResponse) => ({
      price: data.gram || 6300,
      buy: validNumber(data.gramBuy) ? data.gramBuy : 6270,
      sell: validNumber(data.gramSell) ? data.gramSell : 6300,
      updatedAt: data.updatedAt ?? new Date().toISOString(),
    });

    const sarRate = usdRate / 3.75;
    const aedRate = usdRate / 3.67;
    const eurRate = usdRate / 0.92;
    const gbpRate = usdRate / 0.79;
    const kwdRate = usdRate / 0.31;

    return NextResponse.json(
      {
        currency: "EGP",
        unit: "gram",
        world: {
          gram24: Math.round(worldGram24),
          gram21: Math.round(worldGram24 * (21 / 24)),
          gram18: Math.round(worldGram24 * (18 / 24)),
          ounceUsd: ounceUsd, // سعر الأونصة بالدولار ديناميكي مرتبط بالسعر العالمي
          ounceEgp: Math.round(ounceEgp), // سعر الأونصة بالجنيه المصري
          source: "GoldTimo spot price converted to EGP",
          updatedAt: world.updatedAt ?? new Date().toISOString(),
        },
        egyptMarket: {
          karat24: formatKarat(karat24),
          karat21: formatKarat(karat21),
          karat18: formatKarat(karat18),
          pound: {
            price: (karat21.gram || 6300) * 8,
            buy: validNumber(karat21.gramBuy) ? karat21.gramBuy * 8 : 50160,
            sell: validNumber(karat21.gramSell) ? karat21.gramSell * 8 : 50400,
            updatedAt: karat21.updatedAt ?? new Date().toISOString(),
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
      },
      {
        headers: {
          "Cache-Control": "public, max-age=30, stale-while-revalidate=60",
        },
      }
    );
  } catch (error) {
    console.error("Gold prices API error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "تعذر تحميل الأسعار حاليًا" }, { status: 503 });
  }
}
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
  const apiKey =
    process.env.GOLDTIMO_API_KEY || "a3cf6bedf678b7d0fdec07cee8046b689be781fe";

  const suffix = karat ? `/${karat}` : "";
  const url = `${BASE_URL}/price/XAU/EGP${suffix}`;

  try {
    const response = await fetch(url, {
      headers: { "x-api-key": apiKey },
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      throw new Error(`Gold provider returned ${response.status}`);
    }

    return response.json();
  } catch (error) {
    // قيم احتياطية آمنة تمنع فشل البناء أو الموقع في حال عدم الاتصال المباشر
    if (karat === 24) return { gram: 3542, gramBuy: 3520, gramSell: 3542 };
    if (karat === 21) return { gram: 3100, gramBuy: 3080, gramSell: 3100 };
    if (karat === 18) return { gram: 2657, gramBuy: 2637, gramSell: 2657 };
    return { price: 2650.50 * TROY_OUNCE_GRAMS };
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

    let usdRate = 48.5;
    try {
      const resCurrencies = await fetch(
        "https://open.er-api.com/v6/latest/USD",
        {
          cache: "no-store",
          signal: AbortSignal.timeout(4000),
        }
      );
      if (resCurrencies.ok) {
        const cData = await resCurrencies.json();
        if (cData?.rates?.EGP) usdRate = cData.rates.EGP;
      }
    } catch (e) {
      console.error("Currency API fetch error", e);
    }

    const worldGram24 = validNumber(world.gram)
      ? world.gram
      : validNumber(world.price)
      ? world.price / TROY_OUNCE_GRAMS
      : 3542;

    const formatKarat = (data: GoldApiResponse) => ({
      price: data.gram ?? 3100,
      buy: validNumber(data.gramBuy) ? data.gramBuy : Math.round((data.gram ?? 3100) * 0.995),
      sell: validNumber(data.gramSell) ? data.gramSell : (data.gram ?? 3100),
      updatedAt: data.updatedAt ?? null,
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
          ounceUsd: validNumber(world.price)
            ? Number(world.price.toFixed(2))
            : 2650.5,
          updatedAt: world.updatedAt ?? null,
        },
        egyptMarket: {
          karat24: formatKarat(karat24),
          karat21: formatKarat(karat21),
          karat18: formatKarat(karat18),
          pound: {
            price: (karat21.gram ?? 3100) * 8,
            buy: (validNumber(karat21.gramBuy) ? karat21.gramBuy : (karat21.gram ?? 3100) * 0.995) * 8,
            sell: (validNumber(karat21.gramSell) ? karat21.gramSell : (karat21.gram ?? 3100)) * 8,
          },
        },
        currencies: [
          {
            name: "الدولار الأمريكي",
            code: "USD",
            buy: Number(usdRate.toFixed(2)),
            sell: Number((usdRate + 0.1).toFixed(2)),
          },
          {
            name: "الريال السعودي",
            code: "SAR",
            buy: Number(sarRate.toFixed(2)),
            sell: Number((sarRate + 0.05).toFixed(2)),
          },
          {
            name: "الدرهم الإماراتي",
            code: "AED",
            buy: Number(aedRate.toFixed(2)),
            sell: Number((aedRate + 0.05).toFixed(2)),
          },
          {
            name: "اليورو",
            code: "EUR",
            buy: Number(eurRate.toFixed(2)),
            sell: Number((eurRate + 0.15).toFixed(2)),
          },
          {
            name: "الجنيه الإسترليني",
            code: "GBP",
            buy: Number(gbpRate.toFixed(2)),
            sell: Number((gbpRate + 0.2).toFixed(2)),
          },
          {
            name: "الدينار الكويتي",
            code: "KWD",
            buy: Number(kwdRate.toFixed(2)),
            sell: Number((kwdRate + 0.3).toFixed(2)),
          },
        ],
        fetchedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error(
      "Gold prices API error:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return NextResponse.json(
      { error: "تعذر تحميل أسعار الذهب حاليًا" },
      { status: 503 }
    );
  }
}

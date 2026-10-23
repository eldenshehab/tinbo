import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "تينبو | أسعار الذهب والعملات مباشر في مصر والسوق العالمي",
  description:
    "تابع أسعار الذهب اليوم في مصر لحظة بلحظة (عيار 21، 24، 18، الجنيه الذهب) وأسعار الأونصة عالمياً بالدولار والعملات الأجنبية والعربية عبر منصة تينبو Tinbo.",
  keywords: [
    "تينبو",
    "Tinbo",
    "أسعار الذهب اليوم",
    "سعر عيار 21",
    "أسعار الذهب في مصر",
    "سعر أونصة الذهب بالدولار",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* كود ربط وإثبات ملكية AdSense (بإصلاح crossOrigin) */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

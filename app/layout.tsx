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
  other: {
    "google-adsense-account" content="ca-pub-5254909861669174",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5254909861669174"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

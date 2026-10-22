import type { Metadata } from "next";
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
    "أسعار العملات اليوم",
    "سعر الدولار اليوم في مصر",
  ],
  authors: [{ name: "Tinbo Team" }],
  openGraph: {
    title: "تينبو | أسعار الذهب والعملات مباشر",
    description:
      "تحديث حي ومباشر لأسعار الذهب في الصاغة المصرية والبورصة العالمية وأسعار العملات.",
    url: "https://tinbo.vercel.app",
    siteName: "Tinbo",
    locale: "ar_EG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}

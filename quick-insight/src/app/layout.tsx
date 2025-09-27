import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Quick Insight - Новости и инсайты",
    template: "%s | Quick Insight"
  },
  description: "Получайте актуальные новости и инсайты в удобном формате. Категории: политика, наука, история, исследования.",
  keywords: ["новости", "инсайты", "политика", "наука", "история", "исследования", "telegram", "мини-приложение"],
  authors: [{ name: "Quick Insight Team" }],
  creator: "Quick Insight",
  publisher: "Quick Insight",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://quick-insight.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://quick-insight.vercel.app",
    title: "Quick Insight - Новости и инсайты",
    description: "Получайте актуальные новости и инсайты в удобном формате",
    siteName: "Quick Insight",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Quick Insight - Новости и инсайты",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quick Insight - Новости и инсайты",
    description: "Получайте актуальные новости и инсайты в удобном формате",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "news",
  classification: "News and Insights",
  referrer: "origin-when-cross-origin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={onest.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2E3247" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Quick Insight" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Quick Insight" />
      </head>
      <body className="font-onest antialiased bg-main-gradient min-h-screen">
        {children}
      </body>
    </html>
  );
}

import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Fonts
const soriaFont = localFont({
  src: "../public/soria-font.ttf",
  variable: "--font-soria",
});

const vercettiFont = localFont({
  src: "../public/Vercetti-Regular.woff",
  variable: "--font-vercetti",
});

// Metadata
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shaik Tajmahaboob Subhan",
    template: "%s | Taj Subhan",
  },
  icons: {
    icon: "/favicon.png",
  },
  description:
    "UI/UX Designer & MERN Stack Developer specializing in user-focused design and scalable web applications.",
  keywords:
    "Shaik Tajmahaboob Subhan, UI UX Designer, Frontend Developer, MERN Stack Developer, React Developer, Figma Designer, Web Developer Portfolio",
  authors: [{ name: "Shaik Tajmahaboob Subhan" }],
  creator: "Shaik Tajmahaboob Subhan",
  publisher: "Shaik Tajmahaboob Subhan",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Shaik Tajmahaboob Subhan | UI/UX & MERN Developer",
    description:
      "Portfolio of a UI/UX Designer & MERN Stack Developer building intuitive user experiences and scalable web applications.",
    url: siteUrl,
    siteName: "Taj Subhan Portfolio",
    images: ["/opengraph-image.png"],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Shaik Tajmahaboob Subhan | UI/UX & Frontend Developer",
    description:
      "Designing user-first interfaces and building scalable web applications.",
    images: ["/opengraph-image.png"],
  },

  verification: {
    google: "",
  },
};

// Viewport
export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

// Root Layout (VERY IMPORTANT)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overscroll-y-none">
      <body
        className={`${soriaFont.variable} ${vercettiFont.variable} font-sans antialiased`}
      >
        {children}

        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-7WD4HM3XRE" />
      </body>
    </html>
  );
}

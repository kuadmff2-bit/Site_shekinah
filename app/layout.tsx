import type { Metadata } from "next";
import AnalyticsConsent from "./analytics-consent";
import FooterContact from "./footer-contact";
import "./globals.css";
import "./site-hardening.css";
import "./footer-legal.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://site-shekinah.kuadmff2.workers.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Centro de Ensino Shekinah",
  title: {
    default: "Centro de Ensino Shekinah | Cursos e Pré-matrícula",
    template: "%s | Centro de Ensino Shekinah",
  },
  description:
    "Cursos presenciais no Centro de Ensino Shekinah. Conheça as opções, monte seu combo e envie sua pré-matrícula diretamente pelo WhatsApp.",
  keywords: [
    "Centro de Ensino Shekinah",
    "cursos presenciais",
    "informática",
    "inglês kids",
    "gestão empresarial",
    "reforço escolar",
    "EJA",
    "Barreirinha",
    "Amazonas",
  ],
  category: "education",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Centro de Ensino Shekinah | Cursos e Pré-matrícula",
    description:
      "Conhecimento hoje, conquistas para sempre. Conheça nossos cursos e faça sua pré-matrícula pelo WhatsApp.",
    type: "website",
    locale: "pt_BR",
    siteName: "Centro de Ensino Shekinah",
    url: "/",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 628,
        alt: "Centro de Ensino Shekinah — Conhecimento hoje, conquistas para sempre.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Centro de Ensino Shekinah | Cursos e Pré-matrícula",
    description: "Conheça nossos cursos e faça sua pré-matrícula pelo WhatsApp.",
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/shekinah-shield.png", type: "image/png" }],
    shortcut: "/shekinah-shield.png",
    apple: "/shekinah-shield.png",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <FooterContact />
        <AnalyticsConsent />
      </body>
    </html>
  );
}

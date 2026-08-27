import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://centro-shekinah.kuadmff2.chatgpt.site"),
  title: "Centro de Ensino Shekinah | Cursos e Pré-matrícula",
  description: "Conheça os cursos presenciais do Centro de Ensino Shekinah, monte seu combo e envie sua pré-matrícula pelo WhatsApp.",
  openGraph: {
    title: "Centro de Ensino Shekinah",
    description: "Conhecimento hoje, conquistas para sempre. Conheça nossos cursos e faça sua pré-matrícula.",
    type: "website",
    url: "https://centro-shekinah.kuadmff2.chatgpt.site",
    images: [
      {
        url: "https://centro-shekinah.kuadmff2.chatgpt.site/og.png",
        width: 1200,
        height: 628,
        alt: "Centro de Ensino Shekinah — Conhecimento hoje, conquistas para sempre.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Centro de Ensino Shekinah",
    description: "Conheça nossos cursos e faça sua pré-matrícula.",
    images: ["https://centro-shekinah.kuadmff2.chatgpt.site/og.png"],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Centro de Ensino Shekinah",
    short_name: "Shekinah",
    description: "Cursos presenciais e pré-matrícula pelo WhatsApp.",
    start_url: "/",
    display: "standalone",
    background_color: "#03142f",
    theme_color: "#03142f",
    lang: "pt-BR",
    icons: [
      {
        src: "/shekinah-shield.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}

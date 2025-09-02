import { useEffect } from "react";

export default function Head() {
  useEffect(() => {
    // favicon
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.href = "/favicon.ico";
    document.head.appendChild(favicon);

    // título
    const title = document.createElement("title");
    title.textContent = "Sistema de Reconocimiento Facial";
    document.head.appendChild(title);

    // tipografía Google Orbitron
    const font = document.createElement("link");
    font.rel = "stylesheet";
    font.href =
      "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap";
    document.head.appendChild(font);

    // Tailwind desde CDN (fallback)
    const tailwind = document.createElement("script");
    tailwind.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(tailwind);

    // Bootstrap Icons
    const bootstrapIcons = document.createElement("link");
    bootstrapIcons.rel = "stylesheet";
    bootstrapIcons.href =
      "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css";
    document.head.appendChild(bootstrapIcons);

    // Recharts (CDN)
    const rechartsScript = document.createElement("script");
    rechartsScript.src = "https://unpkg.com/recharts/umd/Recharts.min.js";
    rechartsScript.async = true;
    document.body.appendChild(rechartsScript);

    // PapaParse (CDN)
    const papaScript = document.createElement("script");
    papaScript.src =
      "https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js";
    papaScript.async = true;
    document.body.appendChild(papaScript);

    // Limpieza al desmontar
    return () => {
      [favicon, title, font, tailwind, bootstrapIcons].forEach((el) => {
        if (el.parentNode) el.parentNode.removeChild(el);
      });

      [rechartsScript, papaScript].forEach((el) => {
        if (el.parentNode) el.parentNode.removeChild(el);
      });
    };
  }, []);

  return null; // Solo carga scripts y estilos, no renderiza nada
}


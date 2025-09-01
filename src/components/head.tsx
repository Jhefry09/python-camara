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

    // Tailwind desde CDN (solo si quieres fallback)
    const tailwind = document.createElement("script");
    tailwind.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(tailwind);

    return () => {
      [favicon, title, font, tailwind].forEach((el) => {
        if (el.parentNode) el.parentNode.removeChild(el);
      });
    };
  }, []);

  return null;
}


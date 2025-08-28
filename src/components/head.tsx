
import { useEffect } from "react";

export default function Head() {
  useEffect(() => {
    // Link de bootstrap icons
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css";
    document.head.appendChild(link);

    // Limpieza al desmontar
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return null; // este componente solo carga scripts, no renderiza nada
}


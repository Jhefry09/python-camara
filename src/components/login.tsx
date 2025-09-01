import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Login() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCamera(true);
        setMessage("Escaneando rostro...");
      } catch (err) {
        console.error("Error al acceder a la cámara:", err);
        setHasCamera(false);
        setMessage("No se detectó cámara.");
      }
    };

    initCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative font-[Orbitron] text-white"
      style={{
        backgroundImage: `url("https://media4.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Contenido */}
      <motion.div
        className="relative z-10 flex flex-col items-center p-6 rounded-2xl bg-black/60 border border-cyan-500 shadow-[0_0_20px_rgba(0,255,255,0.6)]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl font-bold text-cyan-400 drop-shadow-lg mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Acceso Facial
        </motion.h1>

        <div className="relative w-80 h-64 border-4 border-cyan-500 rounded-xl overflow-hidden shadow-lg">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          {!hasCamera && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-red-400 font-bold">
              Cámara no disponible
            </div>
          )}
        </div>

        <motion.p
          className="mt-6 text-cyan-300 animate-pulse text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {message}
        </motion.p>
      </motion.div>
    </div>
  );
}


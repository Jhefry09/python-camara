import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface UsuarioInfo {
  usuario: string;
  descripcion: string;
  fotoBase64: string;
}

interface ResultadoDTO {
  encontrado: boolean;
  mensaje?: string;
  usuarioInfo?: UsuarioInfo;
}

export default function Login() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [message, setMessage] = useState("Iniciando cámara...");
  const [sending, setSending] = useState(false);
  const [usuarioInfo, setUsuarioInfo] = useState<UsuarioInfo | null>(null);
  const [rostroDetectado, setRostroDetectado] = useState<boolean | null>(null);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
        setHasCamera(true);
        setMessage("Escaneando rostro...");
        setTimeout(() => captureAndSend(), 500);
      } catch (err) {
        console.error("Error al acceder a la cámara:", err);
        setHasCamera(false);
        setMessage("No se detectó cámara.");
      }
    };
    initCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const leerDescripcion = (texto: string) => {
    if (!texto) return;
    const utter = new SpeechSynthesisUtterance(texto);
    utter.lang = "es-ES";
    const voces = window.speechSynthesis.getVoices();
    const lucia = voces.find(
      (v) => v.name.toLowerCase().includes("lucia") && v.lang.includes("es"),
    );
    if (lucia) utter.voice = lucia;
    utter.rate = 1;
    utter.pitch = 1.1;
    window.speechSynthesis.speak(utter);
  };

  const captureAndSend = async () => {
    if (!videoRef.current || sending) return;
    setSending(true);

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/jpeg"),
    );
    if (!blob) return;

    const formData = new FormData();
    formData.append("foto", blob, "rostro.jpg");

    try {
      const res = await fetch("http://localhost:8080/enviarFoto", {
        method: "POST",
        body: formData,
      });
      const data: ResultadoDTO = await res.json();
      setRostroDetectado(data.encontrado);

      if (data.encontrado && data.usuarioInfo) {
        setUsuarioInfo(data.usuarioInfo);
        setMessage(`Rostro detectado: ${data.usuarioInfo.usuario}`);
        setSending(false);
        leerDescripcion(data.usuarioInfo.descripcion);

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      } else {
        const errorMsg = data.mensaje || "Rostro no detectado";
        setMessage(`${errorMsg} - Reintentando...`);
        setUsuarioInfo(null);
        setSending(false);
        setTimeout(captureAndSend, 1000);
      }
    } catch (err) {
      console.error("Error al enviar foto:", err);
      setMessage("Error al enviar la foto - Reintentando...");
      setRostroDetectado(false);
      setSending(false);
      setTimeout(captureAndSend, 1000);
    }
  };

  return (
    <div>
      <motion.div
        className="flex flex-col items-center justify-start gap-8 p-6 rounded-3xl border border-cyan-500 shadow-[0_0_50px_rgba(0,255,255,0.9)] bg-black/95"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Título arriba */}
        <h1 className="text-3xl font-bold text-indigo-200 text-center mb-4 drop-shadow-[0_0_10px_cyan]">
          Iniciando reconocimiento facial...
        </h1>

        {/* Contenedor horizontal video + usuario */}
        <div className="flex flex-row items-start gap-10">
          {/* Panel de video */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-80 h-64 border-4 border-cyan-500 rounded-xl overflow-hidden shadow-[0_0_25px_rgba(0,255,255,0.7)]">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Overlay de escaneo animado */}

              {/* Overlay de escaneo animado */}

              {/* Overlay de escaneo animado */}
              <motion.div
                className="absolute left-0 w-full h-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee,0_0_40px_#22d3ee]"
                initial={{ top: 0 }}
                animate={{ top: "100%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                }}
              />

              {/* Estado de cámara */}
              {!hasCamera && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-red-400 font-bold">
                  Cámara no disponible
                </div>
              )}
            </div>

            <motion.p
              className={`mt-2 text-lg animate-pulse ${
                rostroDetectado === null
                  ? "text-cyan-300"
                  : rostroDetectado
                    ? "text-green-400"
                    : "text-red-400"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {rostroDetectado === null
                ? message
                : rostroDetectado
                  ? "Rostro detectado ✅"
                  : "Rostro no detectado ❌"}
            </motion.p>

            {sending && (
              <motion.p className="text-yellow-300 mt-2 animate-pulse">
                Enviando datos...
              </motion.p>
            )}
          </div>

          {/* Panel usuario detectado a la derecha del video */}
          {usuarioInfo && rostroDetectado && (
            <motion.div
              className="flex flex-col items-center border-4 border-pink-500 rounded-2xl p-4 w-60 shadow-[0_0_35px_rgba(255,0,255,0.7)]"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <img
                src={`data:image/jpeg;base64,${usuarioInfo.fotoBase64}`}
                alt="Rostro detectado"
                className="w-40 h-40 object-cover rounded-xl border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.7)]"
              />
              <p className="text-pink-400 mt-2 font-bold text-lg text-center">
                {usuarioInfo.usuario}
              </p>
              <p className="text-pink-300 text-sm text-center">
                {usuarioInfo.descripcion}
              </p>
              <button
                className="mt-2 px-4 py-2 bg-pink-500 text-black rounded hover:bg-pink-400 transition"
                onClick={() => leerDescripcion(usuarioInfo.descripcion)}
              >
                Repetir descripción
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

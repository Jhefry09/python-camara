
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
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
        setHasCamera(true);
        setMessage("Escaneando rostro...");
        setTimeout(() => captureAndSend(), 500); // Primer escaneo
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

  // Función para leer en voz alta la descripción
  

const leerDescripcion = (texto: string) => {
  if (!texto) return;

  const utter = new SpeechSynthesisUtterance(texto);
  utter.lang = "es-ES"; // español de España

  // Buscar la voz Lucia
  const voces = window.speechSynthesis.getVoices();
  const lucia = voces.find(v => v.name.toLowerCase().includes("lucia") && v.lang.includes("es"));

  if (lucia) {
    utter.voice = lucia;
  }

  utter.rate = 1;    // velocidad normal
  utter.pitch = 1.1; // tono un poquito más natural

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
      canvas.toBlob((b) => resolve(b), "image/jpeg")
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
      console.log("Respuesta backend:", data);

      setRostroDetectado(data.encontrado); // true o false según backend

      if (data.encontrado && data.usuarioInfo) {
        setUsuarioInfo(data.usuarioInfo);
        setMessage(`Rostro detectado: ${data.usuarioInfo.usuario}, ${data.usuarioInfo.descripcion}`);
        setSending(false);

        // Leer la descripción automáticamente
        leerDescripcion(data.usuarioInfo.descripcion);

        setTimeout(() => {
          window.location.href = "/dashboard"; // Ajusta según tu ruta
        }, 5000);
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
    <div
      className="min-h-screen flex flex-col items-center justify-center relative font-[Orbitron] text-white"
      style={{
        backgroundImage: `url("https://media4.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

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

        {/* Mostrar rostro detectado */}
        {usuarioInfo && rostroDetectado && (
          <motion.div
            className="mt-4 flex flex-col items-center border-4 border-cyan-500 rounded-xl overflow-hidden p-2 w-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={`data:image/jpeg;base64,${usuarioInfo.fotoBase64}`}
              alt="Rostro detectado"
              className="w-40 h-40 object-cover rounded-xl"
            />
            <p className="text-cyan-300 mt-2 font-bold text-lg">{usuarioInfo.usuario}</p>
            <p className="text-cyan-200 text-sm">{usuarioInfo.descripcion}</p>

            {/* Botón para repetir lectura de descripción */}
            <button
              className="mt-2 px-4 py-2 bg-cyan-500 text-black rounded hover:bg-cyan-400 transition"
              onClick={() => leerDescripcion(usuarioInfo.descripcion)}
            >
              Repetir descripción
            </button>
          </motion.div>
        )}

        <motion.p
          className={`mt-6 text-lg animate-pulse ${
            rostroDetectado === null
              ? "text-cyan-300"
              : rostroDetectado
              ? "text-green-400"
              : "text-red-400"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
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
      </motion.div>
    </div>
  );
}


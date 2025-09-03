
import { useState, useEffect, useRef } from "react";
import { Nanvar } from '../../components/nanvar';
import "./page.css";

export default function Registro() {
  const [correo, setCorreo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [botonesHabilitados, setBotonesHabilitados] = useState(false);
  const [mostrarCamara, setMostrarCamara] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const todosLlenos =
      correo.trim() !== "" &&
      usuario.trim() !== "" &&
      descripcion.trim() !== "";
    setBotonesHabilitados(todosLlenos);
  }, [correo, usuario, descripcion]);

  const handleCancelar = () => {
    setCorreo("");
    setUsuario("");
    setDescripcion("");
    setMostrarCamara(false);
    setMensaje(null);
  };

  const iniciarCamara = async () => {
    try {
      setMostrarCamara(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      setMensaje("⚠️ No se pudo acceder a la cámara");
    }
  };

  const capturarFoto = async () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      ctx?.drawImage(videoRef.current, 0, 0);

      const dataURL = canvasRef.current.toDataURL("image/jpeg");

      try {
        const response = await fetch("http://localhost:8080/registrando/guardar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ correo, usuario, descripcion, fotoBase64: dataURL }),
        });

        const data = await response.json();
        if (response.ok && data.success) {
          setMensaje(`${data.mensaje || "Usuario registrado con éxito"}`);
          handleCancelar();
        } else {
          setMensaje(`${data.mensaje || "Error al registrar"}`);
        }
      } catch {
        setMensaje("⚠️ Error de conexión con el servidor");
      }
    }
  };

  return (

<div className="futuristic-bg">
    <div>
    <Nanvar/>
    </div>
  <div className="background-gif"></div>
  <div className="overlay"></div>

  {/* Contenedor en dos columnas */}
  <div className="registro-layout">
    {/* Card principal */}
    <div className="registro-card">
      <h2 className="title-glow">🚀 REGISTRO DE USUARIOS</h2>

      <input
        type="email"
        placeholder="📧 CORREO"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        className="input-glass"
      />

      <input
        type="text"
        placeholder="👤 NOMBRE DE USUARIO"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        className="input-glass"
      />

      <textarea
        placeholder="📖 DESCRÍBETE..."
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="input-glass"
      />

      <button
        disabled={!botonesHabilitados}
        onClick={iniciarCamara}
        className={`btn-glow ${!botonesHabilitados ? "disabled" : ""}`}
      >
        TOMAR FOTO
      </button>

      <button onClick={handleCancelar} className="btn-cancel">
        CANCELAR
      </button>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>

    {/* Cámara */}
    {mostrarCamara && (
      <div className="camera-container">
        <video ref={videoRef} autoPlay className="video-glass" />
        <canvas ref={canvasRef} style={{ display: "none" }} />
        <button onClick={capturarFoto} className="btn-capture">
          📸 CAPTURAR Y REGISTRAR
        </button>
      </div>
    )}
  </div>
</div>
  );
}


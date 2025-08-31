import { useState, useEffect } from "react";
import Head from "./head.tsx";

interface LoginResponse {
  usuario?: string;
  error?: string;
  [key: string]: any;
}

const Login = () => {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [responseData, setResponseData] = useState<LoginResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (window as any).lucide?.createIcons();
  }, [loading, mensaje]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://161.132.54.35:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ login, pass }),
      });

      const data: LoginResponse = await response.json();
      setResponseData(data);

      if (data.error) {
        setMensaje(data.error);
      } else {
        setMensaje(`✅ Bienvenido, ${data.usuario}!`);
      }
    } catch (error) {
      setMensaje("⚠️ Error al conectar con el servidor");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
  <>
    <Head/>
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-[#192e63ff]">
        Iniciar Sesión
      </h2>

      <div className="w-full relative mb-4">
        <i className="bi bi-yin-yang"></i>
        <span>icono de prueba</span>
        <input
          id="login"
          type="text"
          placeholder="Usuario"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52c3e2ff]"
          required
        />
      </div>

      <div className="w-full relative mb-4">
        <i data-lucide="lock" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"></i>
        <input
          id="pass"
          type="password"
          placeholder="Contraseña"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52c3e2ff]"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg font-semibold text-white uppercase transition-all shadow-md ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#52c3e2ff] hover:bg-[#192e63ff]"
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <i data-lucide="loader-2" className="animate-spin w-4 h-4"></i>
            Cargando...
          </span>
        ) : (
          "Entrar"
        )}
      </button>

      {mensaje && (
        <p
          className={`mt-4 text-center text-sm font-medium ${
            mensaje.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {mensaje}
        </p>
      )}

      {responseData && (
        <pre className="mt-4 p-3 bg-gray-100 rounded text-xs text-left overflow-x-auto w-full">
          {JSON.stringify(responseData, null, 2)}
        </pre>
      )}
    </form>
  </>
  );
};

export default Login;


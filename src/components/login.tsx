
// src/pages/login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    setError("");
    navigate("/construccion");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#dce7f0]">
      <div className="bg-[#dce7f0] shadow-md p-8 rounded-2xl w-96 text-center">
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 border-2 border-black rounded-full flex items-center justify-center">
            <User size={50} strokeWidth={1.5} />
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-600" />
            <input
              type="text"
              placeholder="USUARIO"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-full border border-gray-400 bg-[#97c6d8] placeholder-gray-600 focus:outline-none"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-600" />
            <input
              type="password"
              placeholder="CONTRASEÑA"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-full border border-gray-400 bg-[#97c6d8] placeholder-gray-600 focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="remember" className="w-4 h-4" />
            <label htmlFor="remember" className="text-sm text-gray-700">
              RECORDAR SESIÓN
            </label>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 rounded-full bg-[#2d9cdb] text-white font-bold shadow hover:bg-[#1b7cb9] transition"
          >
            INICIAR SESIÓN
          </button>

          <button
            type="button"
            className="w-full text-gray-600 font-medium mt-2"
          >
            CANCELAR
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-sm text-gray-500 space-y-1">
          <p className="cursor-pointer hover:underline">REGISTRARTE</p>
          <p className="cursor-pointer hover:underline">OLVIDÉ MI CONTRASEÑA</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

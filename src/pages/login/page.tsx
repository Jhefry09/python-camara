// src/pages/login/page.tsx
import Head from "../../components/head";
import FaceLogin from "../../components/login";

export default function LoginPage() {
  return (
    <>
      <Head />
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{
        backgroundImage: 'url("https://media4.giphy.com/media/QpVUMRUJGokfqXyfa1/giphy.gif")'
      }}>
        <div className="bg-[rgba(30,30,45,0.8)] p-8 rounded-2xl shadow-2xl backdrop-blur-lg">
          <h1 className="text-3xl font-bold text-indigo-200 mb-4 text-center">Iniciando reconocimiento facial...</h1>
          <FaceLogin />
        </div>
      </div>
    </>
  );
}


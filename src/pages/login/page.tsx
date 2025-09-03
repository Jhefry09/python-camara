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
          <FaceLogin />
      </div>
    </>
  );
}


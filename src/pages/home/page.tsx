
// Importamos los estilos propios de la página
import '../../styles/Home.css';

// Importamos el componente Link de react-router-dom
// para poder navegar entre las diferentes páginas (login y construcción).
import { useNavigate } from 'react-router-dom';

// Importar imagen - luego la agregas en la carpeta src/assets/
// import logo from './assets/logo-tienda.png'; 

function Home() {
  // Hook de react-router-dom que permite navegar de forma programática
  const navigate = useNavigate();

  // Función para redirigir a la página de Login
  const handleIniciarSesion = () => {
    navigate('/login'); // 👈 Navega a login/page.tsx
  };

  // Función para redirigir a la página de Construcción
  const handleRegistrarse = () => {
    navigate('/construccion'); // 👈 Navega a construccion/page.tsx
  };

  return (
    <div style={{
      backgroundColor: '#595dcbf5', // Fondo personalizado
      minHeight: '100vh', // Ocupa toda la altura de la pantalla
      display: 'flex', // Flexbox para centrar contenido
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      
      {/* ESPACIO PARA LA IMAGEN - Descomenta cuando tengas la imagen */}
      {/*
      <img 
        src={logo} 
        alt="Logo Tiendita de Don Pepe" 
        style={{
          width: '150px',
          height: '150px',
          marginBottom: '2rem',
          borderRadius: '50%',
          objectFit: 'cover',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        }}
      />
      */}

      {/* Título principal de la página */}
      <h1 style={{
        color: '#2c3e50',
        fontSize: '2.8rem',
        fontWeight: 'bold',
        marginBottom: '3rem',
        textAlign: 'center',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
      }}>
        TIENDITA DE DON PEPE
      </h1>

      {/* Contenedor de botones */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        width: '100%',
        maxWidth: '320px'
      }}>
        {/* Botón INICIAR SESIÓN */}
        <button
          onClick={handleIniciarSesion} // 👈 Navega a login/page.tsx
          style={{
            padding: '20px 35px',
            backgroundColor: '#52c3e2ff',
            color: 'white',
            border: 'none',
            borderRadius: '15px',
            cursor: 'pointer',
            fontSize: '1.4rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            boxShadow: '0 6px 12px rgba(74, 193, 202, 0.4)',
            transition: 'all 0.3s ease',
            letterSpacing: '1px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#192e63ff';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#e74c3c';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          INICIAR SESIÓN
        </button>

        {/* Botón REGISTRARSE */}
        <button
          onClick={handleRegistrarse} // 👈 Navega a construccion/page.tsx
          style={{
            padding: '20px 35px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '15px',
            cursor: 'pointer',
            fontSize: '1.4rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            boxShadow: '0 6px 12px rgba(52, 152, 219, 0.4)',
            transition: 'all 0.3s ease',
            letterSpacing: '1px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#2980b9';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#3498db';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          REGISTRARSE
        </button>
      </div>
    </div>
  );
}

export default Home;


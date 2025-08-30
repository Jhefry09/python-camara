import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState<string>('');

  const handleReconocimientoFacial = () => {
    setMensaje('Reconocimiento facial iniciado...');
    // Aquí podrías agregar la lógica real para el reconocimiento facial
    setTimeout(() => {
      setMensaje('');
    }, 3000);
  };

  const handleIniciarSesion = () => {
    navigate('/login');
  };

  const handleRegistrarse = () => {
    navigate('/construccion');
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    padding: '20px',
    backgroundColor: 'rgba(30, 30, 45, 0.8)',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(10px)',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '2em',
    margin: '0',
    color: '#a0a0ff',
    textShadow: '0 0 5px #a0a0ff',
  };

  const mainImageStyle: React.CSSProperties = {
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    width: '50%',
    maxWidth: '400px',
  };

  const actionButtonStyle: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: '1em',
    cursor: 'pointer',
    backgroundColor: '#00bcd4',
    color: 'black',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    boxShadow: '0 0 10px #00bcd4',
  };

  const backgroundStyle: React.CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'url("https://media4.giphy.com/media/QpVUMRUJGokfqXyfa1/giphy.gif") no-repeat center center fixed',
    backgroundSize: 'cover',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
  };

  return (
    <div style={backgroundStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>Tiendita de don pepe</h1>
        
        <img
          src="/imagen/imagen.png"
          alt="Una imagen de ejemplo"
          style={mainImageStyle}
        />
        
        <button
          onClick={handleReconocimientoFacial}
          style={actionButtonStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#0097a7';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#00bcd4';
          }}
        >
          Reconocimiento facial
        </button>
        {mensaje && <p>{mensaje}</p>}
        
        {/*
        <h1 style={titleStyle}>TIENDITA DE DON PEPE</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '320px' }}>
          <button
            onClick={handleIniciarSesion}
            style={{ ...actionButtonStyle, backgroundColor: '#e74c3c' }}
          >
            INICIAR SESIÓN
          </button>
          
          <button
            onClick={handleRegistrarse}
            style={{ ...actionButtonStyle, backgroundColor: '#3498db' }}
          >
            REGISTRARSE
          </button>
        </div>
        */}
      </div>
    </div>
  );
}

export default Home;



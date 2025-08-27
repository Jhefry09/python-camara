import './App.css';

// Importar imagen - luego la agregas en la carpeta src/assets/
// import logo from './assets/logo-tienda.png'; 

function App() {
  const handleIniciarSesion = () => {
    console.log('INICIAR SESION clickeado');
  };

  const handleRegistrarse = () => {
    console.log('REGISTRARSE clickeado');
  };

  return (
    <div style={{
      backgroundColor: '#595dcbf5', // Fondo celeste
      minHeight: '100vh',
      display: 'flex',
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

      {/* Título principal */}
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

      {/* Contenedor de botones - ORDEN EXACTO como la imagen */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        width: '100%',
        maxWidth: '320px'
      }}>
        {/* Botón INICIAR SESIÓN - PRIMERO */}
        <button
          onClick={handleIniciarSesion}
          style={{
            padding: '20px 35px',
            backgroundColor: '#52c3e2ff', // Rojo exacto
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

        {/* Botón REGISTRARSE - SEGUNDO */}
        <button
          onClick={handleRegistrarse}
          style={{
            padding: '20px 35px',
            backgroundColor: '#3498db', // Azul exacto
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

export default App;

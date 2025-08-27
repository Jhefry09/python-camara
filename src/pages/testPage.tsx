import React from 'react';

const TestPage: React.FC = () => {
  const handleFacialClick = () => {
    console.log('Botón de Reconocimiento Facial clickeado');
  };

  const handleUserClick = () => {
    console.log('Botón de Usuario y Contraseña clickeado');
  };

  return (
    <div style={{
      backgroundColor: '#87CEEB',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        textAlign: 'center',
        background: 'white',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ color: '#333', marginBottom: '1.5rem' }}>
          Prueba de Botones
        </h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button
            onClick={handleFacialClick}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Reconocimiento Facial
          </button>
          
          <button
            onClick={handleUserClick}
            style={{
              padding: '12px 24px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Usuario y Contraseña
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestPage;

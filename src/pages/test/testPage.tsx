// Importar React y el componente Nanvar
import React from 'react';
import { Nanvar } from '../../components/nanvar';

// Definir el componente funcional TestPage
const TestPage: React.FC = () => {
  return (
    // Contenedor principal con fondo gradiente
    <div style={{
      backgroundColor: '#f0f8ff', // Color de fondo azul claro
      backgroundImage: 'linear-gradient(135deg, #f0f8ff 0%, #e6f7ff 100%)', // Gradiente suave
      minHeight: '100vh', // Altura mínima de toda la ventana
      display: 'flex', // Layout flex para organizar elementos
      padding: '20px', // Espaciado interno
      boxSizing: 'border-box' // Incluye padding en el tamaño total
    }}>
      {/* Componente de barra lateral de navegación */}
      <Nanvar />
      
      {/* Contenedor del contenido principal */}
      <div style={{
        flex: 1, // Ocupa todo el espacio disponible
        marginLeft: '60px', // Margen para la barra lateral
        transition: 'margin-left 0.3s ease-in-out' // Transición suave para cambios de margen
      }}>
        {/* Espacio reservado para contenido futuro */}
        {/* Contenido principal eliminado */}
      </div>
    </div>
  );
};

// Exportar el componente como predeterminado
export default TestPage;
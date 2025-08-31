import React from 'react';
import { Nanvar } from '../../components/nanvar';

const TestPage: React.FC = () => {
  return (
    <div style={{
      backgroundColor: '#f0f8ff',
      backgroundImage: 'linear-gradient(135deg, #f0f8ff 0%, #e6f7ff 100%)',
      minHeight: '100vh',
      display: 'flex',
      padding: '10px',
      boxSizing: 'border-box'
    }}>
      <Nanvar />
      
      <div style={{
        flex: 1,
        marginLeft: '60px',
        transition: 'margin-left 0.3s ease-in-out'
      }}>
        {/* Contenido principal eliminado */}
      </div>
    </div>
  );
};

export default TestPage;
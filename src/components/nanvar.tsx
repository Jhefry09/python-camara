// Importar useState de React y los estilos CSS
import { useState } from 'react';
import './nanvar.css';

// Componentes de íconos con estilo futurista usando símbolos Unicode
const RecepIcon = () => <span className="futuristic-icon">⇛</span>; // Flecha derecha
const TablaIcon = () => <span className="futuristic-icon">⊞</span>; // Cuadrado con plus
const PrediccionIcon = () => <span className="futuristic-icon">⚲</span>; // Símbolo de anclaje/predicción
const RegistroIcon = () => <span className="futuristic-icon">✉</span>; // Símbolo de correo/registro
const UserIcon = () => <span className="futuristic-icon">☉</span>; // Símbolo de sol/usuario

// Componente principal de la barra de navegación
export const Nanvar = () => {
    // Estado para controlar si la barra lateral está abierta o cerrada
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // Estado para controlar qué ítem del menú está activo
    const [activeItem, setActiveItem] = useState('');

    // Función para alternar (abrir/cerrar) la barra lateral
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Función para manejar el clic en un ítem del menú
    const handleItemClick = (itemName: string) => {
        setActiveItem(itemName);
        // Aquí puedes agregar la lógica de navegación si es necesario
    };

    return (
        // Contenedor principal de la barra lateral con clases condicionales
        <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
            {/* Capa de overlay con efecto cyberpunk */}
            <div className="cyberpunk-overlay"></div>
            
            {/* Encabezado de la barra lateral */}
            <div className="sidebar-header">
                {/* Título con efecto glitch */}
                <span className="sidebar-title glitch-text" data-text="RECEPCIÓN">RECEPCIÓN</span>
                {/* Botón para alternar la barra lateral */}
                <button onClick={toggleSidebar} className="toggle-btn holographic-btn">
                    <RecepIcon />
                </button>
            </div>
            
            {/* Menú de la barra lateral */}
            <div className="sidebar-menu">
                {/* Ítem del menú - TABLA */}
                <div 
                    className={`menu-item ${activeItem === 'TABLA' ? 'active' : ''}`}
                    onClick={() => handleItemClick('TABLA')}
                >
                    <div className="menu-icon-container">
                        <TablaIcon />
                        {/* Punto de pulso indicador (posible notificación) */}
                        <span className="pulse-dot"></span>
                    </div>
                    {/* Texto del menú que solo se muestra cuando está abierto */}
                    {isSidebarOpen && <span className="menu-text">TABLA</span>}
                </div>
                
                {/* Ítem del menú - PREDICCIÓN */}
                <div 
                    className={`menu-item ${activeItem === 'PREDICCIÓN' ? 'active' : ''}`}
                    onClick={() => handleItemClick('PREDICCIÓN')}
                >
                    <div className="menu-icon-container">
                        <PrediccionIcon />
                        <span className="pulse-dot"></span>
                    </div>
                    {isSidebarOpen && <span className="menu-text">PREDICCIÓN</span>}
                </div>
                
                {/* Ítem del menú - REGISTRO */}
                <div 
                    className={`menu-item ${activeItem === 'REGISTRO' ? 'active' : ''}`}
                    onClick={() => handleItemClick('REGISTRO')}
                >
                    <div className="menu-icon-container">
                        <RegistroIcon />
                        <span className="pulse-dot"></span>
                    </div>
                    {isSidebarOpen && <span className="menu-text">REGISTRO</span>}
                </div>
            </div>
            
            {/* Pie de página de la barra lateral */}
            <div className="sidebar-footer">
                {/* Información de usuario */}
                <div className="footer-item user-profile">
                    <div className="menu-icon-container">
                        <UserIcon />
                    </div>
                    {/* Información que solo se muestra cuando la barra está abierta */}
                    {isSidebarOpen && (
                        <div className="user-info">
                            <span className="menu-text">USUARIO</span>
                            {/* Estado de conexión del usuario */}
                            <span className="user-status">En línea</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
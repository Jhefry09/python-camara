import { useState } from 'react';
import './nanvar.css';

// Componentes de íconos con estilo futurista
const RecepIcon = () => <span className="futuristic-icon">⇛</span>;
const TablaIcon = () => <span className="futuristic-icon">⊞</span>;
const PrediccionIcon = () => <span className="futuristic-icon">⚲</span>;
const RegistroIcon = () => <span className="futuristic-icon">✉</span>;
const UserIcon = () => <span className="futuristic-icon">☉</span>;

export const Nanvar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('');

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleItemClick = (itemName: string) => {
        setActiveItem(itemName);
        // Aquí puedes agregar la lógica de navegación si es necesario
    };

    return (
        <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
            <div className="cyberpunk-overlay"></div>
            
            <div className="sidebar-header">
                <span className="sidebar-title glitch-text" data-text="RECEPCIÓN">RECEPCIÓN</span>
                <button onClick={toggleSidebar} className="toggle-btn holographic-btn">
                    <RecepIcon />
                </button>
            </div>
            
            <div className="sidebar-menu">
                <div 
                    className={`menu-item ${activeItem === 'TABLA' ? 'active' : ''}`}
                    onClick={() => handleItemClick('TABLA')}
                >
                    <div className="menu-icon-container">
                        <TablaIcon />
                        <span className="pulse-dot"></span>
                    </div>
                    {isSidebarOpen && <span className="menu-text">TABLA</span>}
                </div>
                
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
            
            <div className="sidebar-footer">
                <div className="footer-item user-profile">
                    <div className="menu-icon-container">
                        <UserIcon />
                    </div>
                    {isSidebarOpen && (
                        <div className="user-info">
                            <span className="menu-text">USUARIO</span>
                            <span className="user-status">En línea</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./nanvar.css";

// Íconos futuristas
const RecepIcon = () => <span className="futuristic-icon">⇛</span>;
const TablaIcon = () => <span className="futuristic-icon">⊞</span>;
const PrediccionIcon = () => <span className="futuristic-icon">⚲</span>;
const RegistroIcon = () => <span className="futuristic-icon">✉</span>;
const UserIcon = () => <span className="futuristic-icon">☉</span>;

export const Nanvar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // Cambiar ítem activo según la ruta actual
    useEffect(() => {
        switch (location.pathname) {
            case "/dashboard":
                setActiveItem("TABLA");
                break;
          case "/prediccion":
                setActiveItem("PREDICCIÓN");
                break;
            case "/registro":
                setActiveItem("REGISTRO");
                break;
            default:
                setActiveItem("");
        }
    }, [location]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleItemClick = (itemName: string) => {
        setActiveItem(itemName);
        switch (itemName) {
            case "TABLA":
                navigate("/dashboard");
                break;
            case "PREDICCIÓN":
                navigate("/prediccion");
                break;
            case "REGISTRO":
                navigate("/registro");
                break;
            default:
                break;
        }
    };

    const handleLogout = () => {
        // Limpiar datos de sesión
        localStorage.clear();
        sessionStorage.clear();
        // Redirigir al login
        navigate("/login");
    };

    return (
        <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
            <div className="cyberpunk-overlay"></div>

            {/* Header */}
            <div className="sidebar-header">
                <span className="sidebar-title glitch-text" data-text="RECEPCIÓN">
                    MENU
                </span>
                <button onClick={toggleSidebar} className="toggle-btn holographic-btn">
                    <RecepIcon />
                </button>
            </div>

            {/* Menú */}
            <div className="sidebar-menu">
                <div
                    className={`menu-item ${activeItem === "TABLA" ? "active" : ""}`}
                    onClick={() => handleItemClick("TABLA")}
                >
                    <div className="menu-icon-container">
                        <TablaIcon />
                        <span className="pulse-dot"></span>
                    </div>
                    {isSidebarOpen && <span className="menu-text">TABLA</span>}
                </div>

                <div
                    className={`menu-item ${activeItem === "PREDICCIÓN" ? "active" : ""}`}
                    onClick={() => handleItemClick("PREDICCIÓN")}
                >
                    <div className="menu-icon-container">
                        <PrediccionIcon />
                        <span className="pulse-dot"></span>
                    </div>
                    {isSidebarOpen && <span className="menu-text">PREDICCIÓN</span>}
                </div>

                <div
                    className={`menu-item ${activeItem === "REGISTRO" ? "active" : ""}`}
                    onClick={() => handleItemClick("REGISTRO")}
                >
                    <div className="menu-icon-container">
                        <RegistroIcon />
                        <span className="pulse-dot"></span>
                    </div>
                    {isSidebarOpen && <span className="menu-text">REGISTRO</span>}
                </div>
            </div>

            {/* Footer / Logout */}
            <div className="sidebar-footer">
                
              <div
                  className="footer-item user-profile logout-btn"
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
              >
                  <div className="menu-icon-container">
                      <UserIcon />
                  </div>
                  {isSidebarOpen && (
                      <div className="user-info">
                          <span className="menu-text">Cerrar sesión</span>
                          <span className="user-status">En línea</span>
                      </div>
                  )}
              </div>

            </div>
        </div>
    );
};


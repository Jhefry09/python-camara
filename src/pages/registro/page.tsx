import React, { useState, useEffect } from "react";
import "./page.css";

export default function registro() {
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [botonesHabilitados, setBotonesHabilitados] = useState(false);

  useEffect(() => {
    const todosLlenos =
      correo.trim() !== "" &&
      rol.trim() !== "" &&
      descripcion.trim() !== "";
    setBotonesHabilitados(todosLlenos);
  }, [correo, rol, descripcion]);

  const handleCancelar = () => {
    setCorreo("");
    setRol("");
    setDescripcion("");
  };

  return (
    <div className="page-container">
      <div className="page-flex">

        {/* el futuro es hoy viejo */}
        <div className="div_car">
          <div className="icono-car">📝</div>
          <h2>REGISTRAR</h2>
          <button>REGISTRAR DATOS</button>
        </div>

        {/* formulario */}
        <div className="form-container">
          <input
            type="email"
            placeholder="📧 CORREO"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="">Seleccione rol</option>
            <option value="admin">Admin</option>
            <option value="usuario">Usuario</option>
          </select>

          <textarea
            placeholder="📖 DESCRÍBETE...."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          <button className="btn-primary" disabled={!botonesHabilitados}>
            CONTINUAR
          </button>
          <button
            className="btn-secondary"
            disabled={!botonesHabilitados}
            onClick={handleCancelar}
          >
            CANCELAR
          </button>
        </div>
      </div>
    </div>
  );
}

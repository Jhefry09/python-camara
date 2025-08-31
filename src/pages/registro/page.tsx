import React, { useState, useEffect } from "react";
import "./page.css";

export default function Registro() {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Datos que se enviarán
    const datos = {
      correo,
      rol,
      descripcion,
    };

    console.log("Datos enviados:", datos);
    // Aquí puedes usar fetch o axios para enviar los datos al backend
    // Ejemplo:
    // fetch("/api/registro", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(datos),
    // })
    // .then(res => res.json())
    // .then(data => console.log(data));
  };

  return (
    <div className="page-container">
      <div className="page-flex">
        {/* Tarjeta con icono */}
        <div className="div_car">
          <div className="icono-car">📝</div>
          <h2>REGISTRAR</h2>
          <button>REGISTRAR DATOS</button>
        </div>

        {/* Formulario */}
        <form className="form-container" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="📧 CORREO"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            required
          >
            <option value="">Seleccione rol</option>
            <option value="admin">Admin</option>
            <option value="usuario">Usuario</option>
          </select>

          <textarea
            placeholder="📖 DESCRÍBETE...."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn-primary"
            disabled={!botonesHabilitados}
          >
            CONTINUAR
          </button>
          <button
            type="button"
            className="btn-secondary"
            disabled={!botonesHabilitados}
            onClick={handleCancelar}
          >
            CANCELAR
          </button>
        </form>
      </div>
    </div>
  );
}

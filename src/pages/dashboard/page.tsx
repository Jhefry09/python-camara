import "./page.css"; // 👉 estilos externos (si quieres usarlos)
import { Nanvar } from "../../components/nanvar";
import React, { useEffect, useState } from "react";
import Head from "../../components/head";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard: React.FC = () => {
  // 👉 Estado para guardar datos del CSV
  const [data, setData] = useState<any[]>([]);

  // 👉 Cargar datos del CSV con PapaParse
  useEffect(() => {
    const loadData = () => {
      if (!(window as any).Papa) {
        setTimeout(loadData, 300); // 👉 espera a que cargue PapaParse
        return;
      }
      (window as any).Papa.parse("/pruebas/DatosDeVentaDeTelefonos.csv", {
        download: true, // 👉 lo carga desde /public/pruebas/
        header: true, // 👉 usa la primera fila como cabecera
        complete: (result: any) => {
          console.log("Datos CSV cargados:", result.data);
          setData(result.data);
        },
      });
    };
    loadData();
  }, []);

  return (
    <>
      <Head /> {/* 👉 Importa los CDNs */}
      <Nanvar />
      {/* 🔹 Fondo ocupa toda la pantalla */}
      <div
        id="dashboard-fondo"
        style={{
          minHeight: "100vh", // 👉 siempre cubre toda la altura de la ventana
          width: "100%", // 👉 cubre todo el ancho
          margin: "0", // 👉 elimina márgenes
          padding: "2rem", // 👉 espacio interno (arriba, abajo, lados)
          display: "flex", // 👉 para centrar contenido
          justifyContent: "center",
          alignItems: "flex-start", // 👉 contenido desde arriba (puedo cambiar a "center" si quieres todo centrado vertical)
          backgroundImage:
            "url('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTdoY3k0MGl4MHE3dHduYndmMmVrbzczanQ5aXQ1cDg2aWIwZmdqdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MQTF1uW0GTZoVsseXx/giphy.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* 🔹 Contenedor con fondo oscuro encima del GIF */}
        <div
          id="dashboard-contenedor"
          style={{
            width: "100%",
            maxWidth: "1200px", // 👉 no se extiende más de esto
            backgroundColor: "rgba(0, 0, 0, 0.7)", // 👉 capa oscura
            borderRadius: "12px",
            padding: "2rem",
            position: "relative",
            color: "#0ff",
            boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.4)",
          }}
        >
          {/* 🔸 Título */}
          <h1
            id="titulo-dashboard"
            style={{
              color: "#0ff",
              textShadow: "0px 0px 12px #00f",
              marginBottom: "1.5rem",
              textAlign: "center",
              fontSize: "2.5rem", // ⬅️ Aumenté tamaño del título principal
              fontWeight: "bold",
            }}
          >
            📊 VENTAS DEL MES
          </h1>

          {/* 🔸 Gráfico */}
          <div
            id="grafico-contenedor"
            style={{
              width: "100%",
              height: 400,
              margin: "20px auto",
            }}
          >
            {data.length > 0 ? (
              <ResponsiveContainer>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#0ff" />
                  <XAxis
                    dataKey="Descripción"
                    tick={{ fill: "#0ff" }}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fill: "#0ff" }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ color: "#0ff" }} />
                  <Bar dataKey="Vendidos" fill="#007bff" stroke="#00f" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p style={{ color: "#aaa" }}>Cargando datos del CSV...</p>
            )}
          </div>

          {/* 🔸 Tabla */}
          <div
            id="tabla-contenedor"
            style={{
              marginTop: "2rem",
              overflowX: "auto",
            }}
          >
            <h2
              id="titulo-tabla"
              style={{
                color: "#0ff",
                textShadow: "0px 0px 8px #00f",
                marginBottom: "1rem",
                textAlign: "center",
                fontSize: "2rem", // ⬅️ Aumenté tamaño del título de la tabla
                fontWeight: "bold",
              }}
            >
              📋 LISTA DE TELEFONOS
            </h2>
            {data.length > 0 ? (
              <table
                id="tabla-ventas"
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  margin: "0 auto",
                  boxShadow: "0px 0px 20px rgba(0, 123, 255, 0.6)",
                  border: "1px solid #007bff",
                }}
              >
                <thead>
                  <tr>
                    {Object.keys(data[0]).map((col, i) => (
                      <th
                        key={i}
                        style={{
                          background:
                            "linear-gradient(90deg, #004080, #007bff, #00d4ff)",
                          color: "#fff",
                          padding: "10px",
                          border: "1px solid #0056b3",
                          textShadow: "0px 0px 6px #00f",
                        }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {data
                    .slice(0, 20)
                    .filter((row) => Object.values(row).some((val) => val))
                    .map((row, i) => (
                      <tr
                        key={i}
                        style={{ transition: "0.3s" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "rgba(0, 123, 255, 0.2)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                      >
                        {Object.values(row).map((val, j) => (
                          <td
                            key={j}
                            style={{
                              padding: "8px",
                              border: "1px solid #007bff",
                              color: "#0ff",
                              textShadow: "0px 0px 6px #007bff",
                            }}
                          >
                            {val != null ? String(val) : ""}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <p style={{ color: "#aaa" }}>Cargando tabla...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

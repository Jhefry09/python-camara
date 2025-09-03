import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import * as Papa from "papaparse";
import MLR from "ml-regression-multivariate-linear";

interface Venta {
  Fecha: string;
  Representante: string;
  CódigoProducto: string;
  Unidades: string;
}

interface DatosProcesados {
  rango: string;
  [representante: string]: number | null;
}

const Prediccion: React.FC = () => {
  const [data, setData] = useState<DatosProcesados[]>([]);
  const [representantes, setRepresentantes] = useState<string[]>([]);
  const [predicciones, setPredicciones] = useState<DatosProcesados[]>([]);
  const [mostrarPred, setMostrarPred] = useState(false);

  useEffect(() => {
    Papa.parse("/pruebas/DatosDeVenta.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const ventas: Venta[] = result.data as Venta[];

        const ventasPorRango: Record<string, Record<string, number>> = {};
        const ventasTotales: Record<string, number> = {};

        ventas.forEach((row) => {
          if (!row.Fecha || !row.Unidades || !row.Representante) return;
          if (!row.Fecha.includes("/11/20")) return;

          const unidades = parseInt(row.Unidades, 10);
          if (isNaN(unidades) || unidades <= 0 || unidades > 5) return;

          const [diaStr] = row.Fecha.split("/");
          const dia = parseInt(diaStr, 10);
          const inicio = Math.floor((dia - 1) / 5) * 5 + 1;
          const fin = inicio + 4;
          const rango = `${inicio}-${fin}/11/20`;

          const rep = row.Representante;

          if (!ventasPorRango[rango]) ventasPorRango[rango] = {};
          if (!ventasPorRango[rango][rep]) ventasPorRango[rango][rep] = 0;

          ventasPorRango[rango][rep] += unidades;
          ventasTotales[rep] = (ventasTotales[rep] || 0) + unidades;
        });

        const topReps = Object.entries(ventasTotales)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([rep]) => rep);

        setRepresentantes(topReps);

        const rangos = Object.keys(ventasPorRango).sort((a, b) => {
          const da = parseInt(a.split("-")[0], 10);
          const db = parseInt(b.split("-")[0], 10);
          return da - db;
        });

        const datosProcesados: DatosProcesados[] = rangos.map((rango) => {
          const repsData: Record<string, number | null> = {};
          topReps.forEach((rep) => {
            const valor = ventasPorRango[rango]?.[rep] || 0;
            repsData[rep] = valor > 0 ? valor : null;
          });
          return { rango, ...repsData };
        });

        setData(datosProcesados);
      },
    });
  }, []);

  const togglePredicciones = () => {
    if (!mostrarPred && predicciones.length === 0 && data.length > 0) {
      const nuevasPredicciones: DatosProcesados[] = [];
      const numFuturo = 12; // 12 meses de predicción

      representantes.forEach((rep) => {
        const x: number[][] = [];
        const y: number[][] = [];

        data.forEach((row, idx) => {
          x.push([idx]);
          y.push([row[rep] || 0]);
        });

        const mlr = new MLR(x, y);

        for (let i = 1; i <= numFuturo; i++) {
          const pred = mlr.predict([[x.length - 1 + i]]);
          const rango = `Mes ${i} Pred`;

          if (!nuevasPredicciones[i - 1]) nuevasPredicciones[i - 1] = { rango };
          nuevasPredicciones[i - 1][rep] = Math.max(0, Math.round(pred[0][0]));
        }
      });

      setPredicciones(nuevasPredicciones);
    }

    setMostrarPred(!mostrarPred);
  };

  const dataTotal = mostrarPred ? predicciones : data;

  return (
    <div className="w-full flex justify-center my-10">
      <div className="w-full max-w-6xl p-6 bg-gray-900 rounded-2xl shadow-lg shadow-cyan-500/20">
        <h2 className="text-center text-2xl font-bold text-cyan-400 mb-6 drop-shadow-[0_0_8px_#00f]">
          📊 Ventas de Noviembre 2020 (Top 5 Representantes, agrupadas cada 5 días)
        </h2>

        <button
          className="mb-4 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg"
          onClick={togglePredicciones}
        >
          {mostrarPred ? "Mostrar datos reales" : "Predecir próximos 12 meses"}
        </button>

        {dataTotal.length > 0 ? (
          <div className="w-full h-[500px]">
            <ResponsiveContainer>
              <LineChart data={dataTotal}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0ff" />
                <XAxis dataKey="rango" tick={{ fill: "#0ff" }} />
                <YAxis hide domain={[0, 5]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderRadius: "8px",
                    border: "1px solid #0ff",
                  }}
                  labelStyle={{ color: "#0ff" }}
                />
                <Legend wrapperStyle={{ color: "#0ff" }} />
                {representantes.map((rep, index) => (
                  <Line
                    key={rep}
                    type="monotone"
                    dataKey={rep}
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    stroke={`hsl(${(index * 72) % 360}, 100%, 50%)`}
                    connectNulls={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-center text-gray-400">
            No hay datos de noviembre 2020...
          </p>
        )}
      </div>
    </div>
  );
};

export default Prediccion;


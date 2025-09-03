// src/pages/prediccion/page.tsx
import { Nanvar } from "../../components/nanvar";
import React from "react";
import Head from "../../components/head";
import Prediccion from "../../components/prediccion";

const PrediccionPage: React.FC = () => {
  return (
    <>
      <Head />
      <Nanvar />

      <div
        id="prediccion-fondo"
        className="min-h-screen w-full p-8 flex justify-center items-start 
                   bg-fixed bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTdoY3k0MGl4MHE3dHduYndmMmVrbzczanQ5aXQ1cDg2aWIwZmdqdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MQTF1uW0GTZoVsseXx/giphy.gif')",
        }}
      >
        <div
          id="prediccion-contenedor"
          className="w-full max-w-6xl bg-black/70 rounded-xl p-8 
                     text-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.4)]"
        >
          <h1 className="text-center text-cyan-400 text-4xl font-bold mb-6 drop-shadow-[0_0_12px_#00f]">
            🤖 Predicción de Ventas
          </h1>

          <Prediccion />
        </div>
      </div>
    </>
  );
};

export default PrediccionPage;


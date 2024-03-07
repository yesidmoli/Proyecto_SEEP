import React, { useState } from "react";
import Bitacoras from "./Bitacoras";
import '../../css/bitacoras.css';

const VisualizarDocumentos = () =>{
  const[mostrarBitacora, setMostrarBitacora] = useState(false);

  const handleMostrarBitacora = () => {
    // Actualiza el estado para mostrar el componente de MostrarBitacora
    setMostrarBitacora(true);
  }
  if (mostrarBitacora) {
    // Si mostrarDocumentos es verdadero, renderiza el componente Bitacoras
    return <Bitacoras />;
  }
    
    return(
        <div className="container-dos">
    <h2>Documentación del Aprendiz</h2>
    <table id="documentTable">
      <thead>
        <tr>
          <th>Título</th>
          <th>Descripción</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody id="documentBody">
      
      </tbody>
    </table>
    <div className="button">
    <button id="regresar" onClick={handleMostrarBitacora}>Regresar</button>
    </div>
  </div>
    )
}


export default VisualizarDocumentos;
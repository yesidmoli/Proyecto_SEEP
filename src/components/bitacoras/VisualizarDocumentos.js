import React from "react";
import '../../css/bitacoras.css';

const VisualizarDocumentos = () =>{
    
    return(
        <div class="container">
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
    <button id="regresar">Regresar</button>
    </div>
  </div>
    )
}


export default VisualizarDocumentos;
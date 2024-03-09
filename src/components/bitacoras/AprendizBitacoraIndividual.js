import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import MainSection from "../layout/MainSection";
import Header from "../layout/Header";

import { useAuth } from "../context/AuthContext";
const AprendizBitacoraIndividual = () => {
  const { id } = useParams();
  const [documentos, setDocumentos] = useState([]);
  const { token } = useAuth();
  const [bitacoras, setBitacoras] = useState([]);
  const [checkboxesMarcados, setCheckboxesMarcados] = useState([]);
  const fetchDocumentos = async () => {
    const response = await clienteAxios.get(
      `api/documentacion-aprendiz/?aprendiz_id=${id}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    setDocumentos(response.data);
    const bitacoras = documentos.filter((documento) => documento.is_bitacora);
    setBitacoras(bitacoras);
  };
  const bitacorasValidas = () => {
    Swal.fire("Guardado", "", "success");
    console.log(checkboxesMarcados)
  }

  const handleCheckboxChange = (documentoId) => {
    setCheckboxesMarcados((prevCheckboxes) => {
      if (prevCheckboxes.includes(documentoId)) {
        return prevCheckboxes.filter(id => id !== documentoId);
      } else {
        return [...prevCheckboxes, documentoId];
      }
    });
  };
  useEffect(() => {
    fetchDocumentos();
  }); 

  return (
    <>
    <Header></Header>
    <MainSection></MainSection>
    
    <div className="bitacoras-container">
      <div className="table-container">
        <table id="bitacoras-table">
          <thead className="thead">
            <tr>
              <th>Número bitácora</th>
              <th>Identificador Documento</th>
              <th>Descargar Archivo</th>
              <th>Check</th>
            </tr>
          </thead>
          <tbody id="documentBody">
            {bitacoras.map((documento) => (
              <tr key={documento.id}>
                <td>{documento.tipo_documento}</td>
                <td>{documento.id}</td>
                <td>
                  <a href={documento.archivo} download>
                    {documento.tipo_documento}
                  </a>
                </td>
                <td>
                  <input
                    type="checkbox"
                    id={documento.id}
                    checked={checkboxesMarcados.includes(documento.id)}
                    onChange={() => handleCheckboxChange(documento.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="button-guardar-check">
        {/* aqui se pone la funcion para guardar el check */}
        <button id="guardar--check" onClick={bitacorasValidas}>Guardar</button>
      </div>
    </div>
    </>
  );
};

export default AprendizBitacoraIndividual;

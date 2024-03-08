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
    try {
      const response = await clienteAxios.get(
        `api/documentacion-aprendiz/?aprendiz_id=${id}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setDocumentos(response.data);
      const bitacoras = response.data.filter((documento) => documento.is_bitacora);
      setBitacoras(bitacoras);

      // Establecer el estado inicial del checkbox basado en is_bitacora_check
      const checkboxes = {};
      bitacoras.forEach((documento) => {
        checkboxes[documento.id] = documento.is_bitacora_check || false;
      });
      setCheckboxesMarcados(checkboxes);
    } catch (error) {
      console.error("Error al obtener documentos:", error);
      Swal.fire("Error", "Error al obtener documentos:", "error");
    }
  };

  const handleCheckboxChange = (documentoId) => {
    setCheckboxesMarcados((prevCheckboxes) => ({
      ...prevCheckboxes,
      [documentoId]: !prevCheckboxes[documentoId],
    }));
  };

  const bitacorasValidas = async () => {
    try {
      await clienteAxios.put(
        `api/bitacoras-aprendiz/update_checks/?aprendiz_id=${id}`,
        {
          documentos: bitacoras.map((documento) => ({
            id: documento.id,
            is_bitacora_check: checkboxesMarcados[documento.id],
          })),
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      Swal.fire("Guardado", "Se a guardado exitosamente", "success");
    } catch (error) {
      console.error("Error al guardar:", error);
      let errorMessage = "Se produjo un error al guardar:";
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage += `\n- ${error.response.data.error}`;
      } else if (error.response && error.response.data && Array.isArray(error.response.data)) {
        errorMessage += error.response.data.map((error) => `\n- ${error}`).join('');
      } else {
        errorMessage += "\n- Ha ocurrido un error inesperado.";
      }
      Swal.fire("Error", errorMessage, "error");
    }
  };

  useEffect(() => {
    fetchDocumentos();
  }, []); 

  return (
    <>
      <Header></Header>
      <MainSection></MainSection>

      <div className=" bitacoras-container">

        <h4>Bitácoras del aprendiz</h4>
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
                      checked={checkboxesMarcados[documento.id]}
                      onChange={() => handleCheckboxChange(documento.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="button-guardar-check">
          <button id="guardar--check" onClick={bitacorasValidas}>Guardar</button>
        </div>
      </div>
    </>
  );
};

export default AprendizBitacoraIndividual;

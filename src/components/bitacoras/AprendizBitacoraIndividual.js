import React, { Fragment, useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import MainSection from "../layout/MainSection";
import Header from "../layout/Header";
import { useAuth } from "../context/AuthContext";
import atras from '../../img/atras.png'
import Apps from "../layout/menu/App";


import bitacora from '../../../src/components/bitacoras/BitacoraDoc.xlsx'
const AprendizBitacoraIndividual = () => {
  const { id } = useParams();
  const [documentos, setDocumentos] = useState([]);
  const { token } = useAuth();
  const [bitacoras, setBitacoras] = useState([]);
  const [checkboxesMarcados, setCheckboxesMarcados] = useState([]);
  const [observaciones, setObservaciones] = useState('');


  console.log("estas son las bitacoras", bitacoras)


  const history = useHistory()
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
      // Establecer el estado inicial del checkbox y las observaciones
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
            observaciones: documento.observaciones, 
          })),
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      Swal.fire("Guardado", "Se ha guardado exitosamente", "success");
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

  const handleChangeObservaciones = (event, documentoId) => {
    const nuevasBitacoras = bitacoras.map((bitacora) => {
      if (bitacora.id === documentoId) {
        return {
          ...bitacora,
          observaciones: event.target.value,
        };
      }
      return bitacora;
    });
    setBitacoras(nuevasBitacoras);
  };
  



  return (
    <>
      <Header />

      <MainSection />
      <Apps />
      <div className="container  cont-fichas cont-bitacoras">
        <Link to={"#"} aria-label="icon" className=" btn-atras btn-atras-bitacora" onClick={() => history.goBack()}>
          <img src={atras}></img>

          <b>Regresar</b>
        </Link>

        <div className='btn-fichas btn-bitacoras'>


          <Link to={`/documentos-aprendiz/${id}`} aria-label="icon" className="iconLink ">
            <button id='registrar-aprendiz'>Cargar Bitácora</button>
          </Link>
          <a href={bitacora} download="Bitácora Formato Actualizado-JUN-2023.xlsx" className="iconLink">
            <button id='registrar-aprendiz'>Descargar Bitácora</button>
          </a>


        </div>

        <div className="bitacoras-container">

          <h3>Bitácoras del aprendiz</h3>
          <div className="table-container">
            <table id="bitacoras-table">
              <thead className="thead">
                <tr>
                  <th>Número bitácora</th>
                  <th>Identificador Documento</th>
                  <th>Descargar Archivo</th>
                  <th>Check</th>
                  <th>Observaciones bitácora</th>
                </tr>
              </thead>
              <tbody id="documentBody">
                {bitacoras.map((documento) => (
                  <tr key={documento.id}>
                    <td> <strong>{documento.tipo_documento}</strong> </td>
                    <td>{documento.id}</td>
                    <td>
                      <a href={documento.archivo} download>
                        {documento.tipo_documento}
                      </a>
                    </td>
                    <td>
                      <input className="check-bitacora"
                        type="checkbox"
                        id={documento.id}
                        checked={checkboxesMarcados[documento.id]}
                        onChange={() => handleCheckboxChange(documento.id)}
                      />
                    </td>
                    <td>
                      <textarea
                        className="obs-bitacora"
                        placeholder="Observaciones"
                        type="text"
                        value={documento.observaciones}
                        onChange={(e) => handleChangeObservaciones(e, documento.id)}
                      ></textarea>
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
      </div>

    </>
  );
};

export default AprendizBitacoraIndividual;

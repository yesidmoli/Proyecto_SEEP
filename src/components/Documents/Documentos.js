import React, { Fragment, useEffect, useState } from "react";
import '../../css/documentos.css';
import VisualizarDocumentos from "./VisualizarDocumentos";
import Header from "../layout/Header";
import MainSection from "../layout/MainSection";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import Apps from "../layout/menu/App";
import { useAuth } from "../context/AuthContext";
import atras from '../../img/atras.png'
import { Link, useHistory } from "react-router-dom";
import bitacora from '../../../src/components/bitacoras/BitacoraDoc.xlsx';

const Documentos = (props) => {
    const history = useHistory();
    const { id } = props.match.params;
    const { token } = useAuth();
    
    const [seleccion, setSeleccion] = useState('');
    const [mostrarCampoAdicional, setMostrarCampoAdicional] = useState(false);
    const [mostrarDocumentos, setMostrarDocumentos] = useState(false);
    let [datosForm, setDatosForm] = useState({
        "id": 0,
        "tipo_documento": '',
        "is_bitacora": false,
        "is_bitacora_check":false,
        "observaciones": '',
        "aprendiz": parseInt(id)
    });
    const [documentos, setDocumentos] = useState([]);

    const opciones = ['Bitácora', 'Documento de identidad', 'Carta Laboral', 'Certificado Agencia Publica', 'Carnet Destruido', 'Prubas TyT', 'Carta Laboral'];

    const handleSeleccion = (e) => {
        const nuevaSeleccion = e.target.value;
        setSeleccion(nuevaSeleccion);

        setMostrarCampoAdicional(nuevaSeleccion === 'Bitácora');
        if (nuevaSeleccion !== 'Bitácora') {
            setDatosForm(prevState => ({
                ...prevState,
                tipo_documento: nuevaSeleccion
            }));
        }
    }

    const handleSeleccionBitacora = (event) => {
        const bitacoraSeleccionada = event.target.value;
        setDatosForm(prevState => ({
            ...prevState,
            tipo_documento: bitacoraSeleccionada,
            is_bitacora: true,
            bitacora: bitacoraSeleccionada
        }));
    };

    const handleSeleccionArchivo = (event) => {
        const archivo = event.target.files[0];
        setDatosForm(prevState => ({
            ...prevState,
            archivo: archivo
        }));
    };

    const handleSobrescribirDocumento = async () => {
        try {
            const response = await clienteAxios.put(`api/documentacion-aprendiz/${parseInt(id)}/`, datosForm, {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            Swal.fire('¡Éxito!', 'El documento ha sido actualizado exitosamente.', 'success');
            setMostrarDocumentos(true);

            fetchDocumentos();
        } catch (error) {
            console.error('Error al sobrescribir el documento:', error);
            Swal.fire('Error', 'Error al sobrescribir el documento. Revise que no hayan campos vacíos', 'error');
        }
    }

    const handleCargarDocumentos = async () => {
        // Verificar si la bitácora ya ha sido subida
            const documentoYaCargado = documentos.find(doc => doc.tipo_documento === datosForm.tipo_documento);
            if (!!documentoYaCargado) {
                datosForm = {
                    "id": documentoYaCargado.id,
                    "tipo_documento": documentoYaCargado.tipo_documento,
                    "archivo": datosForm.archivo,
                    "is_bitacora": documentoYaCargado.is_bitacora,
                    "is_bitacora_check": documentoYaCargado.is_bitacora_check? documentoYaCargado.is_bitacora_check : false,
                    "observaciones": documentoYaCargado.observaciones? documentoYaCargado.observaciones : '',
                    "aprendiz": parseInt(id)
                }
                Swal.fire({
                    title: 'Error',
                    text: 'Este documento ya ha sido cargado. ¿Desea actualizarla?',
                    icon: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, actualizar',
                    cancelButtonText: 'No, cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {

                        handleSobrescribirDocumento();
                    }
                });
                return;
            }

        try {
            const response = await clienteAxios.post('api/documentacion-aprendiz/', datosForm, {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            Swal.fire('¡Éxito!', 'Registro Exitoso.', 'success');
            setMostrarDocumentos(true);

            fetchDocumentos();
        } catch (error) {
            console.error('Error al cargar el documento:', error);

            if (error.response && error.response.data.archivo) {
                const errorMessage = error.response.data.archivo[0];
                Swal.fire('Error', errorMessage, 'error');
            } else {
                Swal.fire('Error', 'Error al cargar el documento. Revise que no hayan campos vacíos', 'error');
            }
        }
    }

    const fetchDocumentos = async () => {
        try {
            const response = await clienteAxios.get(`api/documentacion-aprendiz/?aprendiz_id=${id}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            setDocumentos(response.data);
        } catch (error) {
            console.error("Error al obtener los documentos:", error);
        }
    };

    useEffect(() => {
        fetchDocumentos();
    }, [id]);

    return (
        <Fragment>
            <Apps />
            <Header />
            <div className="container cont-doc">
                <Link to={"#"} aria-label="icon" className=" btn-atras" onClick={() => history.goBack()}>
                    <img src={atras} alt="Regresar"/>
                    <b>Regresar</b>
                </Link>
                <MainSection />
                <section className="document-container">
                    <h4>Cargue de Documentos</h4>
                    <form id="uploadForm" encType="multipart/form-data">
                        <div className="input-doc">
                            <label htmlFor="title">Tipo Documental:</label>
                            <select value={seleccion} onChange={handleSeleccion}>
                                <option value="">Seleccione una opción</option>
                                {opciones.map((opcion) => (
                                    <option key={opcion} value={opcion}>
                                        {opcion}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {mostrarCampoAdicional && (
                            <div>
                                <label>Seleccione el número de bitácora</label>
                                <select value={datosForm.bitacora || ''} onChange={handleSeleccionBitacora}>
                                    <option value="">Seleccione una opción</option>
                                    <option value="Bitácora 1">Bitácora 1</option>
                                    <option value="Bitácora 2">Bitácora 2</option>
                                    <option value="Bitácora 3">Bitácora 3</option>
                                    <option value="Bitácora 4">Bitácora 4</option>
                                    <option value="Bitácora 5">Bitácora 5</option>
                                    <option value="Bitácora 6">Bitácora 6</option>
                                    <option value="Bitácora 7">Bitácora 7</option>
                                    <option value="Bitácora 8">Bitácora 8</option>
                                    <option value="Bitácora 9">Bitácora 9</option>
                                    <option value="Bitácora 10">Bitácora 10</option>
                                    <option value="Bitácora 11">Bitácora 11</option>
                                    <option value="Bitácora 12">Bitácora 12</option>
                                </select>
                                <a href={bitacora} download="Bitácora Formato Actualizado-JUN-2023.xlsx.xlsx">Descargar</a>
                            </div>
                        )}
                        <div className="input-doc">
                            <label htmlFor="file">Cargue Documento:</label>
                            <input className="file" type="file" id="file" name="file" required onChange={handleSeleccionArchivo} />
                        </div>
                        <div className="buttons">
                            <button id="subir" type="button" onClick={handleCargarDocumentos}>Cargar</button>
                        </div>
                    </form>
                </section>
                <VisualizarDocumentos documentos={documentos} />
            </div>
        </Fragment>
    )
};

export default Documentos;


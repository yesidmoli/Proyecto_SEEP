import React, { Fragment, useEffect, useState, useRef } from 'react';
import './style.css';
import siga from './siga.png'
import imgPdf from '../FormatoPdf/pdf-computador.png'

import { useFormContext } from '../FormatoESP/FormProvide';
import { PDFDownloadLink, Document, Page, Image, View, Text } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import clienteAxios from '../../config/axios';
import { useParams } from "react-router-dom";
import logo from '../../img/logo-sena.png'
import Spinner from 'react-bootstrap/Spinner';
import Header from '../layout/Header';
import MainSection from '../layout/MainSection';
import atras from '../../img/atras.png'
import { Link, useHistory } from 'react-router-dom';
import './styleTablas.css'

import Apps from '../layout/menu/App';
const FormatoE = () => {

    const history = useHistory();
    const { id } = useParams();



    const [imagePage, setImagePages] = useState([]);

    const imageRefs = {
        informacionGeneral: useRef(null),
        planeacion: useRef(null),
        seguimiento: useRef(null),
        evaluacion: useRef(null),
    };


  

    // const generatePDF = async () => {
    //     const images = {};
    //     for (const key in imageRefs) {
    //         if (Object.hasOwnProperty.call(imageRefs, key)) {
    //             const ref = imageRefs[key];
    //             if (ref.current) {
    //                 const canvas = await html2canvas(ref.current);
    //                 images[key] = canvas.toDataURL('image/png');
    //             }
    //         }
    //     }


    //     setImagePages(images);
    // };



    const generatePDF = async () => {
        try {
            const images = [];
            for (const key in imageRefs) {
                if (Object.hasOwnProperty.call(imageRefs, key)) {
                    const ref = imageRefs[key];
                    if (ref.current) {
                        // Verifica si el elemento es visible y tiene contenido
                        if (ref.current.offsetWidth > 0 && ref.current.offsetHeight > 0 && ref.current.textContent.trim().length > 0) {
                            // Ajusta las opciones de configuración de html2canvas para mejorar la calidad
                            const canvas = await html2canvas(ref.current, {
                                scale: 2, // Duplica la resolución de la imagen
                                useCORS: true, // Habilita el uso de CORS para mejorar la calidad de las imágenes externas
                                logging: true,
                                 // Habilita el registro para obtener información de depuración en la consola
                            });
                            const image = { key, dataURL: canvas.toDataURL('image/png') };
                            images.push(image);
                            console.log('Ancho:', ref.current.offsetWidth, 'Altura:', ref.current.offsetHeight, 'Contenido:', ref.current.textContent.trim());

                        }
                    }
                }
            }
            setImagePages(images);
            
        } catch (error) {
            console.error('Error al generar el PDF:', error);
        };
    }


    const styles = {
        page: {
            flexDirection: 'column',
            padding: 20,

        },
        header: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        footer: {
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
            textAlign: 'center',
            paddingBottom: 30,

        },
        text: {
            fontZise: 10,
        }
    };

    const HeaderPDF = () => (
        <View style={styles.header}>
            <Image src={logo} style={{ width: "70rem" }} />
        </View>
    );

    const Footer = () => (
        <View style={styles.footer}>
            <Text style={{ fontSize: 10 }} >GFPI-F-023 V04</Text>
        </View>
    );
    const ImagenPDF = ({ imagePages }) => (
        <Document>
            {imagePages.map((image, index) => (
                <Page key={index} size="A4" style={styles.page}>
                    <HeaderPDF />
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <Image src={image.dataURL} style={{ width: '75%', border: '1px solid black' }} />
                    </View>
                    <Footer />
                </Page>
            ))}
        </Document>
    );

    const InformacionGeneral = () => {
        return (

            <Fragment>

                <div className='hearder-formato'>
                    <h4>PROCESO GESTIÓN DE FORMACIÓN PROFESIONAL INTEGRAL </h4>
                    <h4>FORMATO PLANEACIÓN, SEGUIMIENTO Y EVALUACIÓN ETAPA PRODUCTIVA </h4>
                </div>


                <div className="informacion-general">
                    <h2 className='info-titulo'> <i>1. INFORMACIÓN GENERAL </i> </h2>
                    <ul>
                        <li className='regional'>
                            <label for="regional">Regional:</label>
                            <input type="text" id="regional" value={"Risaralda"} name="regional" />
                        </li>
                        <li className='centro input-centro'>
                            <label for="centro-formacion">Centro de Formación:</label>
                            <input type="text" id="centro-formacion" value={"Centro de Diseño Innovación Tecnológica Industrial"} name="centro-formacion" />
                        </li>
                        <li>
                            <label for="programa-formacion">Programa de Formación:</label>
                            <input type="text" id="programa-formacion" value={formData.ficha?.nombre_programa ?? ""} name="programa-formacion" />
                        </li>
                        <li className='input-centro'>
                            <label for="numero-ficha">No. de Ficha:</label>
                            <input type="text" id="numero-ficha" value={formData.ficha?.numero_ficha ?? ""} name="numero-ficha" />
                        </li>
                    </ul>
                </div>
                <div className="datos-aprendiz">
                    <h5>Datos del Aprendiz</h5>
                    <ul>
                        <li>
                            <label for="nombre">Nombre:</label>
                            {/* <input type="text" id="nombre" name="nombre"  value={"Yesid Molina"}/> */}
                            <h6>{formData?.nombres ?? ""} {formData?.apellidos ?? ""}</h6>

                        </li>
                        <li>
                            <label for="identificacion">Identificación:</label>
                            <input type="text" id="identificacion" value={formData?.numero_documento ?? ""} name="identificacion" />
                        </li>
                        <li>
                            <label for="telefono">Teléfono:</label>
                            <input type="text" id="telefono" value={formData?.numero_celular1 ?? ""} name="telefono" />
                        </li>
                        <li>
                            <label for="email">E-mail:</label>
                            <input type="email" id="email" name="email" value={formData?.correo_principal ?? ""} />
                        </li>
                        <li>
                            <label for="email">Alternativa registrada en sofia plus:</label>
                            <input type="email" id="email" name="email" value={formData?.correo_secundario ?? ""} />
                        </li>
                    </ul>
                </div>
                <div className="ente-coformador">
                    <h5>Ente Coformador</h5>
                    <ul>
                        <li>
                            <label for="razon-social">Razón social:</label>
                            <input type="text" id="razon-social" name="razon-social" value={formData?.empresa?.razon_social ?? ""} />
                        </li>
                        <li>
                            <label for="nombre-empresa">Nit:</label>
                            <input type="text" id="nombre-empresa" name="nombre-empresa" value={formData?.empresa?.nit ?? ""} />
                        </li>
                        <li>
                            <label for="nombre-jefe">Nombre del Jefe Inmediato del Aprendiz:</label>
                            <input type="text" id="nombre-jefe" name="nombre-jefe" value={formData?.empresa?.nombre_jefe_inmediato ?? ""} />
                        </li>
                        <li>
                            <label for="cargo-jefe">Cargo:</label>
                            <input type="text" id="cargo-jefe" name="cargo-jefe" />
                        </li>
                        <li>
                            <label for="telefono-jefe">Teléfono:</label>
                            <input type="text" id="telefono-jefe" name="telefono-jefe" value={formData?.empresa?.telefono ?? ""} />
                        </li>
                        <li>
                            <label for="email-jefe">E-mail:</label>
                            <input type="email" id="email-jefe" name="email-jefe" value={formData?.empresa?.correo ?? ""} />
                        </li>
                    </ul>
                </div>
            </Fragment>
        )
    }

    const Planeacion = ({ formData }) => {

        return (
            <div className="planeacion">

                <h2 className='info-titulo titulo2'><i>2. PLANEACIÓN ETAPA PRODUCTIVA</i></h2>
                <h4 className="h4-planeacion">CONCERTACIÓN PLAN DE TRABAJO DE LA ETAPA PRODUCTIVA</h4>

                <table className="table-planeacion">
                    <thead>
                        <tr>
                            <th className="actividad-titulo th-head-planeacion">ACTIVIDADES A DESARROLLAR
                                <h6><i>Relacionar funciones o actividades que respondan al resultado de aprendizaje de la Etapa Productiva y al Perfil del egresado establecido en el programa de formación.</i></h6>

                            </th>
                            <th className="td-evidencia th-head-planeacion">EVIDENCIAS DE APRENDIZAJE</th>
                            <th className="recolecta-evidencia th-head-planeacion">RECOLECCIÓN DE EVIDENCIAS
                                <tr className="fecha-lugar">
                                    <th>Fecha</th>
                                    <th>Lugar</th>
                                </tr>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.planeacion && formData.planeacion.actividades && formData.planeacion.actividades.map((actividad, index) => (
                            <tr key={index} className="table-tr-planeacion">
                                <td>{actividad.nombre_actividad}</td>
                                <td className="campo-check-actividades"><input type="checkbox" className="input-check-tabla" checked={actividad.tiene_evidencia_aprendizaje} /></td>
                                <td className="fecha-lugar-evidencia">
                                    <tr>
                                        <th>{actividad.fecha_recoleccion_evidencia}</th>
                                        <th>{actividad.lugar_recoleccion_evidencia}</th>
                                    </tr>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
                <div className="observaciones-planeacion">
                    <h5>OBSERVACIONES:</h5>
                    <textarea>{formData.planeacion?.observaciones ?? ""}</textarea>
                </div>

                <div className="firmas-planeacion">
                    <div className="camp-firma-planeacion">

                        <img className="imagen-firma" alt="firma" src={formData.planeacion?.firma_enteconformador ?? ""} />
                        <h6>{formData.planeacion?.nombre_enteconformador ?? ""}</h6>
                        <label>Nombre y Firma del ente Coformador:</label>

                    </div>
                    <div className="camp-firma-planeacion">

                        <img className="imagen-firma" alt="firma" src={formData.planeacion?.firma_aprendiz ?? ""} />
                        <label>Firma del Aprendiz:</label>
                    </div>
                    <div className="camp-firma-planeacion">

                        <img className="imagen-firma" alt="firma" src={formData.planeacion?.firma_instructor ?? ""} />
                        <h6>{formData.planeacion?.nombre_instructor ?? ""}</h6>

                        <label>Nombre y firma Funcionario SENA:</label>
                    </div>
                </div>
            </div>
        )
    }




    const Seguimiento = ({ formData }) => {
        return (

            <div className='seguimiento'>

                <h2 className='titulo-seguimiento'> <i>3. SEGUIMIENTO ETAPA PRODUCTIVA </i> </h2>


                <div className='tipo-informe'>

                    <div className='informe borde-right'>
                        <h6 className='borde-right'><strong>TIPO INFORME</strong></h6>

                        <section>

                            <div className='parcial margin-botton'><h6 > Parcial:</h6>
                                <input className='input-check' type="checkbox" name="opcion1" value="opcion1"
                                    checked={formData.seguimiento && formData.seguimiento.tipo_informe === 'Parcial'}
                                ></input>
                            </div>

                            <div className='parcial'><h6>Final:</h6>
                                <input className='input-check' type="checkbox" name="opcion2" value="opcion2"
                                    checked={formData.seguimiento && formData.seguimiento.tipo_informe === 'Final'}></input>
                            </div>


                        </section>
                    </div>

                    <div className='informe'>

                        <h6 className='borde-right'><strong>PERÍODO EVALUADO</strong></h6>
                        <section>
                            <div className='parcial  margin-botton'><h6>Inicio:</h6>
                                <h6>{formData.seguimiento?.periodo_evaluado_inicio ?? ""}</h6>
                            </div>
                            <div className='parcial  '><h6>Finalización:</h6>
                                <h6>{formData.seguimiento?.periodo_evaluado_final ?? ""}</h6>
                            </div>

                        </section>
                    </div>
                </div>



                <div className='factores'>
                    <h5 className='title-factores'> <i>FACTORES ACTITUDINALES Y COMPORTAMENTALES</i></h5>


                    <div className='head-factores'>

                        <div className='variable'>
                            <h5> <strong>VARIABLE</strong></h5>
                        </div>
                        <div>
                            <h5> <strong>DESCRIPCIÓN</strong></h5>
                        </div>

                        <div className='valoracion'>

                            <h5 className='titulo-valoracion'> <strong>VALORACIÓN</strong></h5>
                            <h6 className='titulo-sactisfactor'> <strong>Sactisfactorio</strong></h6>
                            <h6 className='titulo-por-mejorar'> <strong>Por mejorar</strong></h6>
                        </div>

                        <div className='observ'>
                            <h5> <strong>Observación</strong></h5>
                        </div>

                    </div>

                    <section className='actividades-evidencias'>


                        {formData.seguimiento && formData.seguimiento.factores_actitudinales && formData.seguimiento.factores_actitudinales.map((factor_actitudinal, index) => (


                            <div key={index} className='info-factores'>

                                <div className='t-variables'>
                                    <h6> <strong>{factor_actitudinal.variable}</strong></h6>
                                </div>
                                <div className='descrip' >
                                    <p>{factor_actitudinal.descripcion}</p>
                                </div>

                                <div className='valoracion-check'>

                                    <div className='input-1'> <input className='input-check' type="checkbox" name="opcion1" value="opcion1"
                                        checked={factor_actitudinal && factor_actitudinal.satisfactorio === true}
                                    ></input></div>

                                    <input type="checkbox" name="opcion1" value="opcion1"
                                        checked={factor_actitudinal && factor_actitudinal.satisfactorio === false}></input>

                                </div>

                                <div>
                                    <h5>{factor_actitudinal?.observaciones ?? ""}</h5>
                                </div>

                            </div>
                        ))}


                    </section>
                </div>


                <div className='factores-tecnicos'>
                    <h5 className='title-factores-tecnicos'> <i>FACTORES TÉCNICOS</i></h5>


                    <div className='head-factores-tecnicos'>

                        <div className='variable'>
                            <h5> <strong>VARIABLE</strong></h5>
                        </div>
                        <div>
                            <h5> <strong>DESCRIPCIÓN</strong></h5>
                        </div>

                        <div className='valoracion'>

                            <h5 className='titulo-valoracion'> <strong>VALORACIÓN</strong></h5>
                            <h6 className='titulo-sactisfactor'> <strong>Sactisfactorio</strong></h6>
                            <h6 className='titulo-por-mejorar'> <strong>Por mejorar</strong></h6>
                        </div>

                        <div className='observ'>
                            <h5> <strong>Observación</strong></h5>
                        </div>

                    </div>

                    <section className='actividades-evidencias-tecnicos'>

                        {formData.seguimiento && formData.seguimiento.factores_tecnicos && formData.seguimiento.factores_tecnicos.map((factor_tecnico, index) => (
                            <div key={index} className='info-factores'>

                                <div className='t-variables'>
                                    <h6> <strong>{factor_tecnico?.variable ?? ""}</strong></h6>
                                </div>
                                <div className='descrip' >
                                    <p> {factor_tecnico?.descripcion ?? ""}</p>
                                </div>

                                <div className='valoracion-check'>

                                    <div className='input-1'> <input className='input-check' type="checkbox" name="opcion1" value="opcion1"
                                        checked={factor_tecnico && factor_tecnico.satisfactorio === true}></input></div>

                                    <input className='input-check' type="checkbox" name="opcion1" value="opcion1"
                                        checked={factor_tecnico && factor_tecnico.satisfactorio === false}></input>

                                </div>

                                <div>
                                    <h5>{factor_tecnico?.observaciones ?? ""}</h5>
                                </div>

                            </div>
                        ))}

                    </section>
                </div>


                <div className="observaciones-seguimiento">
                    <div className="subtitulo"> <strong>Observaciones del responsable ente Coformador.</strong> <i>
                        (Sus observaciones proporcionan información que aporta al
                        mejoramiento de la calidad de la Formación Profesional Integral):</i></div>
                    <textarea rows="1" value={formData.seguimiento?.observaciones_ente_conformador ?? ""}> </textarea>
                </div>
                <div className="observaciones-seguimiento-aprendiz">
                    <div className="subtitulo"> <strong>Observaciones del Aprendiz:</strong> </div>
                    <textarea rows="1" value={formData.seguimiento?.observaciones_aprendiz ?? ""}></textarea>
                </div>
            </div>
        )
    }


    const Evaluacion = ({ formData }) => {
        return (

            <div className="evaluacion">
                <h2 className='info-titulo titulo2'> <i>4. EVALUACIÓN ETAPA PRODUCTIVA</i> </h2>

                <div className='espacio-div'></div>



                <div className="juicio-evaluativo">

                    <h6>JUICIO DE EVALUACIÓN:</h6>
                    <div className='div-juicio'><input type='checkbox' checked={formData.evaluacion && formData.evaluacion.juicio_evaluacion === 'aprobado'}></input>
                        <h6><strong>APROBADO</strong></h6></div>

                    <div className='div-juicio'>
                        <input type='checkbox' checked={formData.evaluacion && formData.evaluacion.juicio_evaluacion === 'no aprobado'}></input>
                        <h6><strong>NO APROBADO</strong></h6>
                    </div>

                </div>


                <div className="reconocimiento">


                    <div className='div-reco'>
                        <h6>RECONOCIMIENTOS ESPECIALES SOBRE EL DESEMPEÑO:</h6>

                        <div className='reco-calificacion'>
                            <h6><strong>SI</strong></h6>
                            <input type='checkbox' checked={formData.evaluacion && formData.evaluacion.reconocimientos_especiales === true} ></input>
                        </div>

                        <div className='reco-calificacion'>
                            <h6><strong>NO</strong></h6>
                            <input type='checkbox' checked={formData.evaluacion && formData.evaluacion.reconocimientos_especiales === false}></input>
                        </div>

                    </div>


                    <div className='especificacion'>

                        <h6>Especificar cuáles :</h6>
                        {formData.evaluacion && formData.evaluacion.reconocimientos_detalle && formData.evaluacion.reconocimientos_detalle.split('-').map((reconocimiento, index) => (
                            <li key={index}>{reconocimiento}</li>
                        ))}


                    </div>

                </div>


                <div className="firmas-evaluacion">
                    <div className="camp-firma-planeacion">

                        <img className="imagen-firma" alt="firma" src={formData.evaluacion?.firma_enteconformador ?? ""} />
                        <h6>{formData.evaluacion?.nombre_enteconformador ?? ""}</h6>
                        <label>Nombre y Firma del ente Coformador</label>

                    </div>
                    <div className="camp-firma-planeacion">

                        <img className="imagen-firma" alt="firma" src={formData.evaluacion?.firma_aprendiz ?? ""} />
                        <label>Firma del Aprendiz</label>
                    </div>
                    <div className="camp-firma-planeacion">

                        <img className="imagen-firma" alt="firma" src={formData.evaluacion?.firma_instructor ?? ""} />
                        <h6>{formData.evaluacion?.nombre_instructor ?? ""}</h6>

                        <label>Nombre y firma Funcionario SENA</label>
                    </div>
                </div>


            </div>
        )
    }
    // const {formData, updateFormData } = useFormContext();
    // console.log("esto es lo que llego del contexto", formData.seguimiento)
    const [formData, setFormData] = useState([]); // Estado para almacenar los datos de la API



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await clienteAxios.get(`/api/formato/visualizar/?aprendiz_id=${id}`);
                const responseData = response.data;

                setFormData(responseData); // Actualiza el estado formData con los datos obtenidos de la API


            } catch (error) {
                console.error('Error al obtener los datos de la API:', error);
            }
        };

        fetchData();
    }, [id]); //

    function Hola(){
        
       
    }

    return (
        <Fragment >
            <Header />
            <Apps />
            <section className='container'>
                <Link to={"#"} aria-label="icon" className=" btn-atras" onClick={() => history.goBack()}>
                    <img src={atras}></img>

                    <b>Regresar</b>
                </Link>
                <MainSection />

             
                <div className='btns-descargar-pdf' >
                    <button className='btn btn-pdf-formato' onClick={generatePDF}>Generar PDF</button>

                    <PDFDownloadLink document={imagePage.length > 0 ? <ImagenPDF imagePages={imagePage} /> : null} fileName={`(${formData?.numero_documento ?? ""}) FORMATO PLANEACIÓN, SEGUIMIENTO Y EVALUACIÓN ETAPA PRODUCTIVA.pdf`}>
                        {({ loading }) =>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {loading && <Spinner animation="grow" size="lg" />} {/* Muestra el spinner si loading es true */}
                                <span style={{ marginLeft: '8px' }}>{loading ? 'Generando PDF' : 'Descargar documento'}</span> {/* Muestra el texto dependiendo de si loading es true o false */}
                            </div>
                        }
                    </PDFDownloadLink>
                </div>

                <section className='section-pdf' >
                    <div className="imagen-planeacion" >

                        <div className='img-header'>
                            <img src={logo}></img>
                        </div>



                        <div ref={imageRefs.informacionGeneral}><InformacionGeneral /></div>

                        <div ref={imageRefs.planeacion}>  <Planeacion formData={formData} /></div>

                        <div ref={imageRefs.seguimiento}> <Seguimiento formData={formData} /></div>

                        <div ref={imageRefs.evaluacion}><Evaluacion formData={formData} /></div>



                    </div>


                </section>
                <div class="container container__img">
                    <div class="message">
                        La generación de PDF solo está permitida en computadoras.
                    </div>
                    <div class="image-container">
                        <img src={imgPdf} alt="Computer Icon" />
                    </div>
                </div>
            </section>


        </Fragment>
    );

};

export default FormatoE;
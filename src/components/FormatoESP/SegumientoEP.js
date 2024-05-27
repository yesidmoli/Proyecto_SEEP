import React, { Fragment, useEffect, useState } from 'react';
import './css/seguimientoEP.css'; // Asegúrate de importar tu archivo de estilos
import { Link } from 'react-router-dom';
import { useFormContext } from './FormProvide';
function SeguimientoEP({ goToNextComponent, data }) {

    const rol = localStorage.getItem('rol')


    const [factoresActitudinales, setFactoresActitudinales] = useState([
        {

            variable: "RELACIONES INTERPERSONALES",
            descripcion: "Desarrolla relaciones interpersonales con las personas de los diferentes niveles del ente Conformador en forma armoniosa, respetuosa y enmarcada dentro de los principios de convivencia social.",
            satisfactorio: false,
            observacion: ""
        },
        {

            variable: "TRABAJO EN EQUIPO",
            descripcion: "Participa en forma activa y propositiva en equipo de trabajo asumiendo los roles, de acuerdo con sus fortalezas.",
            satisfactorio: false,
            observacion: ""
        },
        {

            variable: "SOLUCIÓN DE PROBLEMAS",
            descripcion: "Propone alternativas de solución a situaciones problemáticas, en el contexto del desarrollo de su etapa productiva.",
            satisfactorio: false,
            observacion: ""
        },
        {

            variable: "CUMPLIMIENTO",
            descripcion: "Asume compromiso de las funciones y responsabilidades asignadas en el desarrollo de su trabajo.",
            satisfactorio: false,
            observacion: ""
        },
        {

            variable: "ORGANIZACIÓN",
            descripcion: "Demuestra capacidad para ordenar y disponer los elementos necesarios e información para facilitar la ejecución de un trabajo y el logro de los objetivos.",
            satisfactorio: false,
            observacion: ""
        }
    ]);

    const [factoresTecnicos, setFactoresTecnicos] = useState([
        {
            variable: "TRANSFERENCIA DE CONOCIMIENTO",
            descripcion: "Demuestra las competencias específicas del programa de formación en situaciones reales de trabajo.",
            satisfactorio: false,
            observacion: ""
        },
        {

            variable: "MEJORA CONTINUA",
            descripcion: "Aporta al mejoramiento de los procesos propios de su desempeño.",
            satisfactorio: false,
            observacion: ""
        },
        {

            variable: "FORTALECIMIENTO OCUPACIONAL",
            descripcion: "Autogestiona acciones que fortalezcan su perfil ocupacional en el marco de su proyecto de vida.",
            satisfactorio: false,
            observacion: ""
        },
        {

            variable: "OPORTUNIDAD Y CALIDAD",
            descripcion: "Presenta con oportunidad y calidad los productos generados en el desarrollo de sus funciones y actividades.",
            satisfactorio: false,
            observacion: ""
        },
        {

            variable: "RESPONSABILIDAD AMBIENTAL",
            descripcion: "Administra los recursos para el desarrollo de sus actividades con criterios de responsabilidad ambiental.",
            satisfactorio: false,
            observacion: ""
        },
        {

            variable: "ADMINISTRACIÓN DE RECURSOS",
            descripcion: "Utiliza de manera racional los materiales, equipos y herramientas suministradas para el desempeño de sus actividades.",
            satisfactorio: false,
            observacion: ""
        },
        {

            variable: "SEGURIDAD OCUPACIONAL E INDUSTRIA",
            descripcion: "Utiliza los elementos de seguridad y salud ocupacional de acuerdo con la normatividad vigente establecida para sus actividades o funciones.",
            satisfactorio: false,
            observacion: ""
        },
        {

            variable: "DOCUMENTACIÓN ETAPA PRODUCTIVA",
            descripcion: "Actualiza permanentemente el portafolio de evidencias.",
            satisfactorio: false,
            observacion: ""
        }
    ]);


    //obtener los otros datos del formulario

    const [tipoInforme, setTipoInforme] = useState('');
    const [inicio, setInicio] = useState('');
    const [finalizacion, setFinalizacion] = useState('');
    const [observacionesEnte, setObservacionesEnte] = useState('');
    const [observacionesAprendiz, setObservacionesAprendiz] = useState('');

    const { formData: { seguimiento: contextFormData }, updateFormData } = useFormContext();; // Renombramos el formData del contexto para evitar conflictos
    

    // console.log("los tecnicos", factoresTecnicos)
    // console.log("los actitud", factoresActitudinales)
    const [formData, setSeguimiento] = useState({
        factores_actitudinales: factoresActitudinales,
        factores_tecnicos: factoresTecnicos,
        tipo_informe: "",
        periodo_evaluado_inicio: "",
        periodo_evaluado_final: "",
        observaciones_ente_conformador: "",
        observaciones_aprendiz: ""
    })



    useEffect(() => {

        //vsalidamos que si haya algo en lo que llega del contexo, si es asi se actuliza el formData de los contratio no
        if (contextFormData && Object.keys(contextFormData).length !== 0) {
            setSeguimiento(contextFormData);
        }
    }, [contextFormData]);

    //   useEffect(() => {
    //     updateFormData(formData); // Actualizamos el contexto con los datos del formulario local
    //   }, []);

  

    const handleChange = (field, value) => {
        setSeguimiento(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleChangeActitudinal = (index, isChecked) => {
        setSeguimiento(prevState => {
            const updatedFactoresActitudinales = [...prevState.factores_actitudinales];
            updatedFactoresActitudinales[index].satisfactorio = isChecked;
            return { ...prevState, factores_actitudinales: updatedFactoresActitudinales };
          });
    };

    const handleChangeObservacionActitudinal = (index, value) => {
        setSeguimiento(prevState => {
            const updatedFactoresActitudinales = [...prevState.factores_actitudinales];
            updatedFactoresActitudinales[index].observacion = value;
            return { ...prevState, factores_actitudinales: updatedFactoresActitudinales };
          });
    };

    const handleChangeTecnico = (index, isChecked) => {
        setSeguimiento(prevState => {
            const updatedFactoresTecnicos = [...prevState.factores_tecnicos];
            updatedFactoresTecnicos[index].satisfactorio = isChecked;
            return { ...prevState, factores_tecnicos: updatedFactoresTecnicos };
          });
    };

    const handleChangeObservacionTecnico = (index, value) => {
        const updatedFactoresTecnicos = [...factoresTecnicos];
        updatedFactoresTecnicos[index].observacion = value;
        setFactoresTecnicos(updatedFactoresTecnicos);
    };
    



    const guardarDatos = () => {
        console.log('Guardando datos...');
        goToNextComponent(formData);
        updateFormData('seguimiento',formData)
    };

    return (
        <Fragment>
            <div className="container container_seguimiento">
                <h1 className="h1-seguimiento">3.SEGUIMIENTO ETAPA PRODUCTIVA</h1>
                <div className="module">
                    <table>
                        <thead>
                            <tr>
                                <th>TIPO DE INFORME</th>
                                <th>PERÍODO EVALUADO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <select disabled={rol==="aprendiz"} value={formData.tipo_informe} id="tipo-informe" name="tipo-informe" required onChange={(e) => handleChange('tipo_informe', e.target.value)}>
                                        <option value="seleccionar">seleccionar</option>
                                        <option value="Parcial">Parcial</option>
                                        <option value="Final">Final</option>
                                    </select>
                                </td>
                                <td>
                                    <th>Inicio
                                        <input  disabled={rol==="aprendiz"} value={formData.periodo_evaluado_inicio} type='date' onChange={(e) => handleChange('periodo_evaluado_inicio', e.target.value)}></input>
                                    </th>
                                    <th>Finalización <input value={formData.periodo_evaluado_final} type='date' onChange={(e) => handleChange('periodo_evaluado_final', e.target.value)}></input></th>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <h5 >FACTORES ACTITUDINALES Y COMPORTAMENTALES</h5>
                    <table id="tabla_seguimiento_actitudinal">
                        <thead>
                            <tr>
                                <th>Variable</th>
                                <th>Descripción</th>
                                <th>Valoración: Sactisfactorio, Por mejorar</th>
                                <th>Observación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {factoresActitudinales.map((factor, index) => (
                                <tr key={index}>
                                    <td>{factor.variable}</td>
                                    <td>{factor.descripcion}</td>
                                    <td>
                                        <input
                                            disabled={rol==="aprendiz"}
                                            className='input-planeacion'
                                            type="checkbox"
                                            id={`satisfactorio_actitudinal_${index}`}
                                            name={`satisfactorio_actitudinal_${index}`}
                                            checked={formData.factores_actitudinales[index] && formData.factores_actitudinales[index].satisfactorio }
                                            onChange={(e) => handleChangeActitudinal(index, e.target.checked)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            disabled={rol==="aprendiz"}
                                            className='input-planeacion'
                                            type="text"
                                            id={`observacion_actitudinal_${index}`}
                                            name={`observacion_actitudinal_${index}`}
                                            value={formData.factores_actitudinales[index] && formData.factores_actitudinales[index].observacion}
                                            onChange={(e) => handleChangeObservacionActitudinal(index, e.target.value)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h5>FACTORES TÉCNICOS</h5>
                    <table id="tabla_seguimiento_tecnico">
                        <thead>
                            <tr>
                                <th>Variable</th>
                                <th>Descripción</th>
                                <th>Valoración: Sactisfactorio, Por mejorar</th>
                                <th>Observación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {factoresTecnicos.map((factor, index) => (
                                <tr key={index}>
                                    <td>{factor.variable}</td>
                                    <td>{factor.descripcion}</td>
                                    <td>
                                        <input
                                            disabled={rol==="aprendiz"}
                                            className='input-planeacion'
                                            type="checkbox"
                                            id={`satisfactorio_tecnico_${index}`}
                                            name={`satisfactorio_tecnico_${index}`}
                                            checked={formData.factores_tecnicos[index] && formData.factores_tecnicos[index].satisfactorio } // Aquí establecemos el valor del checkbox
                                            onChange={(e) => handleChangeTecnico(index, e.target.checked)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            disabled={rol==="aprendiz"}
                                            className='input-planeacion'
                                            type="text"
                                            id={`observacion_tecnico_${index}`}
                                            name={`observacion_tecnico_${index}`}
                                            value={formData.factores_tecnicos[index] && formData.factores_tecnicos[index].observacion}
                                            onChange={(e) => handleChangeObservacionTecnico(index, e.target.value)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className='div-observaciones'>
                        <h6 >Observaciones del responsable ente Conformador.  <i>(Sus observaciones proporcionan información que aporta al mejoramiento de la calidad de la Formación Profesional Integral)</i></h6>

                        <textarea value={formData.observaciones_ente_conformador} name="observaciones1" rows="2" onChange={(e) => handleChange('observaciones_ente_conformador', e.target.value)}></textarea>
                    </div>



                    <div className='div-observaciones'>
                        <h6 >Observaciones del Aprendiz.</h6>


                        <textarea value={formData.observaciones_aprendiz} name="observaciones1" rows="2" onChange={(e) => handleChange('observaciones_aprendiz', e.target.value)}></textarea>

                    </div>
                    <button id='guardar-seguimientoep' onClick={guardarDatos}>Guardar</button>
                    {/* <Link to="/evaluacion_EP" className="custom-button">Siguiente</Link> */}
                </div>
            </div>
        </Fragment>
    );
}

export default SeguimientoEP;

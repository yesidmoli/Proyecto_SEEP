import React, { Fragment } from 'react';
import './css/seguimientoEP.css'; // Asegúrate de importar tu archivo de estilos
import { Link } from 'react-router-dom';

function SeguimientoEP() {

  const guardarDatos = () => {
    // Lógica para guardar datos
    console.log('Guardando datos...');
  };

  return (
    <Fragment>
       <div className="container_seguimiento">
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
                                <select id="tipo-informe" name="tipo-informe" required>
                                    <option value="seleccionar">seleccionar</option>
                                    <option value="Parcial">Parcial</option>
                                    <option value="Final">Final</option>
                                </select>
                            </td>
                            <td>
                                <select id="periodo-evaluacion" name="periodo-evaluacion" required>
                                    <option value="seleccionar">seleccionar</option>
                                    <option value="Parcial">inicio</option>
                                    <option value="Final">Finalización</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <h2 className="h2-seguimiento">FACTORES ACTITUDINALES Y COMPORTAMENTALES</h2>
                
                <table id="tabla_seguimiento">
                    
                    
                    <tr>
                        <th id="Variables">VARIABLE</th>
                        <th id="descripcion">DESCRIPOCIÓN</th>
                        <th id="valoracion_satisfatorio_pormejorar">VALORACIÓN, Satisfactorio, Por mejorar</th>
                        <th id="observacion">Observación</th>
                    </tr>
                    <tr>
                        <th id="relacionex_interpersonales">RELACIONES INTERPERSONALES</th>
                        <th>Desarrolla relaciones interpersonales con las personas de los diferentes niveles del ente Conformador en forma armoniosa, respetuosa y enmarcada dentro de los principios de convivencia social.</th>
                        <td><textarea id="valoracion_satisfatorio_pormejorar" name="valoracion_satisfatorio_pormejorar" rows="2"></textarea></td>
                        <td><textarea id="observacion" name="observacion" rows="2"></textarea></td>
                    </tr>
                    <tr>
                        <th id="trabajo_en_equipo">TRABAJO EN EQUIPO</th>
                        <th>Participa en forma activa y propositiva en equipo de trabajo asumiendo los roles, de acuerdo con sus fortalezas.</th>
                        <td><textarea id="valoracion_satisfatorio_pormejorar" name="valoracion_satisfatorio_pormejorar" rows="2"></textarea></td>
                        <td><textarea id="observacion" name="observacion" rows="2"></textarea></td>
                    </tr>
                    <tr>
                        <th id="solucion_de_problemas">SOLUCIÓN DE PROBLEMAS</th>
                        <th>Propone alternativas de solución a situaciones problemáticas, en el contexto del desarrollo de su etapa productiva.</th>
                        <td><textarea id="valoracion_satisfatorio_pormejorar" name="valoracion_satisfatorio_pormejorar" rows="2"></textarea></td>
                        <td><textarea id="observacion" name="observacion" rows="2"></textarea></td>
                    </tr>
                    <tr>
                        <th id="cumplimiento">CUMPLIMIENTO</th>
                        <th>Asume compromiso de las funciones y resposabilidades asignadas en el desarrollo de su trabajo.</th>
                        <td><textarea id="valoracion_satisfatorio_pormejorar" name="valoracion_satisfatorio_pormejorar" rows="2"></textarea></td>
                        <td><textarea id="observacion" name="observacion" rows="2"></textarea></td>
                    </tr>
                    <tr>
                        <th id="organizacion">ORGANIZACIÓN</th>
                        <th>Demuestra capacidad para ordenar y disponer los elementos necesarios e información para facilitar la ejecución de un trabajo y el logro de los objetivos.</th>
                        <td><textarea id="valoracion_satisfatorio_pormejorar" name="valoracion_satisfatorio_pormejorar" rows="2"></textarea></td>
                        <td><textarea id="observacion" name="observacion" rows="2"></textarea></td>
                    </tr>
                    
                        <h3 className="h3-seguimiento">FACTORES TÉNICOS</h3>

                        <tr>
                            <th id="Variables">VARIABLE</th>
                            <th id="descripcion">DESCRIPOCIÓN</th>
                            <th id="valoracion_satisfatorio_pormejorar">VALORACIÓN, Satisfactorio, Por mejorar</th>
                            <th id="observacion">Observación</th>
                        </tr>
                        <tr>
                            <th id="relacionex_interpersonales">TRANSFERENCIA DE CONOCIMIENTO</th>
                            <th>Demuestra las competencias específicas del programa de formación en situaciones reales de trabajo.</th>
                            <td><textarea id="valoracion_satisfatorio_pormejorar" name="valoracion_satisfatorio_pormejorar" rows="2"></textarea></td>
                            <td><textarea id="observacion" name="observacion" rows="2"></textarea></td>
                        </tr>
                        <tr>
                            <th id="trabajo_en_equipo">MEJORA CONTINUA</th>
                            <th>Aporta al mejoramiento de los procesos propios de su desempeño.</th>
                            <td><textarea id="valoracion_satisfatorio_pormejorar" name="valoracion_satisfatorio_pormejorar" rows="2"></textarea></td>
                            <td><textarea id="observacion" name="observacion" rows="2"></textarea></td>
                        </tr>
                        <tr>
                            <th id="solucion_de_problemas">FORTALECIMIENTO OCUPACIONAL</th>
                            <th>Autogestiona acciones que fortalezca su perfil acupacional en el marco de su proyecto de vida.</th>
                            <td><textarea id="valoracion_satisfatorio_pormejorar" name="valoracion_satisfatorio_pormejorar" rows="2"></textarea></td>
                            <td><textarea id="observacion" name="observacion" rows="2"></textarea></td>
                        </tr>
                        <tr>
                            <th id="cumplimiento">OPORTUNIDAD Y CALIDAD</th>
                            <th>Presenta con oportunidad y calidad los productos generados en el desarrollo de sus funciones y actividades.</th>
                            <td><textarea id="valoracion_satisfatorio_pormejorar" name="valoracion_satisfatorio_pormejorar" rows="2"></textarea></td>
                            <td><textarea id="observacion" name="observacion" rows="2"></textarea></td>
                        </tr>
                        <tr>
                            <th id="organizacion">RESPOSABILIDAD AMBIENTAL</th>
                            <th>Administra los recursos para el desarrollo de sus actividades con criterios de resposabilidad ambiental.</th>
                            <td><textarea id="valoracion_satisfatorio_pormejorar" name="valoracion_satisfatorio_pormejorar" rows="2"></textarea></td>
                            <td><textarea id="observacion" name="observacion" rows="2"></textarea></td>
                        </tr>
                        <tr>
                            <th id="organizacion">ADMINISTRACIÓN DE RECURSOS</th>
                            <th>Utiliza de manera racional los materiales, equipos y herramientas suministradas para el desempeño de sus actividades.</th>
                            <td><textarea id="valoracion_satisfatorio_pormejorar" name="valoracion_satisfatorio_pormejorar" rows="2"></textarea></td>
                            <td><textarea id="observacion" name="observacion" rows="2"></textarea></td>
                        </tr>
                        <tr>
                            <th id="organizacion">SEGURIDAD OCUPACIONAL E INDUSTRIAL</th>
                            <th>Utliza los elementos de seguridad y salud ocupacional de acuerdo con la normatividad vigente establecida para sus actividades o funciones.</th>
                            <td><textarea id="valoracion_satisfatorio_pormejorar" name="valoracion_satisfatorio_pormejorar" rows="2"></textarea></td>
                            <td><textarea id="observacion" name="observacion" rows="2"></textarea></td>
                        </tr>
                        <tr>
                            <th id="organizacion">DOCUMENTACIÓN ETAPA PRODUCTIVA</th>
                            <th>Actualiza permanentemente el portafolio de evidencias.</th>
                            <td><textarea id="valoracion_satisfatorio_pormejorar" name="valoracion_satisfatorio_pormejorar" rows="2"></textarea></td>
                            <td><textarea id="observacion" name="observacion" rows="2"></textarea></td>
                        </tr>
                    </table>

                  
                        <th colSpan="4">Observaciones del responsable ente Conformador.(Sus observaciones proporcionan información que aporta al mejoramiento de la calidad de la Formación Profesional Integral):</th>
                        <tr>
                            <td><textarea id="observaciones1" name="observaciones1" rows="2"></textarea></td>
                        </tr>
                 
               
                <button type="button" id='guardar-seguimientoep' onClick={guardarDatos}>Guardar</button>
                <Link to="/evaluacion_EP" className="custom-button">Siguiente</Link>
            </div>
        </div>
      
    </Fragment>
  );
}

export default SeguimientoEP;

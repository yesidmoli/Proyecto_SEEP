import { Fragment } from "react"
import './styleTablas.css'
function Tablas() {
    return (
        <Fragment>
            <h2>PLANEACIÓN ETAPA PRODUCTIVA</h2>
            <h4 className="h4-planeacion">CONCERTACIÓN PLAN DE TRABAJO DE LA ETAPA PRODUCTIVA</h4>

            <table className="table-planeacion">
                <thead>
                    <tr>
                        <th className="actividad-titulo">ACTIVIDADES A DESARROLLAR
                            <h6><i>Relacionar funciones o actividades que respondan al resultado de aprendizaje de la Etapa Productiva y al Perfil del egresado establecido en el programa de formación.</i></h6>

                        </th>

                        <th className="td-evidencia">EVIDENCIAS DE APRENDIZAJE</th>
                        <th className="recolecta-evidencia">RECOLECCIÓN DE EVIDENCIAS
                            <tr className="fecha-lugar">
                                <th>Fecha</th>
                                <th>Lugar</th>
                            </tr>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="table-tr-planeacion">
                        <td>Revisión y análisis de documentos</td>
                        <td className="campo-check-actividades"><input type="checkbox" className="input-check-tabla"></input></td>

                        <td className="fecha-lugar-evidencia">
                            <tr >
                                <th>Fecha</th>
                                <th>Lugar</th>
                            </tr>
                        </td>
                    </tr>
                    <tr className="table-tr-planeacion">
                        <td>Revisión y análisis de documentos</td>
                        <td className="campo-check-actividades"><input type="checkbox" className="input-check-tabla"></input></td>

                        <td className="fecha-lugar-evidencia">
                            <tr >
                                <th>Fecha</th>
                                <th>Lugar</th>
                            </tr>
                        </td>
                    </tr>
                    <tr>
                        <td>Revisión y análisis de documentos</td>
                        <td className="campo-check-actividades"><input type="checkbox" className="input-check-tabla"></input></td>

                        <td className="fecha-lugar-evidencia">
                            <tr >
                                <th>Fecha</th>
                                <th>Lugar</th>
                            </tr>
                        </td>
                    </tr>


                </tbody>
            </table>
            <div className="observaciones-planeacion">
                <h5>OBSERVACIONES:</h5>
                <textarea></textarea>
            </div>

            <div className="firmas-planeacion">
                <div className="camp-firma-planeacion">

                    <img className="imagen-firma" alt="firma" />
                    <h6>Yesid</h6>
                    <label>Nombre y Firma del ente Coformador:</label>

                </div>
                <div className="camp-firma-planeacion">

                    <img className="imagen-firma" alt="firma" />
                    <label>Firma del Aprendiz:</label>
                </div>
                <div className="camp-firma-planeacion">

                    <img className="imagen-firma" alt="firma" />
                    <h6>Yesid</h6>

                    <label>Nombre y firma Funcionario SENA:</label>
                </div>
            </div>
        </Fragment>
    )
}
export default Tablas
import { Fragment, useEffect, useState } from "react"
import '../../../src/css/stylelista.css'
import clienteAxios from "../../config/axios";
import {Link } from "react-router-dom";

function ListaAprendices(props){

    //Extrae la propiedad numero de ficha
    const {numero_ficha} = props.match.params;
    //Muestra el número de la ficha
    console.log("este es el numero ficha", numero_ficha)

    const [aprendices, dataAprendices] = useState([]);

    useEffect ( () => {
        consultaAprendices()
    }, []);
    const consultaAprendices = async () =>{
        try{
            
            //Realiza la solicitud a la API
            const response = await clienteAxios.get(`/api/aprendices`, {
                params: {numero_ficha:numero_ficha}
            })
            //Si funciona, imprime los resultados de los aprendices
            console.log("estos son los aprendices de esa ficha", response.data.results)
            dataAprendices(response.data.results)
        }catch(error){
            //Muestra un error si lo hay
            console.log("este es el error", error)
        }

    }
    return(
        <Fragment>
             <div class="contenedor-lista">
                <div class="ficha">
                    <section className="info">
                    <img src="https://certificadossena.net/wp-content/uploads/2022/10/logo-sena-naranja-png-2022.png"  className="img-logo" alt="img"/>
                    <h4>Análisis y desarrollo de software</h4>
                    <h4>2653755</h4>
                    </section>
                   
                   <br></br>

                    <div class="texto">
                        <select class="seleccion"  name="acount-type">
                            <option value="" disabled selected hidden>Filtrar</option>
                            <option value="aprobado">Aprobado</option>
                            <option value="No aprobado">No aprobado</option>
                            <option value="Pendiente por aprobar">Pendiente por aprobar</option>
                            <option value="Aplazado">Aplazado</option>
                            <option value="Visita 1">Visita 1</option>
                            <option value="Visita 2">Visita 2</option>
                            <option value="Visita 3">Visita 3</option>
                            
                        </select>
                        </div>
                </div>

                <div class="lista">
                <h3 class="titulo-aprendices">Aprendices</h3>
                <ul class="lista-aprendices">
                    <li>
                    <div>
      {aprendices.map(aprendiz => (
        <div key={aprendiz.id}>
          <div className="img-aprendiz">
            <img src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" alt="img aprendiz" />
            <Link to="aprendiz.html">{`${aprendiz.nombres} ${aprendiz.apellidos}`}</Link>
          </div>
          <p>Aprendiz</p>
        </div>
      ))}
    </div></li>

                </ul>
            </div>
                </div>
            
        </Fragment>
    )
}
export default ListaAprendices
import { Fragment, useEffect, useState } from "react"
import '../../../src/css/stylelista.css';
import '../layout/Header';
import '../layout/MainSection';
import clienteAxios from "../../config/axios";
import {Link } from "react-router-dom";
import Header from "../layout/Header";
import MainSection from "../layout/MainSection";
import logoverde  from '../../../src/img/logo-sena.png'
function ListaAprendices(props){

    //Extrae la propiedad numero de ficha
    const {numero_ficha, programa} = props.match.params;
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
            <Header />
            <main className="container">
                <MainSection />
             <div class="contenedor-lista">
                <div class="ficha">
                    <section className="info">
                    <img src={logoverde}  className="img-logo" alt="img"/>
                    <h4>{programa}</h4>
                    <h4>{numero_ficha}</h4>
                    </section>
                   
                   <br></br>

                    <div class="texto">
                        {/* <select class="seleccion"  name="acount-type">
                            <option value="" disabled selected hidden>Filtrar</option>
                            <option value="aprobado">Aprobado</option>
                            <option value="No aprobado">No aprobado</option>
                            <option value="Pendiente por aprobar">Pendiente por aprobar</option>
                            <option value="Aplazado">Aplazado</option>
                            <option value="Visita 1">Visita 1</option>
                            <option value="Visita 2">Visita 2</option>
                            <option value="Visita 3">Visita 3</option>
                            
                        </select> */}
                        <div class="seleccion"><h6> Aprobado</h6></div>
                        <div class="seleccion">Pendiente Aprobar</div>
                        </div>
                </div>

                <div class="lista">
                <h3 class="titulo-aprendices">Aprendices</h3>
                <hr></hr>
                <ul class="lista-aprendices">
                {aprendices.map(aprendiz => (
                    <li  key={aprendiz.id}>

        <div className="img-aprendiz">
            <img src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" alt="img aprendiz" />
            <Link className="nombre-aprendiz" to={`/aprendiz/${aprendiz.id}`}>{`${aprendiz.nombres} ${aprendiz.apellidos}`}</Link>
          </div>
          <p>Aprendiz</p>
                    {/* <div>
      {aprendices.map(aprendiz => (
        <div key={aprendiz.id}>
          <div className="img-aprendiz">
            <img src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" alt="img aprendiz" />
            <Link className="nombre-aprendiz" to="aprendiz.html">{`${aprendiz.nombres} ${aprendiz.apellidos}`}</Link>
          </div>
          <p>Aprendiz</p>
        </div>
      ))}
    </div> */}
    </li>  ))}

                </ul>
            </div>
                </div>
                </main>
        </Fragment>
    )
}
export default ListaAprendices
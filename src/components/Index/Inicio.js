
import React, { Fragment, useEffect, useState } from 'react';
import clienteAxios from '../../config/axios';
import '../layout/Header';
import '../layout/MainSection';
import '../../../src/css/styleinicio.css'
import Header from '../layout/Header';
import MainSection from '../layout/MainSection';

//imagenes
import iconoBuscar from'../../img/buscar.jpeg' 

import InfoFicha from '../Fichas/InfoFicha';

import { useAuth } from '../context/AuthContext';

const Inicio = () => {

  const [fichas, guardarFicha] = useState([]) 

  const {token} = useAuth()

  //hace el envio
  const consultarApi = async() =>{ 

      //trae la consulta
      const consultarFicha = await clienteAxios.get('/api/fichas-instructor/',  {
        headers: {
            Authorization: `Token ${token}`,
        }
    }); 
      // console.log(consultarCliente);
      console.log(consultarFicha.data);

      guardarFicha(consultarFicha.data)
  }

  //es un hook, me controla toda la vida de los componentes, es decir me permite interactuar con todos los componentes
  useEffect( () => {
      consultarApi();
  }, []);


  // const [fichas, setFichas] = useState([]);

  // useEffect(() => {
  //   // Realiza una solicitud GET a la vista de Django que devuelve datos de fichas
  //   fetch('http://localhost:8000/api/fichas/') // Reemplaza con la URL correcta
  //     .then((response) => response.json())
  //     .then((data) => setFichas(data));
  // }, []);

  return (
    <Fragment>
    <Header />
   <main className='container'> 
   <MainSection />
    <section className="contendor-principal-info">
    

      
      <div className="fichas">
        <h1>Programas y fichas de formación</h1>
          <div className="buscar">
            <img src={iconoBuscar} alt="icon-buscar"/>
            <label htmlFor="buscar">Palabras clave:</label>
            <input  type="search" className="form-control" />
            <button  className="btn-buscar">Buscar</button>
          </div>
    </div>

    <section class="info-fichas">
    {fichas.map(ficha => (
        <InfoFicha
          key={ficha.id}
          ficha = {ficha}
        />
      ))}
      
    </section>
    
    </section>
    
    </main>
    </Fragment>
  );
};

export default Inicio;
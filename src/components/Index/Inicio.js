
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import clienteAxios from '../../config/axios';
import '../layout/Header';
import '../layout/MainSection';
import '../../../src/css/styleinicio.css'
import Header from '../layout/Header';
import MainSection from '../layout/MainSection';

import ReactSearchBox from "react-search-box";

import logoSena from '../../img/logo-sena.png'
//imagenes
import iconoBuscar from'../../img/buscar.jpeg' 

import InfoFicha from '../Fichas/InfoFicha';
import { useAuth } from '../context/AuthContext';
import Apps from '../layout/menu/App';
const Inicio = () => {


  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);

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
      setFilteredData(fichas);
  }, []);

  //   actualizar el estado searchValue con el valor de búsqueda ingresado por el usuario
  const handleSearch = (name) => {
    setSearchValue(name);

  };

  // const [fichas, setFichas] = useState([]);

  // useEffect(() => {
  //   // Realiza una solicitud GET a la vista de Django que devuelve datos de fichas
  //   fetch('http://localhost:8000/api/fichas/') // Reemplaza con la URL correcta
  //     .then((response) => response.json())
  //     .then((data) => setFichas(data));
  // }, []);

  return (
    <Fragment>
      <Apps />
    <Header />
   <main className='container'> 
   <MainSection />
    <section className="contendor-principal-info">
    

      
      <div className="fichas">
        <h1>Programas y fichas de formación</h1>
          <div className="buscar">
            <i class="bi bi-search"></i>
            <label htmlFor="buscar">Palabras clave:</label>
            {/* <input  type="search" className="form-control" />
            <button  className="btn-buscar">Buscar</button> */}
             <ReactSearchBox
        placeholder="Buscar ..."
        value={searchValue}
        onChange={handleSearch}
        data={filteredData}
        fuseConfigs={{ threshold: 0.2 }}
        inputHeight="3rem"
        
        iconBoxSize={"5rem"}
        inputFontSize="1.3rem"
      />
          </div>

    </div>
    

    <section class="info-fichas">
  {searchValue ? (
    // Si hay un valor de búsqueda, aplica el filtro a deudas
    fichas
      .filter(
        (item) =>
          item.nombre_programa
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          item.nivel_formacion
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          item.numero_ficha.includes(searchValue.toLowerCase())
      )
      .map((filteredItem) => (
        <Link
          className="ficha-info"
          to={`/lista-aprendices/${filteredItem.numero_ficha}/${filteredItem.nombre_programa}`}
        >
          <div className="rectangulo-ficha">
            <div className="logo-info">
              <img src={logoSena} width="90" alt="lista" />
            </div>
            <div className="texto-info">
              <Link
                className="title1"
                to={`/lista-aprendices/${filteredItem.numero_ficha}/${filteredItem.nombre_programa}`}
              >
                {filteredItem.nombre_programa}
              </Link>
              <p className="title2">{filteredItem.nombre_programa}</p>
              <p className="aprendiz">{filteredItem.nivel_formacion}</p>
              <div className="codigo-ficha">
                <p className="ficha">Ficha:</p>
                <p className="numero-ficha">{filteredItem.numero_ficha}</p>
              </div>
            </div>
          </div>
        </Link>
      ))
  ) : (
    // Si no hay un valor de búsqueda, muestra todas las fichas
    fichas.map((ficha) => (
      <InfoFicha key={ficha.id} ficha={ficha} />
    ))
  )}
</section>

  
    </section>
    
    </main>
    </Fragment>
  );
};

export default Inicio;
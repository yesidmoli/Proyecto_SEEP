import React, { useState, Fragment } from "react";
import { useEffect } from "react"
import Apps from "../layout/menu/App";
import Header from "../layout/Header"
import MainSection from "../layout/MainSection"
import ReactSearchBox from "react-search-box";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "../../css/bitacoras.css";
import clienteAxios from "../../config/axios";
import { useAuth } from "../context/AuthContext";
const Bitacoras = () => {

  const[aprendices, dataAprendices] = useState([])
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const token = useAuth()
  const consultarDatosAprendiz = async () => {
    try {
      const response = await clienteAxios.get(`/api/aprendices/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      dataAprendices(response.data.results);
    } catch (error) {
      console.error('Error al consultar los aprendices:', error);
    }
  };
  useEffect(() => {
    consultarDatosAprendiz();
    setFilteredData(aprendices);
  }, []);

  //actualizar el estado searchValue con el valor de búsqueda ingresado por el usuario
  const handleSearch = (name) => {
    setSearchValue(name);

  };
  return (
    <div className="contenedor-main">
        <Fragment>
          <Apps />
            <Header />
        <section className="container conten-documentos">
                <MainSection />
                <div className="react-search-box ">
                  <ReactSearchBox
                  placeholder="Buscar Aprendiz..."
                  value={searchValue}
                  onChange={handleSearch}
                  data={filteredData}
                  fuseConfigs={{ threshold: 0.2 }}
                  inputHeight="3rem"
                  iconBoxSize={"5rem"}
                  inputFontSize="1.3rem"
                  />
                </div>

    <ul className="list-aprendices">
      <h1>Listado de aprendices</h1>
      {searchValue ? (
    // Si hay un valor de búsqueda, aplica el filtro a deudas
    aprendices.filter((item) =>
        item.nombres.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.apellidos.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.ficha.numero_ficha.includes(searchValue.toLowerCase()) ||
        item.numero_documento.includes(searchValue.toLowerCase())
      )
      .map((filteredItem) => (

        <Link to={`/bitacora-aprendiz/${filteredItem.id}`} className="item-link">
        <li className="item-aprendiz" key={filteredItem.key}>
          <i className="bi bi-file-earmark-pdf-fill"></i>
          <div className="datos-aprendiz-doc">
            <h5>{filteredItem.nombres} {filteredItem.apellidos}</h5>
            <h6> {filteredItem.tipo_documento}:{filteredItem.numero_documento}</h6>
            <h6>{filteredItem.ficha.numero_ficha}</h6>
          </div>
        </li>
        </Link>
        
      ))
  ) : (
    // Si no hay valor de búsqueda, muestra todas las deudas
    aprendices.map((item) => (
        <Link to={`/bitacora-aprendiz/${item.id}`} className="item-link">
      <li className="item-aprendiz" key={item.key}> 
      <i className="bi bi-file-earmark-pdf-fill"></i>
      <div className="datos-aprendiz-doc">
        <h5>{item.nombres} {item.apellidos}</h5>
        <h6>{item.tipo_documento}: {item.numero_documento}</h6>
        <h6> Ficha: {item.ficha.numero_ficha}</h6>
      </div>
      
      </li>
      </Link>
    ))
  )}
      </ul>
            </section>
        </Fragment>
    </div>
  );
};

export default Bitacoras;

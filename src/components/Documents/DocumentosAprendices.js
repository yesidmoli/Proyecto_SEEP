
import { Fragment, useEffect } from "react"
import Header from "../layout/Header"
import MainSection from "../layout/MainSection"
import ReactSearchBox from "react-search-box";
import { useState } from "react";
import clienteAxios from "../../config/axios";
import '../../css/documentos.css';

import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Apps from "../layout/menu/App";
function DocumentosAprendices (){

    const {token} = useAuth()
    const [aprendices, dataAprendices] = useState([])
    const [searchValue, setSearchValue] = useState('');
    const [filteredData, setFilteredData] = useState([]);


  useEffect(() => {
    consultarDatosCliente();
    setFilteredData(aprendices);
  }, []);

//   actualizar el estado searchValue con el valor de búsqueda ingresado por el usuario
  const handleSearch = (name) => {
    setSearchValue(name);

  };
      const consultarDatosCliente = async () => {
        try {
          // Realiza la consulta a la API para obtener datos de los clientes
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
    return(
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
      
      {searchValue ? (
    // Si hay un valor de búsqueda, aplica el filtro a deudas
    aprendices.filter((item) =>
        item.nombres.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.apellidos.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.ficha.numero_ficha.includes(searchValue.toLowerCase()) ||
        item.numero_documento.includes(searchValue.toLowerCase())
      )
      .map((filteredItem) => (

        <div  className="item-link">


        <li className="item-aprendiz" key={filteredItem.key}>
        <i class="bi bi-file-earmark-pdf-fill"></i>
        <div className="datos-aprendiz-doc">
       
        <h5>{filteredItem.nombres} {filteredItem.apellidos}</h5>
        <h6> {filteredItem.tipo_documento}:{filteredItem.numero_documento}</h6>
        <h6> Ficha: {filteredItem.ficha.numero_ficha}</h6>
        </div>
        <div className="btns-doc-aprendiz">
        <Link  to={`/documentos-aprendiz/${filteredItem.id}`} className="btn btn-success">Documentos</Link>
        <Link to={`/formato-etapa-productiva/${filteredItem.id}/${'index'}`} className="btn btn-formato">Formato</Link>
      </div>
       


        </li>
        </div>
        
      ))
  ) : (
    // Si no hay valor de búsqueda, muestra todas las deudas
    aprendices.map((item) => (
        <div className="item-link">
      <li className="item-aprendiz" key={item.key}> 
      <i class="bi bi-file-earmark-pdf-fill"></i>

      <div className="datos-aprendiz-doc">
        <h5>{item.nombres} {item.apellidos}</h5>
        <h6>{item.tipo_documento}: {item.numero_documento}</h6>
        <h6> Ficha: {item.ficha.numero_ficha}</h6>
      </div>

      <div className="btns-doc-aprendiz">
        <Link  to={`/documentos-aprendiz/${item.id}`} className="btn btn-success">Documentos</Link>
        <a href={`/formato-etapa-productiva/${item.id}/${'index'}`} className="btn btn-formato">Formato Productiva</a>
      </div>
    
      
      </li>
      </div>
    ))
  )}
      </ul>
            </section>
        </Fragment>
    )
}
export default DocumentosAprendices
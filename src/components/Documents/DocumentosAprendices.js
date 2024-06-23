import React, { Fragment, useEffect, useState } from "react";
import Header from "../layout/Header";
import MainSection from "../layout/MainSection";
import ReactSearchBox from "react-search-box";
import clienteAxios from "../../config/axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Apps from "../layout/menu/App";

function DocumentosAprendices() {
  const { token } = useAuth();

  const [aprendices, setAprendices] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2); // Inicializar con 5 ítems por página

  useEffect(() => {
    consultarDatosCliente();
  }, []);

  const consultarDatosCliente = async () => {
    try {
      const response = await clienteAxios.get(`/api/aprendices/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setAprendices(response.data.results);
      setFilteredData(response.data.results);
    } catch (error) {
      console.error('Error al consultar los aprendices:', error);
    }
  };

  const handleSearch = (name) => {
    setSearchValue(name);
    filterAprendices(name);
  };

  const filterAprendices = (searchTerm) => {
    const filtered = aprendices.filter((item) =>
      item.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ficha.numero_ficha.includes(searchTerm.toLowerCase()) ||
      item.numero_documento.includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Volver a la página 1 al filtrar
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeItemsPerPage = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Volver a la página 1 al cambiar el número de ítems por página
  };

  return (
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
          {currentItems.map((item) => (
            <div className="item-link" key={item.id}>
              <li className="item-aprendiz">
                <i className="bi bi-file-earmark-pdf-fill"></i>
                <div className="datos-aprendiz-doc">
                  <h5>{item.nombres} {item.apellidos}</h5>
                  <h6>{item.tipo_documento}: {item.numero_documento}</h6>
                  <h6>Ficha: {item.ficha.numero_ficha}</h6>
                </div>
                <div className="btns-doc-aprendiz">
                  <Link to={`/documentos-aprendiz/${item.id}`} className="btn btn-success">Documentos</Link>
                  <a href={`/formato-etapa-productiva/${item.id}/${'index'}`} className="btn btn-formato">Formato Productiva</a>
                </div>
              </li>
              
            </div>
            
          ))}
        </ul>

        {/* Botones de paginación */}
        <div className="pagination-buttons">
          <button className="boton-anterior" onClick={prevPage} disabled={currentPage === 1}>
            Anterior
          </button>
          <button className="boton-siguiente" onClick={nextPage} disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}>
            Siguiente
          </button>
        </div>
      </section>
    </Fragment>
  );
}

export default DocumentosAprendices;

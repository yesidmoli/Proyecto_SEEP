import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Apps from "../layout/menu/App";
import Header from "../layout/Header";
import MainSection from "../layout/MainSection";
import ReactSearchBox from "react-search-box";
import "../../css/bitacoras.css";
import clienteAxios from "../../config/axios";
import { useAuth } from "../context/AuthContext";
import Toast from "../layout/Toast";

const Bitacoras = () => {
  const [aprendices, setAprendices] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { token } = useAuth();

  const consultarDatosAprendiz = async () => {
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

  useEffect(() => {
    consultarDatosAprendiz();
  }, []);

  useEffect(() => {
    filterAprendices(searchValue);
  }, [searchValue, aprendices]);

  const handleSearch = (name) => {
    setSearchValue(name);
  };

  const filterAprendices = (searchTerm) => {
    if (searchTerm === '') {
      setFilteredData(aprendices);
    } else {
      const filtered = aprendices.filter((item) =>
        item.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ficha.numero_ficha.includes(searchTerm.toLowerCase()) ||
        item.numero_documento.includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
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

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <Fragment>
      <Apps />
      <Header />
      <MainSection />
      <section className="container conten-documentos">
        <div className="react-search-box">
          <ReactSearchBox
            placeholder="Buscar Aprendiz..."
            value={searchValue}
            onChange={handleSearch}
            fuseConfigs={{ threshold: 0.2 }}
            inputHeight="3rem"
            iconBoxSize={"5rem"}
            inputFontSize="1.3rem"
          />
        </div>
        <Toast mensaje={"Por favor, selecciona el aprendiz para ver sus bitácoras."} />
        <ul className="list-aprendices">
          {currentItems.length > 0 ? (
            currentItems.map((filteredItem) => (
              <Link key={filteredItem.id} to={`/bitacora-aprendiz/${filteredItem.id}`} className="item-link">
                <li className="item-aprendiz">
                  <i className="bi bi-file-earmark-pdf-fill"></i>
                  <div className="datos-aprendiz-doc">
                    <h5>{filteredItem.nombres} {filteredItem.apellidos}</h5>
                    <h6>{filteredItem.tipo_documento}: {filteredItem.numero_documento}</h6>
                    <h6>Ficha: {filteredItem.ficha.numero_ficha}</h6>
                  </div>
                </li>
              </Link>
            ))
          ) : (
            <p>No se encontraron aprendices</p>
          )}
        </ul>
        <div className="pagination-buttons">
        <span className="page-info">
              Página {currentPage} de {totalPages}
            </span>
          <div className="btns-page">
          <button className="boton-anterior" onClick={prevPage} disabled={currentPage === 1}>
            Anterior
          </button>
          <button className="boton-siguiente" onClick={nextPage} disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}>
            Siguiente
          </button>
          </div>
         
        </div>
      </section>
    </Fragment>
  );
};

export default Bitacoras;

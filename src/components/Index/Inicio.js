import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import clienteAxios from '../../config/axios';
import '../layout/Header';
import '../layout/MainSection';
import '../../../src/css/styleinicio.css'
import Header from '../layout/Header';
import MainSection from '../layout/MainSection';
import ReactSearchBox from "react-search-box";
import logoSena from '../../img/logo-sena.png';
import InfoFicha from '../Fichas/InfoFicha';
import { useAuth } from '../context/AuthContext';
import Apps from '../layout/menu/App';

const Inicio = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [fichas, guardarFicha] = useState([]);

  const { token } = useAuth();

  //hace el envio
  const consultarApi = async () => {
    //trae la consulta
    const consultarFicha = await clienteAxios.get('/api/fichas-instructor/', {
      headers: {
        Authorization: `Token ${token}`,
      }
    });
    guardarFicha(consultarFicha.data);
  }

  useEffect(() => {
    consultarApi();
  }, []);

  useEffect(() => {
    filterFichas(searchValue);
  }, [searchValue, fichas]);

  const handleSearch = (name) => {
    setSearchValue(name);
  };

  const filterFichas = (searchTerm) => {
    if (searchTerm === '') {
      setFilteredData(fichas);
    } else {
      const filtered = fichas.filter((item) =>
        item.nombre_programa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nivel_formacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.numero_ficha.includes(searchTerm.toLowerCase())
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
              <i className="bi bi-search"></i>
              <label htmlFor="buscar">Palabras clave:</label>
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
          <section className="info-fichas">
            {currentItems.length > 0 ? (
              currentItems.map((filteredItem) => (
                <Link
                  key={filteredItem.id}
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
              <p>No se encontraron fichas</p>
            )}
          </section>
          <div className="pagination-buttons">
            <button className="boton-anterior" onClick={prevPage} disabled={currentPage === 1}>
              Anterior
            </button>
            <button className="boton-siguiente" onClick={nextPage} disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}>
              Siguiente
            </button>
          </div>
        </section>
      </main>
    </Fragment>
  );
};

export default Inicio;

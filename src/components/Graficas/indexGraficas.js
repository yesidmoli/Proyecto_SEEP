import React, { Fragment } from 'react';
import Apps from '../layout/menu/App';
import Header from '../layout/Header';
import MainSection from '../layout/MainSection';
import GraficoCertificacion from './GraficaGeneralAprendices';
import GraficoCertificacionPorFicha from './GraficaAprendices';
import './graficas.css'
const Graficas = () => {
  return (
    <Fragment>
      <Apps />
      <Header />
      <MainSection />
      <section className="container cont-graficas">
        <div className="grafica-section">
          <h6 style={{textAlign: 'center'}}>Estado de Aprendices Aprobados y Pendientes por Ficha</h6>
          <GraficoCertificacionPorFicha />
        </div>
        <div className="grafica-section">
          <h6 style={{textAlign: 'center'}}>Estado General de aprendices Aprobados y Pendientes</h6>
          <GraficoCertificacion />
        </div>
      </section>
    </Fragment>
  );
};

export default Graficas;

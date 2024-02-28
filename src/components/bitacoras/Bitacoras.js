import React from "react";
import '../../css/bitacoras.css';
import { Fragment } from "react";
import MainSection from "../layout/MainSection";
import Header from "../layout/Header";

const Bitacoras = () => {
  return (
    <div className="contenedor-main">
      <header className="header">Bitácoras del aprendiz</header>
      <i class="bi bi-arrow-left-circle"></i>
    <div className="container-checklist">
      
      <h2>Lista de verificación de bitácoras</h2>
      <div className="list-checklist">
      <ul>
        <div className="section-one">
        <li>
          <input type="checkbox" id="tbitacora1" />
          <label for="tbitacora1">Bitácora 1</label>
        </li>
        <li>
          <input type="checkbox" id="bitacora2" />
          <label for="bitacora2">Bitácora 2</label>
        </li>
        <li>
          <input type="checkbox" id="bitacora3" />
          <label for="bitacora3">Bitácora 3</label>
        </li>
        <li>
          <input type="checkbox" id="bitacora4" />
          <label for="bitacora4">Bitácora 4</label>
        </li>
        <li>
          <input type="checkbox" id="bitacora5" />
          <label for="bitacora5">Bitácora 5</label>
        </li>
        <li>
          <input type="checkbox" id="bitacora6" />
          <label for="bitacora6">Bitácora 6</label>
        </li>
        </div>
        <div className="section-two">
        <li>
          <input type="checkbox" id="bitacora7" />
          <label for="bitacora7">Bitácora 7</label>
        </li>
        <li>
          <input type="checkbox" id="bitacora8" />
          <label for="bitacora8">Bitácora 8</label>
        </li>
        <li>
          <input type="checkbox" id="bitacora9" />
          <label for="bitacora9">Bitácora 9</label>
        </li>
        <li>
          <input type="checkbox" id="bitacora10" />
          <label for="bitacora10">Bitácora 10</label>
        </li>
        <li>
          <input type="checkbox" id="bitacora11" />
          <label for="bitacora11">Bitácora 11</label>
        </li>
        <li>
          <input type="checkbox" id="bitacora12" />
          <label for="bitacora12">Bitácora 12</label>
        </li>
        </div>
      </ul>
      </div>
      <div className="boton-guardar-bitacora">
      <button id="guardar-bitacora" type="button">Guardar</button>
      </div>
    </div>
      </div>
  );
};

export default Bitacoras;

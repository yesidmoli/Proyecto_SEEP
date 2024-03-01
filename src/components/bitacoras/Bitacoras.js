import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import "../../css/bitacoras.css";

const Bitacoras = () => {
  //obtener datos desde localStorage o un valor por defecto
  const initialCheckedItems = JSON.parse(localStorage.getItem("checkedItems")) || {
    bitacora1: true,
    bitacora2: true,
    bitacora3: true,
    bitacora4: true,
    bitacora5: true,
    bitacora6: true,
    bitacora7: true,
    bitacora8: true,
    bitacora9: true,
    bitacora10: true,
    bitacora11: true,
    bitacora12: true,

  };
  //Para rastrear los elementos seleccionados
  const [chekedItems, setChekedItems] = useState(initialCheckedItems);

  useEffect(() => {
    //Cargar estado desde el localStorage al montar el componente
    const savedCheckedItems = JSON.parse(localStorage.getItem("checkedItems"));
    if (savedCheckedItems) {
      setChekedItems(savedCheckedItems);
    }
  }, []);
  const handleCheckboxChange = (id) => {
    //Actualizar estado cuando cambia una casilla de verificación
    setChekedItems((prevChekedItems) => ({
      ...prevChekedItems,
      [id]: !prevChekedItems[id],
      
    }));
    
  };
  useEffect(() => {
    //Guardar estado en el localStorage cada vez que cambia
    localStorage.setItem("checkedItems", JSON.stringify(chekedItems));
  },[chekedItems]);

  const handleGuardarClick = () => {
    console.log("Guardado:", chekedItems);
  };
  return (
    <div className="contenedor-main">
      <header className="header"><p>Bitácoras del aprendiz</p></header>
      <Link to={"/"} className="flecha-regreso">
          <span className="flecha" >&#10094;</span>
        </Link>
      <div className="container-checklist">
        
      
        <h2>Lista de verificación de bitácoras</h2>
        <div className="list-checklist">
          <ul>
            <div className="section-one">
              <li>
                <input 
                type="checkbox" 
                id="tbitacora1"
                onChange={() => handleCheckboxChange("bitacora1")} 
                />
                <label htmlFor="bitacora1">Bitácora 1</label>
              </li>
              <li>
                <input 
                type="checkbox" 
                id="bitacora2" 
                onChange={() => handleCheckboxChange("bitacora2")}
                />
                <label htmlFor="bitacora2">Bitácora 2</label>
              </li>
              <li>
                <input 
                type="checkbox" 
                id="bitacora3" 
                onChange={() => handleCheckboxChange("bitacora3")}
                />
                <label htmlFor="bitacora3">Bitácora 3</label>
              </li>
              <li>
                <input 
                type="checkbox" 
                id="bitacora4" 
                onChange={() => handleCheckboxChange("bitacora4")}/>
                <label htmlFor="bitacora4">Bitácora 4</label>
              </li>
              <li>
                <input 
                type="checkbox" 
                id="bitacora5" 
                onChange={() => handleCheckboxChange("bitacora5")}
                />
                <label htmlFor="bitacora5">Bitácora 5</label>
              </li>
              <li>
                <input 
                type="checkbox" 
                id="bitacora6" 
                onChange={() => handleCheckboxChange("bitacora6")}
                />
                <label htmlFor="bitacora6">Bitácora 6</label>
              </li>
            </div>
            <div className="section-two">
              <li>
                <input 
                type="checkbox" 
                id="bitacora7" 
                onChange={() => handleCheckboxChange("bitacora7")}
                />
                <label htmlFor="bitacora7">Bitácora 7</label>
              </li>
              <li>
                <input 
                type="checkbox" 
                id="bitacora8" 
                onChange={() => handleCheckboxChange("bitacora8")}
                />
                <label htmlFor="bitacora8">Bitácora 8</label>
              </li>
              <li>
                <input 
                type="checkbox" 
                id="bitacora9" 
                onChange={() => handleCheckboxChange("bitacora9")}
                />
                <label htmlFor="bitacora9">Bitácora 9</label>
              </li>
              <li>
                <input 
                type="checkbox" 
                id="bitacora10" 
                onChange={() => handleCheckboxChange("bitacora10")}
                />
                <label htmlFor="bitacora10">Bitácora 10</label>
              </li>
              <li>
                <input 
                type="checkbox" 
                id="bitacora11" 
                onChange={() => handleCheckboxChange("bitacora11")}
                />
                <label htmlFor="bitacora11">Bitácora 11</label>
              </li>
              <li>
                <input 
                type="checkbox" 
                id="bitacora12" 
                onChange={() => handleCheckboxChange("bitacora12")}
                />
                <label htmlFor="bitacora12">Bitácora 12</label>
              </li>
            </div>
          </ul>
        </div>
        <div className="boton-guardar-bitacora">
          <button id="guardar-bitacora" type="button" onClick={handleGuardarClick}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bitacoras;

import React, { useState , useEffect} from 'react';

import Select from "react-select";
import Axios from '../../config/axios';
import { useAuth } from '../context/AuthContext';

const FichaSelector = ({onAprendizSeleccionada}) => {

  const {token} = useAuth()
  const [aprendiz, dataAprendices] = useState([]);

  useEffect(() => {


    const fetchAprendices = async () => {
      try {
        const response = await Axios.get('/api/fichas/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
       

        const fetchedAprendices = response.data;
        dataAprendices(fetchedAprendices
);
      } catch (error) {
        console.error('Error fetching fichas:', error);
      }
    };

    fetchAprendices();
  }, []); 


  //Devolvemos el id de la opcion seleccionado
  const handleAprendizChange = (selectedOption) => {
    onAprendizSeleccionada(parseInt(selectedOption.value));
  
  };

  //Estilos personalizados select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      
      outline: 'none', 
   
      '&:hover': {
        
      },
      
    }),

  }
  return (
    <div className='select-venta classN'>
      <Select 
                  className="select"
                  styles={customStyles}
                  placeholder=" Seleccione la ficha..."
                  options={aprendiz.map(aprendiz => ({
                    value: aprendiz.numero_ficha,
                    label: `${aprendiz.numero_ficha} ${aprendiz.nombre_programa}`,
                    key: aprendiz.id
                  }))}
  
                  onChange={handleAprendizChange}
                  noOptionsMessage={() => "No hay fichas."}
                  />

    </div>
  );
};

export default FichaSelector;

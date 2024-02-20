import React, { useState , useEffect} from 'react';

import Select from "react-select";
import Axios from '../../config/axios';
import { useAuth } from '../context/AuthContext';

const AprendizSelector = ({onAprendizSeleccionada}) => {

  const {token} = useAuth()
  const [aprendiz, dataAprendices] = useState([]);

  useEffect(() => {


    const fetchAprendices = async () => {
      try {
        const response = await Axios.get('/api/aprendices-instructor/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
       

        const fetchedAprendices = response.data;
        dataAprendices(fetchedAprendices
);
      } catch (error) {
        console.error('Error fetching aprendiz:', error);
      }
    };

    fetchAprendices();
  }, []); 


  //Devolvemos el id de la opcion seleccionado
  const handleAprendizChange = (selectedOption) => {
    onAprendizSeleccionada(selectedOption.value);
  
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
      <label for="venta"></label>

      <Select 
                  className="select"
                  styles={customStyles}
                  placeholder="Seleccione el aprendiz"
                  options={aprendiz.map(aprendiz => ({
                    value: aprendiz.id,
                    label: aprendiz.nombres,
                    key: aprendiz.id
                  }))}
  
                  onChange={handleAprendizChange}
                  noOptionsMessage={() => "No hay aprendices."}
                  />

    </div>
  );
};

export default AprendizSelector;

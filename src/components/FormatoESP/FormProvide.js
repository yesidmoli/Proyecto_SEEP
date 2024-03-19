import React, { createContext, useContext, useState, useEffect } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    planeacion: {},
    seguimiento: {},
    evaluacion: {},
    id: '',
    ciudad: "",
    fecha_elaboracion: "",
    aprendiz: ''
  });

  console.log("Esto del contex", formData)

  useEffect(() => {
    // Cargar datos almacenados al cargar el componente
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  const updateFormData = (formKey, newData) => {
    setFormData(prevState => ({
      ...prevState,
      [formKey]: newData
    }));
    // Guardar datos actualizados en el almacenamiento local
    localStorage.setItem('formData', JSON.stringify({
      ...formData,
      [formKey]: newData
    }));
  };

  const resetFormData = () => {
    setFormData({});
    // Eliminar los datos del almacenamiento local
    localStorage.removeItem('formData');
  };
  

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);

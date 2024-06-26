import React, { useState } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import Spinner from 'react-bootstrap/Spinner';
import './AlertaPopup.css'; 

Modal.setAppElement('#root'); 

const AlertaPopup = ({ show, onClose, onGenerarAlerta, fichas, selectedFicha, setSelectedFicha }) => {
  const [isGenerating, setIsGenerating] = useState(false); // Estado para manejar el spinner

  const fichaOptions = fichas.map(ficha => ({
    value: ficha.id,
    label: ficha.numero_ficha,
  }));

  const handleFichaChange = (selectedOption) => {
    setSelectedFicha(selectedOption ? selectedOption.value : '');
  };

  const handleGenerarAlertaClick = async () => {
    setIsGenerating(true);
    await onGenerarAlerta();
    setIsGenerating(false);
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      contentLabel="Generar Alerta de Documentos Faltantes"
      className="modal-alert"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h3>Generar Alerta de Documentos Faltantes</h3>
        <label htmlFor="ficha">Selecciona la ficha de los aprendices:</label>
        <Select
          id="ficha"
          options={fichaOptions}
          value={fichaOptions.find(option => option.value === selectedFicha)}
          onChange={handleFichaChange}
          isClearable
          placeholder="Buscar y seleccionar ficha"
        />
        <button className="generar-alerta-btn" onClick={handleGenerarAlertaClick} disabled={isGenerating}>
          {isGenerating ? (
            <div className='spiner-alert'>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <p>Generando Alerta</p></div>

          ) : (
            'Generar Alerta'
          )}
        </button>
      </div>
    </Modal>
  );
};

export default AlertaPopup;

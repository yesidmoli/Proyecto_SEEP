import { addHours, format } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';

import '../../css/styles.css'
import { useCalendarStore, useUIStore } from '../../hooks';
import AprendizSelector from '../../components/Apprentice/AprendizSelector';




registerLocale('es', es);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export const CalendarModal = () => {

    

    Modal.setAppElement('#root');

    const [aprendizSeleccionado , dataAprendiz] = useState('')

    const { isDateModalOpen, closeDateModal } = useUIStore();
    const { startSavingEvent } = useCalendarStore();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formValues, setFormValues] = useState({
        title: '',
        lugar: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
        tipo_visita: 'presencial', // valor por defecto para tipo_visita
        numero_visita: '', // valor por defecto para numero_visita
        estado: 'programada', // valor por defecto para estado
    });

    
    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';
        return formValues.title.length > 0 ? 'is-valid' : 'is-invalid';
    }, [formValues.title, formSubmitted]);

    useEffect(() => {
        if (isDateModalOpen) {
            setFormValues({
                title: '',
                lugar: '',
                notes: '',
                start: new Date(),
                end: addHours(new Date(), 2),
                tipo_visita: 'presencial', // valor por defecto para tipo_visita
                numero_visita: '', // valor por defecto para numero_visita
                estado: 'programada', // valor por defecto para estado
            });
        }
    }, [isDateModalOpen]);

    const onCloseModal = () => {
        closeDateModal();
    };

    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event,
        });
    };


    //obtenemos el id almacenado del instructor encargado
    const storedDatos = JSON.parse(localStorage.getItem('datosPerfil'));

    

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        const { start, end, title, lugar, notes, tipo_visita, numero_visita, estado } = formValues;
        const formattedStart = format(start, "yyyy-MM-dd'T'HH:mm:ss");
        
        const eventData = {
            fecha_visita: formattedStart.split('T')[0],
            hora_visita: formattedStart.split('T')[1],
            tipo_visita,
            lugar,
            numero_visita,
            estado,
            observaciones: notes,
            aprendiz: aprendizSeleccionado, // Este valor puede ser fijo o dinámico
            instructor_encargado: storedDatos.id, // Este valor puede ser fijo o dinámico
        };

        
        try {
            await startSavingEvent(eventData);
            closeDateModal();
            setFormSubmitted(false);
           
            Swal.fire('Evento guardado correctamente', '', 'success');
            


        } catch (error) {
            console.error('Error al guardar el evento:', error);
            Swal.fire({
                icon: 'error',
                title: error.response.data.non_field_errors,
                text: "Intenta Nuevamente",
            });
        }
    };

    const AprendizSeleccionado  = (aprendizId) =>{

        dataAprendiz(aprendizId)
    }

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form onSubmit={onSubmit} className="container">
                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={formValues.start}
                        className='form-control'
                        onChange={(event) => onDateChanged(event, 'start')}
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora'
                    />
                </div>
                {/* <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValues.start}
                        selected={formValues.end}
                        className='form-control'
                        onChange={(event) => onDateChanged(event, 'end')}
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora'
                    />
    </div> */}
                  <div className="form-group mb-2">
                    <label>Aprendiz</label>
                    <AprendizSelector  onAprendizSeleccionada={AprendizSeleccionado}/>
                    </div>

                <div className="form-group mb-2">
                    <label>Lugar</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Ingrese el lugar"
                        name="lugar"
                        autoComplete="off"
                        value={formValues.lugar}
                        onChange={(event) => setFormValues({ ...formValues, lugar: event.target.value })}
                    />
                </div>
                <div className="form-group mb-2">
        <label>Tipo de visita</label>
        <select
            className="form-control"
            name="tipo_visita"
            value={formValues.tipo_visita}
            onChange={(event) => setFormValues({ ...formValues, tipo_visita: event.target.value })}
        >
            <option value="presencial">Presencial</option>
            <option value="virtual">Virtual</option>
        </select>
    </div>
    <div className="form-group mb-2">
        <label>Número de visita</label>
        <input
            type="number"
            className="form-control"
            placeholder="Número de visita"
            name="numero_visita"
            value={formValues.numero_visita}
            onChange={(event) => setFormValues({ ...formValues, numero_visita: event.target.value })}
        />
    </div>
                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={(event) => setFormValues({ ...formValues, title: event.target.value })}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>
                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={(event) => setFormValues({ ...formValues, notes: event.target.value })}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>
                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>
            </form>
        </Modal>
    );
};

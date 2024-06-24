import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalendarPDF from '../js/CalendarPDF';
import moment from 'moment';

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../"
import { localizer, getMessagesES } from '../../helpers';
import { Fragment, useEffect, useState } from 'react';
import { useCalendarStore, useUIStore } from '../../hooks';
import '../../css/styles.css'

import Header from '../../components/layout/Header';
import MainSection from '../../components/layout/MainSection';

import Swal from 'sweetalert2';

import Apps from '../../components/layout/menu/App';

import clienteAxios from '../../config/axios';

import { useAuth } from '../../components/context/AuthContext';
const CalendarPage = () => {

  const { token } = useAuth()
  const rol = localStorage.getItem('rol')

  const { events, setActiveEvent, startLoadingEvents, startDeletingEvent, startSavingEvent } = useCalendarStore();


  const { openDateModal } = useUIStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [editFormValues, setEditFormValues] = useState({
    id: '',
    fecha_visita: '',
    hora_visita: '',
    tipo_visita: '',
    lugar: '',
    numero_visita: '',
    estado: '',
    observaciones: '',
    aprendiz: '',
    instructor_encargado: '',
  });


  useEffect(() => {
    startLoadingEvents();
  }, []);



  const eventStyleGetter = (event, start, end, isSelected) => {

    // Aquí puedes definir tu lógica para determinar el estilo del evento

    const dayOfWeek = event.start.getDay(); // Obtén el día de la semana del evento (0 para domingo, 1 para lunes, etc.)
    let backgroundColor = '';

    // Cambia el color de fondo del evento dependiendo del día de la semana
    switch (dayOfWeek) {
      case 0: // Domingo
        backgroundColor = '#98ff98'; // Cambia el color de fondo a rojo
        break;
      case 2: // Lunes
        backgroundColor = '#39A900'; // Cambia el color de fondo a azul
        break;

      case 3: // Lunes
        backgroundColor = '#346474'; // Cambia el color de fondo a azul
        break;

      case 4: // Lunes
        backgroundColor = '#1c71f9'; // Cambia el color de fondo a azul
        break;

      // case 5: // Lunes
      // backgroundColor = '#ffc0cb'; // Cambia el color de fondo a azul
      // break;
      // Agrega más casos según sea necesario para otros días de la semana
      default:
        backgroundColor = 'rgb(3, 155, 229)'; // Color de fondo predeterminado para otros días
        break;
    }
    const style = {
      backgroundColor: backgroundColor, // Color de fondo predeterminado para todos los eventos
      borderRadius: '0px',
      // opacity: 0.8,
      color: 'white'
    };
    return { style };
  };




  const onDoubleClick = (event) => {


    setSelectedEvent(event);
    if (rol !== 'aprendiz') {
      openEditForm(event);
    }
   
  };
  const openEditForm = (event) => {

    // Establecer el estado con los valores originales del evento seleccionado
    const initialEventValues = {
      id: event.id,
      fecha_visita: event.fechaVisita,
      hora_visita: event.horaVisita,
      tipo_visita: event.tipo_visita,
      lugar: event.lugar,
      numero_visita: event.numero_visita,
      estado: event.estado,
      observaciones: event.observaciones,
      aprendiz: event.aprendiz,
      instructor_encargado: event.instructor_encargado,
    };
    setEditFormValues(initialEventValues);
    // Obtener la fecha y hora del evento
    const fechaVisita = event.start.toISOString().split('T')[0];
    const horaVisita = event.start.toLocaleTimeString('es-CO', { hour12: false });

    Swal.fire({
      title: 'Editar Visita',
      html: `
      <div class="container cont-popu-calendario"> 
        <input type="date" id="fecha_visita" class="swal2-input" value="${fechaVisita}" placeholder="Fecha de visita (AAAA-MM-DD)">
        <input type="time" id="hora_visita" class="swal2-input" value="${horaVisita}" placeholder="Hora de visita (HH:MM:SS)">
        <select id="tipo_visita" class="swal2-input">
        <option value="presencial" ${event.tipo_visita === 'presencial' ? 'selected' : ''}>Presencial</option>
        <option value="virtual" ${event.tipo_visita === 'virtual' ? 'selected' : ''}>Virtual</option>
      </select>
        <input type="text" id="lugar" class="swal2-input" value="${event.lugar}" placeholder="Lugar">
        <select id="numero_visita" class="swal2-input">
        <option value="1" ${event.numero_visita === '1' ? 'selected' : ''}>Primera visita</option>
        <option value="2" ${event.numero_visita === '2' ? 'selected' : ''}>Segunda visita</option>
        <option value="3" ${event.numero_visita === '3' ? 'selected' : ''}>Tercera visita</option>
      </select>
      <select id="estado" class="swal2-input">
      <option value="programada" ${event.estado === 'programada' ? 'selected' : ''}>Programada</option>
      <option value="realizada" ${event.estado === 'realizada' ? 'selected' : ''}>Realizada</option>
    </select>
        <input type="text" id="observaciones-calendar" class="swal2-input" value="${event.observaciones ?? ""}" placeholder="Observaciones">
        </div>
      `,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: async () => {
        // Obtener los valores actualizados del formulario
        const fechaVisita = Swal.getPopup().querySelector('#fecha_visita').value;
        const horaVisita = Swal.getPopup().querySelector('#hora_visita').value;
        const tipoVisita = Swal.getPopup().querySelector('#tipo_visita').value;
        const lugar = Swal.getPopup().querySelector('#lugar').value;
        const numeroVisita = Swal.getPopup().querySelector('#numero_visita').value;
        const estado = Swal.getPopup().querySelector('#estado').value;
        const observaciones = Swal.getPopup().querySelector('#observaciones-calendar').value;

        // Crear un objeto con los valores actualizados
        const formData = {
          fecha_visita: fechaVisita,
          hora_visita: horaVisita,
          tipo_visita: tipoVisita,
          lugar: lugar,
          numero_visita: numeroVisita,
          estado: estado,
          observaciones: observaciones,
        };



        try {
          // Enviar los datos actualizados a la API utilizando PUT
          const response = await clienteAxios.patch(`/api/visit/${initialEventValues.id}/`, formData, {
            headers: {
              Authorization: `Token ${token}`,
            }
          })
          Swal.fire('¡Cambios guardados!', '', 'success');
          startLoadingEvents()
        } catch (error) {
          console.log("Ocurrió un error:", error)
          // Manejar errores de Axios
          if (error.response) {
            // El servidor ha respondido con un código de estado que no está en el rango de 2xx
            const responseData = error.response.data;
            let errorMessage = "Ocurrió un error:";
            // Agregar mensajes de error al mensaje Swal
            for (const key in responseData) {
              if (Object.hasOwnProperty.call(responseData, key)) {
                const errorMessages = responseData[key];
                errorMessage += `\n ${Array.isArray(errorMessages) ? errorMessages.join(', ') : errorMessages}`;
              }
            }
            Swal.fire({
              icon: 'error',
              title: 'Error al guardar cambios',
              text: errorMessage
            });
          }
        }

      }
    });
  };





  const onSelect = (event) => {

    setSelectedEvent(event);

    if (rol !== 'aprendiz') {
      
    
    Swal.fire({
      title: "¿Qué acción desea realizar?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Editar visita",
      denyButtonText: "Cancelar visita",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isDenied) {
        Swal.fire({
          title: 'Motivo Cancelación',
          input: 'text',
          inputAttributes: {
            autocapitalize: "off"
          },
          inputPlaceholder: 'Ingrese el motivo aquí',
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
          customClass: {
            input: 'my-custom-input-class' // Clase CSS personalizada para el input
          }
        }).then((result) => {
          if (result.isConfirmed) {
            const motivo_cancelacion = result.value;
            console.log('Motivo de cancelación:', motivo_cancelacion);
            // Aquí puedes llamar a la función para cancelar la visita
            startDeletingEvent(event, motivo_cancelacion);
          } else {
            console.log('Entrada de texto cancelada');
          }
        });
      } else if (result.isConfirmed) {
        // Aquí puedes llamar a la función para editar la visita
        onDoubleClick(event)
      } else {
        console.log("Se ha cancelado la acción");
      }
    });
  }
  };


  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event)
  }

  const mapApiEventsToCalendarEvents = (apiEvents) => {
    
    return apiEvents.map(apiEvent => ({
      id: apiEvent.id,
      apellidos: apiEvent.aprendiz_datos.apellidos,
      title: apiEvent.aprendiz_datos.nombres,
      start: new Date(`${apiEvent.fecha_visita}T${apiEvent.hora_visita}`),
      end: new Date(`${apiEvent.fecha_visita}T${apiEvent.hora_visita}`),
      lugar: apiEvent.lugar,
      aprendiz: apiEvent.aprendiz,
      tipo_visita: apiEvent.tipo_visita,
      identificacion_aprendiz: apiEvent.aprendiz_datos.numero_documento,
      instructor_encargado: apiEvent.instructor_encargado,
      numero_visita: apiEvent.numero_visita,
      estado: apiEvent.estado,
      observaciones: apiEvent.observaciones



    }));
  };
  const slotPropGetter = (date) => {
    const hours = date.getHours();
    if (hours >= 0 && hours < 12) {
      return {
        className: 'morning-slot' // Clase CSS para las ranuras de tiempo de la mañana
      };
    }
    return {}; // Devuelve un objeto vacío para las demás ranuras de tiempo
  };

  const MyCustomDay = ({ id }) => (
    <div style={{ textAlign: 'center', backgroundColor: 'lightgray', padding: '10px' }}>
      <strong>{id}</strong>
    </div>
  );
  return (
    <Fragment>

      <Header />

      <div className='container '>

        <MainSection />


        <div className='calendario'>

          <Calendar
            culture='es'
            localizer={localizer}
            events={mapApiEventsToCalendarEvents(events)}
            defaultView={lastView}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 'calc(100vh - 80px)' }}
            messages={getMessagesES()}
            eventPropGetter={eventStyleGetter}
            components={{
              event: CalendarEvent

            }}
            onDoubleClickEvent={onDoubleClick}
            onSelectEvent={onSelect}
            onView={onViewChanged}
            showAllEvents={true}
            slotPropGetter={slotPropGetter}


          />
           
         
    
      </div>
      
      <CalendarModal />
      <CalendarPDF events={events} />
      
     
    </div>

    
    
    {rol !== 'aprendiz' && <FabAddNew />}

    
   
      <FabDelete />

      <Apps />
    </Fragment>

  )
}
export default CalendarPage;
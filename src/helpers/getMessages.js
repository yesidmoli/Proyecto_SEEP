import 'react-big-calendar/lib/css/react-big-calendar.css';
import { BiCalendarExclamation } from 'react-icons/bi'; // Importa el icono de Bootstrap que desees usar



export const getMessagesES = () => {

    // Estilos CSS personalizados
const noEventsMessageStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    color: '#555',
  };

    return {
        allDay: 'Todo el día',
        previous: '<',
        next: '>',
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        agenda: 'Agenda',
        date: 'Fecha',
        time: 'Hora',
        event: 'Evento',
        noEventsInRange: (
      <div style={noEventsMessageStyles}>
        <BiCalendarExclamation size={48} color="#999" />
        <p>No hay visitas en este rango</p>
      </div>
    ),
        showMore: total => `+ Ver más (${total})`
    }
}

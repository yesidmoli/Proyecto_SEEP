import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from 'axios'; // Importa axios
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import { useEffect } from 'react';

import { useAuth } from '../components/context/AuthContext'; 


export const useCalendarStore = () => {
    
   

    const dispatch = useDispatch();
    const [events, setEvents] = useState([]);
    const [activeEvent, setActiveEvent] = useState(null);
    // const { user } = useSelector(state => state.auth);
    const {token} = useAuth()

    useEffect(() => {
        // startLoadingEvents()
      }, []);
    
    const startSavingEvent = async (calendarEvent) => {
        try {
            //* Actualizando
            if (calendarEvent.id) {
                
                const response = await axios.put(`http://localhost:8000/api/visit/${calendarEvent.id}/`, calendarEvent, {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                });
                dispatch(onUpdateEvent({ ...calendarEvent }));
                return response.data;
       

            }

            //* Creando
            const response = await axios.post('http://localhost:8000/api/visit/', calendarEvent, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            dispatch(onAddNewEvent({ ...calendarEvent, id: response.data.id }));

            return response.data;
           
           

        } catch (error) {
            Swal.fire('Error al guardar', error.response.data.non_field_errors );
            throw error;
        }
    }

    const startDeletingEvent = async () => {
        try {
            if (activeEvent && activeEvent.id) {
                const response = await axios.delete(`http://localhost:8000/api/visit/${activeEvent.id}/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                });
                dispatch(onDeleteEvent());
                Swal.fire('Evento eliminado correctamente', '', 'success');
                return response.data;
            }
        } catch (error) {
            Swal.fire('Error al eliminar evento', error.response.data.msg || 'Ha ocurrido un error al eliminar el evento', 'error');
            throw error;
        }
    }

    const startLoadingEvents = async () => {
        try {
            // Realizar la solicitud GET a la API para obtener los eventos
            const response = await axios.get('http://localhost:8000/api/visit/', {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });

            
            // Actualizar el estado de los eventos con los eventos obtenidos de la API
            setEvents(response.data);
        } catch (error) {
            // Manejar errores si la solicitud falla
            console.error('Error al cargar eventos:', error);
            Swal.fire('Error', 'Ocurrió un error al cargar los eventos', 'error');
        }
    }

    return {
        //* Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //* Métodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }
}

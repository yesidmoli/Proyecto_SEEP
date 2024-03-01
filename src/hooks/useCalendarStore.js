import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import { useEffect } from 'react';


import { useAuth } from '../components/context/AuthContext'; 
import clienteAxios from '../config/axios';


export const useCalendarStore = () => {
    
   

    const dispatch = useDispatch();
    const [events, setEvents] = useState([]);
    const [activeEvent, setActiveEvent] = useState(null);

    // const [cancelacion, setCancel] = useState({
    //     "motivo_cancelacion": ''
    // })

   
    // const { user } = useSelector(state => state.auth);
    const {token} = useAuth()

    useEffect(() => {

      }, []);


    // const cancelVisit = async ( evento, motivo_cancelacion) =>{
    //      setActiveEvent(evento)
    //     // Actualiza el estado cancelacion fusionando el nuevo motivo de cancelación con los valores existentes
    //      setCancel(prevState => ({
    //         ...prevState,
    //         motivo_cancelacion
    //     }));

    // }
    
    const startSavingEvent = async (calendarEvent) => {
        try {
            let response;
            //* Actualizando
            if (calendarEvent.id) {
                response = await clienteAxios.put(`/api/visit/${calendarEvent.id}/`, calendarEvent, {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                });
                dispatch(onUpdateEvent({ ...calendarEvent }));
            } else {
                //* Creando
                response = await clienteAxios.post('/api/visit/', calendarEvent, {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                });
                dispatch(onAddNewEvent({ ...calendarEvent, id: response.data.id }));
            }
             // Cargar eventos después de agregar o actualizar
            return response.data;
        } catch (error) {
            if( error && error.response.data.non_field_errors){
                Swal.fire('Error al guardar', error.response.data.non_field_errors );
                throw error;
            }else{
                Swal.fire('Error al guardar', error.response.data );
                throw error;
            }
            
        }
    }

    const startDeletingEvent = async (event) => {
        try {
            if (event && event.id) {
                try{
                    const response = await clienteAxios.post(`/api/visit/${event.id}/cancel/`, {}, {
                        headers: {
                            Authorization: `Token ${token}`,
                        }
                    });
                    dispatch(onDeleteEvent());
                    Swal.fire('Visita cancelada correctamente', response.data.detail, 'success');
                    
                    await startLoadingEvents()

                    return response.data;
                   

                }catch(error){
                    Swal.fire('Error al cancelar la visita', error.response.data.error || 'Ha ocurrido un error al cancelar la visita', 'error');

                    console.log("este es el error", error)
                }
                
            }
        } catch (error) {
            Swal.fire('Error al eliminar evento', error.response.data.error || 'Ha ocurrido un error al cancelar la visita', 'error');
            throw error;
        }
    }

    const startLoadingEvents = async () => {
        try {
            // Realizar la solicitud GET a la API para obtener los eventos
            const response = await clienteAxios.get('/api/visit/', {
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
        startLoadingEvents,

    }
}

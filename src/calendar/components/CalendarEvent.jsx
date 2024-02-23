

export const CalendarEvent = ({event}) => {

    const { title, lugar, id, apellidos, tipo_visita , identificacion_aprendiz} = event;

    return (
        <>

            <strong >{title} {apellidos}</strong>
            <br/>
            <span>  <strong>Documento:</strong> {identificacion_aprendiz}</span>
            <br/>
            <span> <strong>Tipo:</strong> {tipo_visita}</span>
            <br/>
            {/* <span> - {user.name}</span> */}
            <span> <strong>Dirección:</strong> {lugar}</span> {/* Mostrar el lugar */}
        </>
    )
}

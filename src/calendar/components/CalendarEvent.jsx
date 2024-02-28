

export const CalendarEvent = ({event}) => {

    const { title, lugar, id, apellidos } = event;

    return (
        <>

            <strong>{id} {apellidos}</strong>
            <br/>
            <span>{title}</span>
            <br/>
            {/* <span> - {user.name}</span> */}
            <span>{lugar}</span> {/* Mostrar el lugar */}
        </>
    )
}

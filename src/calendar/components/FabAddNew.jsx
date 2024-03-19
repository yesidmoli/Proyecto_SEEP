import { addHours } from "date-fns";
import { useAuthStore, useCalendarStore, useUIStore } from "../../hooks"

import '../../css/styles.css'

export const FabAddNew = () => {

    const { openDateModal } = useUIStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClickNew = () => {
        // setActiveEvent({
        //     title: '',
        //     notes: '',
        //     start: new Date(),
        //     end: addHours(new Date(), 2),
        //     bgColor: '#fafafa',
        // })
        openDateModal();
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={handleClickNew}
            onTouchStart={handleClickNew}
        >
            <i className="fas fa-plus" />
        </button>
    )
}

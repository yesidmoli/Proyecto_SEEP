import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CalendarPage from "../calendar/pages/CalendarPage";


export const AppRouter = () => {
    return (
        <Router>
             <Route path="/calenda" element={<CalendarPage />} />
        </Router>
    )
}

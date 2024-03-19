import React, { useState } from 'react';
import clienteAxios from '../../../config/axios';
import './styles.css';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const PasswordResetForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Establecer el estado de carga a true
        try {
            const response = await clienteAxios.post('http://localhost:8000/dj-rest-auth/password/reset/', { email });
            setMessage(response.data.detail);
            setSent(true);
        } catch (error) {
            setMessage(error.response.data.detail);
            console.log(error);
        }
        setLoading(false); // Establecer el estado de carga a false
    };

    return (
        <div className='container-sm cont-form-reset'>
            <div className='container-form'>
                <h2>Restablecer Contraseña</h2>
                <form onSubmit={handleSubmit}>
                    <h6>Para poder restablecer la contraseña debes indicar el email asociado a tu cuenta de usuario</h6>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label className='label-form form-reset-label' htmlFor="floatingInput">Email</label>
                    </div>
                    <button type="submit" disabled={loading}>{loading ? 'Cargando...' : 'Confirmar'}</button>
                </form>
                {sent && (
                    <h6 className='h6-mensaje'>
                        Le hemos enviado por correo las instrucciones para restablecer la contraseña, si es que existe una cuenta con la dirección electrónica que indicó. <br /> Debería recibirla en breve. Si no recibe un correo, por favor asegúrese de que ha introducido la dirección de correo con el que se registró.
                        <Link to="/login"> Iniciar sesión</Link>
                    </h6>
                )}
            </div>
        </div>
    );
};

export default PasswordResetForm;

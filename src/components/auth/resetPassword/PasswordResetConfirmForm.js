import React, { useState } from 'react';
import clienteAxios from '../../../config/axios';
import './styles.css';
import { useParams, useHistory } from 'react-router-dom';
import { Header } from '../../layout/Header';
import Swal from 'sweetalert2';

const PasswordResetConfirmForm = () => {
    const { uid, token } = useParams();
    const history = useHistory();

    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password1 !== password2) {
            setMessage('Las contraseñas no coinciden.');
            return;
        }
        if (password1.length < 8) {
            setMessage('La contraseña debe tener al menos 8 caracteres.');
            return;
        }
        setLoading(true);
        try {
            const response = await clienteAxios.post('/dj-rest-auth/password/reset/confirm/', {
                uid,
                token,
                new_password1: password1,
                new_password2: password2,
            });
            setMessage(response.data.detail);
            Swal.fire({
                title: "¡Excelente!",
                text: "Su contraseña ha sido establecida, ahora puede seguir adelante e iniciar sesión.",
                icon: "success"
            });
            history.push('/login');
        } catch (error) {
            setMessage('Ocurrió un error al restablecer la contraseña.');
        }
        setLoading(false);
    };

    return (
        <div className='container-sm cont-form-reset'>
            <div className='container-form'>
                <h2>Restablecer Contraseña</h2>
                <form onSubmit={handleSubmit}>
                    <h6>Por favor, introduzca su contraseña nueva dos veces para verificar que la ha escrito correctamente.</h6>

                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword1" placeholder="Password" value={password1} onChange={(e) => setPassword1(e.target.value)} required />
                        <label className='form-reset-label' htmlFor="floatingPassword1">Nueva Contraseña</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword2" placeholder="Password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
                        <label className='form-reset-label' htmlFor="floatingPassword2">Confirmar Nueva Contraseña</label>
                    </div>
                    
                    <button type="submit" disabled={loading}>{loading ? 'Cargando...' : 'Cambiar mi Contraseña'}</button>
                </form>
                
                {message && <p className="error-message">{message}</p>}
            </div>
        </div>
    );
};

export default PasswordResetConfirmForm;

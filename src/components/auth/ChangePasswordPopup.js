import React, { useState } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';
import Apps from '../layout/menu/App';
import MainSection from '../layout/MainSection';
import Header from '../layout/Header';
import logoSeep from '../../img/seep-logo-verde.svg';
import cditi from '../../img/cditi-logo.svg';
import './style.css';

const ChangePasswordPage = () => {
    const { token, logout } = useAuth();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = async () => {
        // Verificar que las contraseñas no estén vacías
        if (!password || !confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor ingresa una contraseña y confírmala',
            });
            return;
        }

        // Verificar que las contraseñas coincidan
        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las contraseñas no coinciden',
            });
            return;
        }

        // Verificar que la contraseña tenga al menos 8 caracteres
        if (password.length < 8) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La contraseña debe tener al menos 8 caracteres',
            });
            return;
        }

         // Verificar que la contraseña tenga mayúsculas, minúsculas, y caracteres especiales
         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/;
         if (!passwordRegex.test(password)) {
             Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
             });
             return;
         }

        try {
            const response = await clienteAxios.patch(
                '/api/update-user/',
                { password },
                {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                localStorage.setItem('mustChangePassword', 'false');
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Contraseña cambiada con éxito',
                });
                logout();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo cambiar la contraseña',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo cambiar la contraseña',
            });
        }
    };

    return (
        <> 
        <header class="encabezado-login">
            <img className='seep-img' src={logoSeep} alt="logo-SEEP" />
            <img className='cditi-img' src={cditi} alt="logo-CDITI" />
        </header>
            <div className='container container-padre'>
                <h2>Cambio de contraseña</h2>
                <div className='container-update'>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label className='label-form form-reset-label' htmlFor="floatingPassword">Nueva Contraseña</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingConfirmPassword"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <label className='label-form form-reset-label' htmlFor="floatingConfirmPassword">Confirmar Contraseña</label>
                    </div>

                </div>

                <button onClick={handleChangePassword}>Cambiar la contraseña</button>
            </div>
    
        </>
    );
};

export default ChangePasswordPage;


import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate(); 

    const handleLogin = async () => {
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setIsLoggedIn(true);
                toast.success('Inicio de sesión exitoso');
                navigate('/main');  
            } else {
                toast.error('Nombre de usuario o contraseña incorrectos');
            }
        } catch (error) {
            toast.error('Error al conectarse al servidor');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div id='main'>
            <div className='main-container'>
                <img src="../../src/img/Logo.jpg" alt="Irrigation Tech Pro" />
                <div className='name-container'>
                    <h2>ITP</h2>
                    <h6>Irrigation <br /> Tech Pro</h6>
                </div>
                <div className='inputs-main'>
                    <input 
                        type="text" 
                        placeholder='Ingrese su Usuario' 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder='Ingrese su Contraseña' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button 
                    className={isLoggedIn ? 'login-button success' : 'login-button'} 
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? 'Cargando...' : (isLoggedIn ? '✔' : 'SIGN UP')}
                </button>
                <ToastContainer />
            </div>            
        </div>
    );
}

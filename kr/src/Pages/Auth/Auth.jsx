import React, { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { registration, login } from '../../http/userAPI';
import { userStore } from '../../store/UserStore';
import Footer from '../../Components/Footer/Footer';
import HeaderComp from '../../Components/HeaderComp/HeaderComp';

function Auth() {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsLoginForm(!isLoginForm);
        setErrorMessage('');
        setNickName('');
        setPassword('');
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (isLoginForm) {
                const data = await login(nickName, password);
                localStorage.setItem('token', data.accessToken); 
                userStore.setUser(nickName)
                userStore.setIsAuth(true)
                // Store token on successful login
            } else {
                await registration(nickName, password); // No need to store token again, it's done in registration function
            }

            navigate('/'); // Navigate after successful login/registration
        } catch (error) {
            console.error("Error during authentication:", error);
            setErrorMessage(error.response?.data?.message || 'Authentication failed.');
        }
    };

    return (
        <>
        <HeaderComp/>
        <div className="auth-container">
            <h2>Authentication</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className='Label' htmlFor="nickName">Nickname:</label>
                    <input
                        type="text"
                        id="nickName"
                        value={nickName}
                        onChange={(e) => setNickName(e.target.value)}
                        placeholder="Enter your nickname"
                        required
                    />
                </div>
                <div className="form-group">
                    <label  className='Label' htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit">{isLoginForm ? 'Login' : 'Register'}</button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>
            <button type="button" onClick={toggleForm}>
                Switch to {isLoginForm ? 'Registration' : 'Login'}
            </button>
        </div>
        <Footer/>
        </>
    );
}

export default Auth;
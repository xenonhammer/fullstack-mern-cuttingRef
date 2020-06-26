import React, { useEffect } from 'react';
import { useHTTP } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { useState } from 'react';

export const AuthPage = () => {
    const message = useMessage()
    const {loading, error, request, clearError} = useHTTP();
    const [form, setForm] = useState({
        email: '', password: ''
    })
useEffect(() => {
    message(error)
    clearError()

}, [error, message, clearError])
    const changeHandler = event => {
    
        setForm({ ...form, [event.target.name]: event.target.value})
    }
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
            
        } catch (e) {}
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            message(data.message)
            
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className=" col s6 offset-s3">
                <h1>Сократим ссылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        
                            
                        <div className="input-field">
                            <input 
                                placeholder="email" 
                                name="email" 
                                type="text" 
                                className="validate" 
                                onChange={changeHandler}
                            />
                                <label htmlFor="email">Email</label>
                        </div>

                        <div className="input-field">
                            <input 
                                placeholder="Пароль" 
                                name="password" 
                                type="password" 
                                className="validate"
                                onChange={changeHandler}
                            />
                                <label htmlFor="password">Пароль</label>
                        </div>


                        
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn yellow darken-4" 
                            style={{marginRight: 10}}
                            onClick={loginHandler}
                            disabled={loading}
                            >Войти
                        </button>
                        <button
                            className="btn gray lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                            >Регистрация
                        </button>
                    </div>
                </div>
            </div>   
        </div>
    )
}
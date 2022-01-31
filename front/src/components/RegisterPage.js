import React from 'react';
import '../style/InputForLogin.css'
import '../style/RegisterPage.css'
import {Link, useNavigate} from 'react-router-dom'
import {baseUrl} from '../services/BackApi.js'


function RegisterPage(props) {
    const [login, setLogin] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmed_password, setConfirmedPassword] = React.useState('')
    const [error, setError] = React.useState('')
    const [email, setEmail] = React.useState('')
    const navigate = useNavigate();

    React.useEffect(()=> {
        setError('')
    }, [login, password, email])

    const handleRegister = async (event)=> {
        event.preventDefault();

        if (login === '') {
            setError('Login should not be empty')
            return;
        }
        if (password === '') {
            setError('Password should not be empty')
            return;
        }
        if (password !== confirmed_password) {
            setError('Passwords should be same')
            return;
        }

        const response = await fetch(baseUrl + 'api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify({
                username: login,
                password,
                email,
            }),
        });
        const data = await response.json();

        if (response.status !== 201) {
            setError(data.username)
        } else {
            navigate('/')
        }
    }

    return (
        <div className='RegisterPage'>
            <p id='create_account_text'>Create your account!</p>
            
            <div><input className='InputForLogin' id='login' placeholder='login' value={login} 
                    onChange={(event)=> setLogin(event.target.value)}/></div>
            <div><input className='InputForLogin' id='password' placeholder='password' value={password} 
                    onChange={(event)=> setPassword(event.target.value)}/></div>
            <div><input className='InputForLogin' id='confirm password' placeholder='confirm password' value={confirmed_password} 
                    onChange={(event)=> setConfirmedPassword(event.target.value)}/></div>
            <div><input className='InputForLogin' id='email' placeholder='email' value={email} 
                    onChange={(event)=> setEmail(event.target.value)}/></div>

            <div id='error_text'>
                {error}
            </div>

            <p className='ExtraRegisterPageText'>
                <Link to='/' onClick={handleRegister}>Register!</Link>
            </p>
        </div>
    )
}

export default RegisterPage;
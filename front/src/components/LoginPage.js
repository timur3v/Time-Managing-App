import React from 'react';
import '../style/InputForLogin.css'
import '../style/LoginPage.css'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import {baseUrl} from '../services/BackApi.js'


function LoginPage(props) {
    const [login, setLogin] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')
    const navigate = useNavigate();

    React.useEffect(()=> {
        setError('')
    }, [login, password])

    const handleLogIn = async (event)=> {
        event.preventDefault();

        if (login === '') {
            setError('Login should not be empty')
            return;
        }

        if (password === '') {
            setError('Password should not be empty')
            return;
        }

        const response = await fetch(baseUrl + 'api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify({
                username: login,
                password,
            }),
        });
        const data = await response.json();

        if (response.status !== 200) {
            setError(data.detail)
        } else {
            window.localStorage.setItem('ACCESS', data.access);
            window.localStorage.setItem('REFRESH', data.refresh);
            window.localStorage.setItem('USER', login)
            navigate('/unscheduled')
        }
    }

    return (
        <div className='LoginPage'>
            <div>
                <p id='welcome'>Welcome!</p>
                <p className='ExtraLoginPageText'>
                    Please log in to continue
                </p>
            </div>
            
            <div>
                <input className='InputForLogin' id='login' placeholder='login' value={login} 
                    onChange={(event)=> setLogin(event.target.value)}/>
            </div>
            <div>
                <input className='InputForLogin' id='password' placeholder='password' value={password} 
                    onChange={(event)=> setPassword(event.target.value)}/>
            </div>

            <div id='error_text' className='ExtraRegisterPageText'>
                {error}
            </div>
            
            <p className='ExtraRegisterPageText'>
                <Link to='/unscheduled' onClick={handleLogIn}>Log in!</Link>
            </p>

            <p className='ExtraLoginPageText'>
                New to our website? Click <Link to='/register'>here</Link> to create an account!
            </p>
        </div>
    )
}


export default LoginPage;
import React from 'react';
import '../style/InputForLogin.css'


function InputForLogin(props) {
    const text = props.text;
    return (
        <div>
            <input className='InputForLogin' id={text} placeholder={text} />
        </div>
    )
}

export default InputForLogin;
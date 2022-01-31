import React from 'react';
import {useNavigate} from 'react-router-dom';


function LinkButton(props) {
    const {id, to, text} = props;
    const navigate = useNavigate();
  
    function handleClick() {
        navigate(to);
    }
  
    return (
        <button id={id} className='UnscheduledEventsPage' onClick={handleClick}>
            {text}
        </button>
    );
}

export default LinkButton;
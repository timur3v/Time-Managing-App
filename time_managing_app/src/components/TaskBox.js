import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import apiClientService from '../services/BackApi';
import '../style/TaskBox.css'


function TaskBox(props) {
    const {id, type, description, rerender, doRerender} = props;
    const text = description;

    const btn_class = type === 'important'? 'ImportantTaskBox' : 'UnimportantTaskBox';

    const navigate = useNavigate();
  
    function handleBoxClick() {
        navigate(`/update_unscheduled_task/${id}`);
    }

    const handleDoneClick = async (event)=> {
        event.preventDefault()

        const response = await apiClientService(`api/set_done_unscheduled/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify({
                done_flg: true,
            }),
        });

        doRerender((rerender + 1) % 2);
    }
  
    return (
        <div>
            <button id={id} className={btn_class} onClick={handleBoxClick}>
                {text} 
            </button>
            
            <button id={id} className='DoneBtn' onClick={handleDoneClick}>
                &#9989;
            </button>
        </div>
    );
}

export default TaskBox;
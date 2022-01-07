import React, {useState} from 'react';
import '../style/AddUnscheduledTaskPage.css'
import {useNavigate} from 'react-router-dom';
import apiClientService from '../services/BackApi';


function AddUnscheduledTaskPage(props) {
    const [important, setState] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAddBtnClick = async (event)=> {
        const descr = document.getElementById('task_description').value;
        const comment = document.getElementById('comment').value
    
        event.preventDefault();
    
        const response = await apiClientService('api/add_unscheduled/', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify({
                task_description: descr,
                comment: comment,
                important_flg: important,
                done_flg: false,
                user: 0,
            }),
        });

        console.log(response.status);
        if (response.status !== 201) {
            setError(response.username)
        } else {
            navigate('/')
        }

        navigate('/unscheduled');
    }

    function toggleBtn() {
        setState(!important);
    }

    const isPressed = important? 'Pressed' : 'NotPressed';

    return (
        <div id='add_unsched_task_page_content' className='AddUnscheduledTaskPage'>
            <p id='adding_text'>
                Adding a task
            </p>

            <p className='AddUnscheduledTaskPage'>
                Task description
            </p>
            <textarea className='AddUnscheduledTaskPage' id='task_description' />

            <div>
                <button className={isPressed} id='important_btn' onClick={()=> toggleBtn()}>
                    Important
                </button>
            </div>

            <p className='AddUnscheduledTaskPage'>
                Comment
            </p>
            <textarea className='AddUnscheduledTaskPage' id='comment' />

            <div className='AddButton'>
                <button id='add_btn' className='UnscheduledEventsPage' onClick={handleAddBtnClick}>
                    Add task
                </button>
            </div>
        </div>
    )
}

export default AddUnscheduledTaskPage;
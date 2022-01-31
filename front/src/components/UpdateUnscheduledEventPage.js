import React, {useEffect, useState} from 'react';
import '../style/AddUnscheduledTaskPage.css'
import {useNavigate, useParams} from 'react-router-dom';
import apiClientService from '../services/BackApi';


function UpdateUnscheduledTaskPage(props) {
    const [important, setState] = useState(false);
    const [descr, setDescr] = useState();
    const [comment, setComment] = useState();
    const navigate = useNavigate();
    const {task_id} = useParams();

    const handleUpdateBtnClick = async (event)=> {
        console.log(document.getElementById('task_description').value); // test
        console.log(document.getElementById('comment').value);

        const descr = document.getElementById('task_description').value;
        const comment = document.getElementById('comment').value
    
        event.preventDefault();
    
        const response = await apiClientService(`api/update_unscheduled/${task_id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify({
                task_description: descr,
                comment: comment,
                important_flg: important,
                done_flg: false,
            }),
        });

        navigate('/unscheduled')
    }

    function toggleBtn() {
        setState(!important);
        console.log(!important);
    }

    useEffect(()=> {
        apiClientService(`api/get_unscheduled/${task_id}/`)
            .then((data)=> {
                console.log(data)
                setDescr(data.task_description);
                setComment(data.comment);
                setState(data.important_flg)
        })
    }, [])

    const isPressed = important? 'Pressed' : 'NotPressed';

    return (
        <div id='add_unsched_task_page_content' className='AddUnscheduledTaskPage'>
            <p id='adding_text'>
                Updating a task
            </p>

            <p className='AddUnscheduledTaskPage'>
                Task description
            </p>
            <textarea className='AddUnscheduledTaskPage' id='task_description'
                defaultValue={descr} />

            <div>
                <button className={isPressed} id='important_btn' onClick={()=> toggleBtn()}>
                    Important
                </button>
            </div>

            <p className='AddUnscheduledTaskPage'>
                Comment
            </p>
            <textarea className='AddUnscheduledTaskPage' id='comment' 
                defaultValue={comment} />

            <div className='AddButton'>
                <button id='add_btn' className='UnscheduledEventsPage' onClick={handleUpdateBtnClick}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default UpdateUnscheduledTaskPage;
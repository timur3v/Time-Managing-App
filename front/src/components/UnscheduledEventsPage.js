import React, {useEffect, useState} from 'react';
import '../style/UnscheduledEventsPage.css'
import LinkButton from './LinkButton';
import TaskBox from './TaskBox';
import {apiClientService} from '../services/BackApi'
import {Link, useNavigate} from 'react-router-dom'


function UnscheduledEventsPage(props) {
    const [unscheduled_tasks, setState] = useState([])
    const [rerender, doRerender] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        apiClientService('api/my_unscheduled_tasks/')
            .then(data => {
                const tasks = [];
                for (var i = 0; i < data.length; i++) {
                    tasks.push(data[i]);
                }
                setState(tasks);
            })
    }, [rerender])

    const handleLogOut = (event)=> {
        event.preventDefault()
        window.localStorage.clear()
        navigate('/')
    }

    return (
        <div className='UnscheduledEventsPage'>
            <div className='Buttons'>
                <LinkButton id='add_task_btn' to='/add_unscheduled_task' text='Add task' />
                <LinkButton id='switch_btn' to='/unscheduled_history' text='Show history' />
            </div>
        
            <p>
                Unscheduled tasks
            </p>

            {unscheduled_tasks.map((elem)=> {
                if (elem.important_flg && !elem.done_flg) {
                    return <TaskBox key={elem.id}
                        type={'important'} 
                        description={elem.task_description} id={elem.id}
                        rerender={rerender} doRerender={doRerender} />
                }
            })}
            {unscheduled_tasks.map((elem)=> {
                if (!elem.important_flg && !elem.done_flg) {
                    return <TaskBox key={elem.id}
                        type={'unimportant'} 
                        description={elem.task_description} id={elem.id}
                        rerender={rerender} doRerender={doRerender} />
                }
            })}

            <p>
                <Link to='/' onClick={handleLogOut}>Log out</Link>
            </p>
        </div>
    )
}

export default UnscheduledEventsPage;
import React from 'react';
import LoginPage from './components/LoginPage.js'
import NotFound from './components/NotFound.js'
import RegisterPage from './components/RegisterPage.js';
import UnscheduledEventsPage from './components/UnscheduledEventsPage.js'
import AddUnscheduledTaskPage from './components/AddUnscheduledTaskPage.js';
import UpdateUnscheduledTaskPage from './components/UpdateUnscheduledEventPage.js';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './style/App.css'


function App() {
  return (
    <Router>
        <div className='App'>
            <div id='background'>
                <Routes>
                    <Route exact path='/' element={<LoginPage />} />
                    <Route exact path='/register' element={<RegisterPage />} />
                    <Route exact path='/unscheduled' element={<UnscheduledEventsPage />} />
                    <Route exact path='/add_unscheduled_task' element={<AddUnscheduledTaskPage />} />
                    <Route exact path='/update_unscheduled_task/:task_id' element={<UpdateUnscheduledTaskPage />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>
        </div>
    </Router>
  );
}

export default App;

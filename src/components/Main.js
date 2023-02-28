import React from 'react';
import '../styles/main.css';

import Card from './Card';

import Avatar from '@mui/material/Avatar';

const Main = () => {
    return (
        <>
            <div className="nav">
                <Avatar className='avatar' sx={{ width: 50, height: 50 }}/>
                <button>Log Out</button>
            </div>
            <div className="todo__box">
                <h1>To-Do</h1>
                <div className="todo__bar">
                    <input type="text" placeholder="Enter Task" />
                    <button>Submit</button>
                </div>
            </div>
            <div className="todos">
                <Card />
                <Card />
            </div>
        </>
    );
}

export default Main;

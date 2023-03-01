import React, { useState } from 'react';
import '../styles/main.css';

import Card from './Card';

import Avatar from '@mui/material/Avatar';

const Main = () => {
    const [text, setText] = useState("");
    const [todos, setTodos] = useState(["hello", "world", "this"]);
    const [hovering, setHovering] = useState(false);

    const HandleSubmit = () =>{
        setTodos([...todos, text]);
    }

    return (
        <>
            <div className="nav">
                <Avatar className='avatar' sx={{ width: 50, height: 50 }} onMouseEnter={()=>setHovering(true)} onMouseLeave={()=>setHovering(false)}/>
                {hovering ?
                        <div className="profile__box" onMouseEnter={()=>setHovering(true)} onMouseLeave={()=>setHovering(false)}>
                            <button className='updatebtn'>Update Avatar</button>
                        </div>
                : ""}
                <button>Log Out</button>
            </div>
            <div className="todo__box">
                <h1>To-Do</h1>
                <div className="todo__bar">
                    <input type="text" placeholder="Enter Task" value={text} onChange={(e)=>setText(e.target.value)}/>
                    <button onClick={HandleSubmit}>Submit</button>
                </div>
            </div>
            <div className="todos">
                {todos.map((todo, index)=>{
                    return <Card todo={todo} key={index} id={index} todos={todos} setTodos={setTodos}/>
                })}
            </div>
        </>
    );
}

export default Main;

import '../styles/main.css';
import React, { useEffect, useState } from 'react';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import Card from './Card';
import { db } from '../firebase';
import { useStateValue } from '../context/StateProvider';

import Avatar from '@mui/material/Avatar';

const Main = () => {
    const [{user}] = useStateValue();
    const [todos, setTodos] = useState();
    const [text, setText] = useState("");
    const [hovering, setHovering] = useState(false);
    const name=user.displayName;
    const email=user.email;
    const photoURL=user.photoURL;
    
    const HandleSubmit = () =>{
        if(text !== ""){
            try {
                db.collection('users').doc(user.uid).collection('todos').add({
                    todo: text,
                    completed: false,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                });
                document.getElementById('add__msg').style.display = "block";
                setTimeout(() => {
                    document.getElementById('add__msg').style.display = "none";
                }, 1500);
            } catch (error) {
                alert(error.message);
            }
        }
        else{ alert("Can't Submit empty To-Do!!\nEnter Data and Try Again..."); }
    }
    const HandleLogOut = () =>{
        localStorage.clear();
        window.location= '/';
    }

    useEffect(() => {
        async function fetchTodos() {
            try {
                const userRef = db.collection('users').doc(user.uid);
                const todosSnapshot = await userRef.collection('todos').get();
                const todosData = todosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setTodos(todosData);
            } catch (error) {
                alert(error.message);
            }
        }
        fetchTodos();
        // eslint-disable-next-line
    }, [todos]);

    return (
        <>
            <div className="nav">
                <Avatar className='avatar' sx={{ width: 50, height: 50 }} src={photoURL} onMouseEnter={()=>setHovering(true)} onMouseLeave={()=>setHovering(false)}/>
                {hovering ?
                        <div className="profile__box" onMouseEnter={()=>setHovering(true)} onMouseLeave={()=>setHovering(false)}>
                            <p><strong>Name:</strong>{name}</p>
                            <p><strong>Email:</strong>{email}</p>
                            <button className='updatebtn'>Update Avatar</button>
                        </div>
                : ""}
                <button onClick={HandleLogOut}>Log Out</button>
            </div>
            <div className="todo__box">
                <h1>To-Do</h1>
                <div className="todo__bar">
                    <input type="text" placeholder="Enter Task" value={text} onChange={(e)=>setText(e.target.value)}/>
                    <button onClick={HandleSubmit}>Submit</button>
                </div>
                <small id="add__msg">To-do Added!!!</small>
            </div>
            {!todos ? <div className="todos"><h1>Loading...</h1></div> :
                <div className="todos">
                    {todos.map((doc)=>{
                        return <Card todo={doc.todo} key={doc.id} id={doc.id} todos={todos} setTodos={setTodos}/>
                    })}
                </div> 
            }
        </>
    );
}

export default Main;

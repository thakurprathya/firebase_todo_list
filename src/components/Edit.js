import '../styles/edit.css';
import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { db } from '../firebase';
import { useStateValue } from '../context/StateProvider';

const Edit = () => {
    const navigate = useNavigate();
    const [edit, setEdit] = useState("");
    const [{user}] = useStateValue();
    const {todoId} = useParams();
    const todoRef = db.collection('users').doc(user.uid).collection('todos').doc(todoId);
    const [todo, setTodo] = useState({});

    
    const HandleClickEdit = () =>{
        if(edit !== ""){
            try {
                todoRef.update({ todo: edit })
                document.getElementById('edit__msg').style.display = "block";
                setTimeout(() => {
                    document.getElementById('edit__msg').style.display = "none";
                }, 1500);
            } catch (error) {
                alert(error.message);
            }
        }
        else{ alert("Can't Update to empty string!!\nEnter Data and Try Again..."); }
    }
    const HandleKeyDown = (event) =>{ if(event.key === "Enter")HandleClickEdit(); }

    useEffect(()=>{
        async function fetchTodo() {
            try {
                const todoData = await todoRef.get().then((doc)=>({id: doc.id, ...doc.data()}));
                setTodo(todoData);
            } catch (error) {
                alert(error.message);
            }
        }
        fetchTodo();
    },[todoRef]);
    
    return (
        <div className='edit'>
            <div className='edit__content'>
                <h1>Edit To-Do</h1>
                <div className="data">
                    <label>Id:<p>{todoId}</p></label>
                    <label>To Do:<input type='text' value={edit} placeholder={todo.todo} onChange={(e)=>setEdit(e.target.value)} onKeyDown={HandleKeyDown}/></label>
                </div>
                <button onClick={HandleClickEdit}>Edit</button>
                <small id="edit__msg">To-do Updated!!</small> 
            </div>
            <button className='back__btn' onClick={()=>navigate('/')}>Back To List</button>
        </div>
    );
}

export default Edit;

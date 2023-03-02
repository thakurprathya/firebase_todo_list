import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/card.css';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../firebase';
import { useStateValue } from '../context/StateProvider';

const Card = ({todo, id, todos, setTodos}) =>{
    const navigate = useNavigate();
    const [{user}] = useStateValue();
    const todoRef = db.collection('users').doc(user.uid).collection('todos').doc(id);
    const [check, setCheck] = useState(false);

    const HandleCheck = () =>{
        try {
            const ele = document.querySelector(`#todo${id}`);
            if(check === true){
                ele.classList.remove('todo__done'); 
                todoRef.update({ completed: false });
                setCheck(false);
            }
            else{
                ele.classList.add('todo__done'); 
                todoRef.update({ completed: true });
                setCheck(true);
            }
        } catch (error) {
            alert(error.message);
        }
    }
    const HandleDelete = () =>{
        todoRef.delete();
        const updatedTodos = todos.filter((t) => t !== todo );
        setTodos(updatedTodos);
    }
    const HandleEdit = () =>{
        navigate(`/edit/${id}`);
    }
    
    useEffect(()=>{
        async function fetchCompleteState() {
            try {
                const todoData = await todoRef.get().then((doc)=>({id: doc.id, ...doc.data()}));
                setCheck(todoData.completed);
                if(todoData.completed === true){ document.querySelector(`#todo${id}`).classList.add('todo__done'); }
            } catch (error) {
                alert(error.message);
            }
        }
        fetchCompleteState();
        // eslint-disable-next-line
    },[])

    return(
        <div className="card">
            <div className='todo__content'>
                <input type="checkbox" checked={check} onChange={HandleCheck}/>
                <h3 id={`todo${id}`}>{todo}</h3>
            </div>
            <div className="btns">
                <EditIcon color='success' className='editbtn' onClick={HandleEdit}/>
                <DeleteIcon sx={{ color: "brown" }} className='delbtn' onClick={HandleDelete}/>
            </div>
        </div>
    );
}

export default Card;

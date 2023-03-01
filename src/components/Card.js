import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/card.css';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Card = ({todo, id, todos, setTodos}) =>{
    const navigate = useNavigate();

    const HandleCheck = () =>{
        const ele = document.querySelector(`#todo${id}`);
        if(ele.classList.contains('todo__done')){ ele.classList.remove('todo__done'); }
        else{ ele.classList.add('todo__done'); }
    }
    const HandleDelete = () =>{
        const updatedTodos = todos.filter((t) => t !== todo );
        setTodos(updatedTodos);
    }
    const HandleEdit = () =>{
        navigate(`/edit/${id}`);
    }

    return(
        <div className="card">
            <div className='todo__content'>
                <input type="checkbox" onChange={HandleCheck}/>
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

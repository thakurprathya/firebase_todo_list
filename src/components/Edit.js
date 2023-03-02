import React, {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/edit.css';

const Edit = () => {
    const [edit, setEdit] = useState("");
    const navigate = useNavigate();
    const {todoId} = useParams();

    const HandleClickEdit = () =>{
        //updating fetched todo from db to edit
        document.getElementById('edit__msg').style.display = "block";
        setTimeout(() => {
            document.getElementById('edit__msg').style.display = "none";
        }, 1500);
    }

    return (
        <div className='edit'>
            <div className='edit__content'>
                <h1>Edit To-Do</h1>
                <div className="data">
                    <label>Id:<p>{todoId}</p></label>
                    <label>To Do:<input type='text' value={edit} onChange={(e)=>setEdit(e.target.value)}/></label>
                </div>
                <button onClick={HandleClickEdit}>Edit</button>
                <small id="edit__msg">To-do Updated!!</small> 
            </div>
            <button className='back__btn' onClick={()=>navigate('/')}>Back To List</button>
        </div>
    );
}

export default Edit;

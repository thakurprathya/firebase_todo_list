import React, {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/edit.css';

const Edit = () => {
    const [edit, setEdit] = useState("");
    const navigate = useNavigate();
    const {todoId} = useParams();

    const HandleClickEdit = () =>{
        //updating fetched todo from db to edit
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
            </div>
            <button className='back__btn' onClick={()=>navigate('/')}>Back To List</button>
        </div>
    );
}

export default Edit;

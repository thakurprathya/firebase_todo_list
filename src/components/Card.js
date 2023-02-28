import React from 'react';
import '../styles/card.css';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Card = () =>{
    return(
        <div className="card">
            <div className='todo__content'>
                <input type="checkbox"/>
                <h3 className='done'>sample task</h3>
            </div>
            <div className="btns">
                <EditIcon color='success' className='editbtn'/>
                <DeleteIcon sx={{ color: "brown" }} className='delbtn'/>
            </div>
        </div>
    );
}

export default Card;

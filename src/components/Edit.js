import React from 'react';
import '../styles/edit.css';

const Edit = () => {
    return (
        <div className='edit'>
            <div className='edit__content'>
                <h1>Edit To-Do</h1>
                <div className="data">
                    <label>Id:<p>fsdafasfdasdfasd</p></label>
                    <label>To Do:<input type='text' value="hello" /></label>
                </div>
                <button>Edit</button>
            </div>
            <button className='back__btn'>Back To List</button>
        </div>
    );
}

export default Edit;

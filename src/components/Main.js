import '../styles/main.css';
import React, { useEffect, useState } from 'react';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import Card from './Card';
import { db, storage } from '../firebase';
import { useStateValue } from '../context/StateProvider';

import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';

const Main = () => {
    const [{user}] = useStateValue();
    let userRef;
    if(user.uid){
        userRef = db.collection('users').doc(user.uid);
    } else {
        userRef = null;
    }
    const [todos, setTodos] = useState();
    const [text, setText] = useState("");
    const [hovering, setHovering] = useState(false);
    const [uploadBox, setUploadBox] = useState(false);
    const [image, setImage] = useState(null);
    const name=user.displayName;
    const email=user.email;
    const [photoURL, setPhotoURL] = useState(user.photoURL);
    
    const HandleSubmit = () =>{
        if(text !== ""){
            try {
                db.collection('users').doc(user.uid).collection('todos').add({
                    todo: text,
                    completed: false,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                });
                setText("");
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
    const HandleKeyDown = (event) =>{ if(event.key === "Enter")HandleSubmit(); }
    const HandleImageChange = (event) =>{
        const file = event.target.files[0];
        if(file.type.startsWith("image/")){ setImage(event.target.files[0]); }
        else {
            alert("Please select an image file with a valid extension (JPG, JPEG, PNG).");
            event.target.value = null;
        }
    }
    const HandleClickUpdate = () =>{
        const imageRef = ref(storage, `images/${user.uid}/${image.name}`);
        uploadBytes(imageRef, image).then(()=>{
            getDownloadURL(imageRef).then((url)=>{
                db.collection('users').doc(user.uid).update({ photoURL: url });
                localStorage.setItem('photoURL', url);
                setPhotoURL(url);
                document.getElementById('update__msg').style.display = "block";
                setTimeout(() => {
                    document.getElementById('update__msg').style.display = "none";
                }, 1500);
                setTimeout(() => {
                    setUploadBox(false);
                }, 2000);
            }).catch((error)=>alert(error.message, "\nError getting ImageURL!!"));
            setImage(null);
        }).catch((error)=>alert(error.message, "\nUpload Error!!"));
    }
    const HandleClickClear = () =>{
        document.getElementById('upload__input').value = null;
    }
    const HandleLogOut = () =>{ localStorage.clear(); window.location= '/'; }

    useEffect(() => {
        async function fetchTodos() {
            try {
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
    useEffect(() => {
        async function fetchPhotoURL() {
            try {
                const userData = await userRef.get().then((doc)=>({id: doc.id, ...doc.data()}));
                setPhotoURL(userData.photoURL);
            } catch (error) {
                alert(error.message);
            }
        }
        fetchPhotoURL();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="nav">
                <Avatar className='avatar' sx={{ width: 50, height: 50 }} src={photoURL} onMouseEnter={()=>setHovering(true)} onMouseLeave={()=>setHovering(false)}/>
                {hovering ?
                        <div className="profile__box" onMouseEnter={()=>setHovering(true)} onMouseLeave={()=>setHovering(false)}>
                            <p><strong>Name:</strong>{name}</p>
                            <p><strong>Email:</strong>{email}</p>
                            <button className='updatebtn' onClick={()=>setUploadBox(true)}>Update Avatar</button>
                        </div>
                : ""}
                <button onClick={HandleLogOut}>Log Out</button>
            </div>
            {uploadBox ?
                <div className="upload__box">
                    <CloseIcon className='closebtn' onClick={()=>setUploadBox(false)}/>
                    <div>
                        <h1>Upload New Avatar!!</h1>
                        <div>
                            <input id="upload__input" type="file" onChange={HandleImageChange}/>
                            <button className='clearbtn' onClick={HandleClickClear}>Clear</button>
                        </div>
                        <button className='updatebtn' onClick={HandleClickUpdate}>Update</button>
                        <small id="update__msg">Avatar Updated!!</small>
                    </div>
                </div>
            :
            ""}
            <div className="todo__box">
                <h1>To-Do</h1>
                <div className="todo__bar">
                    <input type="text" placeholder="Enter Task" value={text} onChange={(e)=>setText(e.target.value)} onKeyDown={HandleKeyDown}/>
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

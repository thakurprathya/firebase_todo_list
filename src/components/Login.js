import '../styles/login.css';
import React from 'react';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { auth, provider, db } from '../firebase';
import { useStateValue } from '../context/StateProvider';
import { actionTypes } from '../context/reducer';


const Login = () => {
    // eslint-disable-next-line
    const [{}, dispatch]= useStateValue();

    const HandleSignIn = async () =>{
        try {
            const result = await auth.signInWithPopup(provider);
            const userRef = db.collection('users').doc(result.user.uid);
            const snapshot = await userRef.get();
            if (!snapshot.exists) {
                await userRef.set({
                    displayName: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL
                });
                const todoRef = userRef.collection('todos').doc();
                await todoRef.set({
                    todo: 'Example todo',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                });
            }
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
            dispatch({
                type: actionTypes.SET_SESSION,
                uid: result.user.uid,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL,
                email: result.user.email
            });
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className='login'>
            <h1>Manage Todos</h1>
            <button onClick={HandleSignIn}>Sign in with Google</button>
        </div>
    );
}

export default Login;

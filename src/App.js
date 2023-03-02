import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Main from './components/Main';
import Login from './components/Login';
import Edit from './components/Edit';
import { useStateValue } from './context/StateProvider';
import { actionTypes } from './context/reducer';


function App() {
    const [{user}, dispatch]= useStateValue();

    useEffect(()=>{
        if(localStorage.length > 0){
            const u = {
                uid: localStorage.getItem('uid'),
                displayName: localStorage.getItem('displayName'),
                photoURL: localStorage.getItem('photoURL'),
                email: localStorage.getItem('email')
            };
            dispatch({
                type: actionTypes.SET_USER,
                user: u,
            });
        }
    },[dispatch]);

    return (
        <div className="app">
            {!user ?
                <Login />
            :
                <Router>
                    <Routes>
                        <Route path="/" element={<Main/>} />
                        <Route path="/edit/:todoId" element={<Edit/>} />
                    </Routes>
                </Router>
            }
        </div>
    );
}

export default App;

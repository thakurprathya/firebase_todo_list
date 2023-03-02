import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Main from './components/Main';
import Login from './components/Login';
import Edit from './components/Edit';
import { useStateValue } from './context/StateProvider';


function App() {
    const [{user}]= useStateValue();

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

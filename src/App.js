import Main from './components/Main';
import Login from './components/Login';
import Edit from './components/Edit';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route path="/" element={<Main/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/edit/:todoId" element={<Edit/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;

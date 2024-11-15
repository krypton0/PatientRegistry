import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PatientList from './pages/PatientList';
import PatientDetails from './pages/PatientDetails';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PatientList />} />
                <Route path="/patients/:id" element={<PatientDetails />} />
            </Routes>
        </Router>
    );
}

export default App;

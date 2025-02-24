import React from 'react';
import MainTable from './components/MainTable';
import './App.css';
import { Container } from 'react-bootstrap';

function App() {
    return (
        <Container className="mt-5">
            <div className="App">
                <MainTable />
            </div>
        </Container>
    );
}

export default App;
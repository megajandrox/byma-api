import React from 'react';
import MainTable from './components/MainTable';
import { InvestmentProvider } from './contexts/InvestmentContext';
import { Container } from 'react-bootstrap';


function App() {
    return (
        <Container className="mt-5">
            <InvestmentProvider>
                <MainTable />
            </InvestmentProvider>
        </Container>
    );
}

export default App;
import React, { useState, useEffect } from 'react';
import MainTable from './components/ui/MainTable';
import { InvestmentProvider } from './contexts/InvestmentContext';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', theme); // Set theme on <html>
        localStorage.setItem('theme', theme); // Save theme to localStorage
    }, [theme]); // Run effect when theme changes
    
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <Container className="mt-5">
            <button onClick={toggleTheme} className="btn btn-outline-secondary"> {/* Added Bootstrap styling */}
                {theme === 'light' ? (
                <>
                    <i className="bi bi-moon-fill me-2"></i>
                </>
                ) : (
                <>
                    <i className="bi bi-sun-fill me-2"></i>
                </>
                )}
            </button>
            <InvestmentProvider>
                <MainTable />
            </InvestmentProvider>
        </Container>
    );
}

export default App;
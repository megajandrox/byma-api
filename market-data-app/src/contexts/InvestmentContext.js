import React, { createContext, useState , useEffect } from 'react';
import URLs from '../utils/Environment';
export const InvestmentContext = createContext();

export const InvestmentProvider = ({ children }) => {
    const [data, setData] = useState({
        investments: [],
        total_invested: 0,
        total_initial_investment: 0,
        total_revenue: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const apiUrl = `${URLs.base_api_url}/summary_investments/`;
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [setData, setLoading, setError]);

    return (
        <InvestmentContext.Provider value={{ data, setData, loading, setLoading, error, setError }}>
            {children}
        </InvestmentContext.Provider>
    );
};
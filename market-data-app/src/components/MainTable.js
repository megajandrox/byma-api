import React, { useEffect, useState } from 'react';
import InvestmentTable from './InvestmentTable'
import AddInvestmentForm from './AddInvestmentForm';
import SummaryTable from './SummaryTable';
import ExchangeTable from './ExchangeTable';
import URLs from '../utils/Environment';

const MainTable = () => {
    const [data, setData] = useState({
        investments: [],
        total_invested: 0,
        total_initial_investment: 0,
        total_revenue: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [newInvestment, setNewInvestment] = useState({
        symbol: '',
        initial_date: new Date(),
        amount: 0.0,
        qty: 0
    });
    
    const handleChange = (e) => {
        setNewInvestment({ ...newInvestment, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setData([...data, { ...newInvestment, investment_id: Date.now() }]);
        setShowForm(false);
    };

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
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <h1>Mega Investment</h1>
            {showForm && (<AddInvestmentForm
                handleSubmit={handleSubmit}
                setShowForm={setShowForm}
                handleChange={handleChange}
            />)}
            <InvestmentTable value={data} />
            <SummaryTable value={data} />
            <ExchangeTable />
        </>
    );
};

export default MainTable;

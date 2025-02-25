import React, { useState, useContext } from 'react';
import InvestmentTable from './InvestmentTable';
import AddInvestmentForm from './AddInvestmentForm';
import SummaryTable from './SummaryTable';
import ExchangeTable from './ExchangeTable';
import LoadingSpin from './LoadingSpin';
import { InvestmentContext } from '../contexts/InvestmentContext';

const MainTable = () => {
    const { data, setData, loading, error } = useContext(InvestmentContext);
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
        setData(prevData => ({
            ...prevData,
            investments: [...prevData.investments, { ...newInvestment, investment_id: Date.now() }]
        }));
        setShowForm(false);
    };

    if (loading) return <LoadingSpin />;
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

import React, { useState, useContext } from 'react';
import InvestmentTable from './InvestmentTable';
import AddInvestmentForm from './AddInvestmentForm';
import SummaryTable from './SummaryTable';
import ExchangeTable from './ExchangeTable';
import LoadingSpin from './LoadingSpin';
import { InvestmentContext } from '../../contexts/InvestmentContext';
import ErrorAlert from './ErrorAlert';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const MainTable = () => {
    const { setData, loading, error } = useContext(InvestmentContext);
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
    };

    if (loading) return <LoadingSpin />;
    if (error) return <ErrorAlert message={`Error: ${error.message}`}/>;

    return (
        <>
            <h1>Mega Investment</h1>
            <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
            >
                <Tab eventKey="home" title="Investments">
                    <InvestmentTable />
                    <SummaryTable />
                </Tab>
                <Tab eventKey="exchange" title="Exchange">
                    <ExchangeTable />
                </Tab>
                <Tab eventKey="new_investment" title="New Investment">
                <AddInvestmentForm
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                />
                </Tab>
            </Tabs>
        </>
    );
};

export default MainTable;

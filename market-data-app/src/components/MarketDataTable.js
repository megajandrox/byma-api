import React, { useEffect, useState } from 'react';
import DataCell from './DataCell';
import AlignedCell from './AlignedCell';

const MarketDataTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [newInvestment, setNewInvestment] = useState({
        symbol: '',
        initial_date: new Date(),
        amount: 0.0,
        qty: 0
    });

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL || 'https://byma-api.onrender.com/byma-api/summary_investments/';

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        setNewInvestment({ ...newInvestment, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setData([...data, { ...newInvestment, investment_id: Date.now() }]);
        setShowForm(false);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Mega Investment</h1>
            <button onClick={() => setShowForm(true)}>Add Investment</button>
            {showForm && (
                <div>
                    <h2>New Investment</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="symbol" placeholder="Symbol" onChange={handleChange} required />
                        <input type="date" name="initial_date" onChange={handleChange} required />
                        <input type="number" name="amount" placeholder="Initial Investment" onChange={handleChange} required />
                        <input type="number" name="qty" placeholder="Quantity" onChange={handleChange} required />
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                    </form>
                </div>
            )}
            <table>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Initial Date</th>
                        <th>% Invested</th>
                        <th>Initial Investment</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Current Price</th>
                        <th>Revenue</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={row.investment_id}>
                            <AlignedCell alignment="center">
                                <DataCell value={row.symbol} />
                            </AlignedCell>
                            <AlignedCell alignment="center">
                                <DataCell value={row.initial_date} type="date" />
                            </AlignedCell>
                            <AlignedCell alignment="center">
                                <DataCell value={row.porc_invested} type="percentage" />
                            </AlignedCell>
                            <AlignedCell alignment="right">
                                <DataCell value={row.amount} type="currency" />
                            </AlignedCell>
                            <AlignedCell alignment="right">
                                <DataCell value={row.initial_price} type="currency" />
                            </AlignedCell>
                            <AlignedCell alignment="center">
                                <DataCell value={row.qty} />
                            </AlignedCell>
                            <AlignedCell alignment="right">
                                <DataCell value={row.current_price} type="currency" />
                            </AlignedCell>
                            <AlignedCell alignment="right">
                                <DataCell value={row.revenue} type="currency" />
                            </AlignedCell>
                            <AlignedCell alignment="center">
                                <button onClick={() => console.log('Update', row)}>Update</button>
                                <button onClick={() => console.log('Delete', row)}>Delete</button>
                            </AlignedCell>
                      </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MarketDataTable;
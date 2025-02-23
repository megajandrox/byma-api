import React, { useEffect, useState } from 'react';
import DataCell from './DataCell';
import AlignedCell from './AlignedCell';

const SUB_DOMAIN = 'byma-api';

// Load environment variables from.env file
const environment = {
    base_api_url: `${process.env.REACT_APP_BASE_API_URL}/${SUB_DOMAIN}` || `https://byma-api.onrender.com/${SUB_DOMAIN}`
}

const MarketDataTable = () => {
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

    const [dollarsData, setDollarsData] = useState(null);

    useEffect(() => {
        const apiUrl = `${environment.base_api_url}/summary_investments/`;

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

        // Fetch CCL data
        const dollarsApiUrl = `${environment.base_api_url}/dollars?names=contadoconliqui&names=bolsa&names=blue`;
        console.log(dollarsApiUrl);
        fetch(dollarsApiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch CCL data');
                }
                return response.json();
            })
            .then(dollarsData => {
                setDollarsData(dollarsData);
            })
            .catch(error => {
                console.error('Error fetching CCL data:', error);
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
                    {data.investments.map((row, index) => (
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
            <div>
                <h2>Summary</h2>
                <table>
                    <thead>
                        <tr>
                            <th>By</th>
                            <th>Pesos</th>
                            <th>Dollars</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total Invested</td>
                            <td><DataCell value={data.total_invested} type="currency" /></td>
                            <td><DataCell value={data.total_invested_dollars} type="currency" /></td>
                        </tr>
                        <tr>
                            <td>Total Initial Investment</td>
                            <td><DataCell value={data.total_initial_investment} type="currency" /></td>
                            <td><DataCell value={data.total_initial_investment_dollars} type="currency" /></td>
                        </tr>
                        <tr>
                            <td>Total Revenue</td>
                            <td><DataCell value={data.total_revenue} type="currency" /></td>
                            <td><DataCell value={data.total_revenue_dollars} type="currency" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {dollarsData && (
                <div>
                    <h2>Exchange current Values</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Buy</th>
                                <th>Sell</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dollarsData.map((dollar, index) => (
                                <tr key={index}>
                                    <td>{dollar.nombre} [{dollar.moneda}]</td>
                                    <td><DataCell value={dollar.compra} type="currency"/></td>
                                    <td><DataCell value={dollar.venta} type="currency"/></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MarketDataTable;
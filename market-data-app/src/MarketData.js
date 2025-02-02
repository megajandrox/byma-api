import React, { useEffect, useState } from 'react';
import DataCell from './components/DataCell';
import AlignedCell from './components/AlignedCell';

const MarketData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const apiUrl = 'https://byma-api.onrender.com/byma-api/summary_investments/';

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
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Market Data</h1>
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
                      </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MarketData;
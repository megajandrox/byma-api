import React, { useEffect, useState } from 'react';

const MarketData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const apiUrl = 'https://byma-api.onrender.com/byma-api/investments/';

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
                        <tr key={index}>
                            <td>{row.symbol}</td>
                            <td>{row.initial_date}</td>
                            <td>{row.percentInvested}</td>
                            <td>{row.amount}</td>
                            <td>{row.initial_price}</td>
                            <td>{row.qty}</td>
                            <td>{row.currentPrice}</td>
                            <td>{row.revenue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MarketData;
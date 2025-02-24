import DataCell from './DataCell';
import React, { useEffect, useState } from 'react';

const SUB_DOMAIN = 'byma-api';

// Load environment variables from.env file
const environment = {
    base_api_url: `${process.env.REACT_APP_BASE_API_URL}/${SUB_DOMAIN}` || `https://byma-api.onrender.com/${SUB_DOMAIN}`
}

const ExchangeTable = ({ value: data }) => {
    const [dollarsData, setDollarsData] = useState(null);
    useEffect(() => {
        // Fetch Dollar data
        const dollarsApiUrl = `${environment.base_api_url}/dollars?names=contadoconliqui&names=bolsa&names=blue`;
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
                console.error('Error fetching Dollars data:', error);
            });
    }, []);
    return (<>
        {dollarsData && (
            <>
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
            </>
        )}
    </>)
}

export default ExchangeTable;
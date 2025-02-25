import DataCell from './DataCell';
import React, { useEffect, useState } from 'react';
import URLs from '../../utils/Environment';
import Table from 'react-bootstrap/Table';

const ExchangeTable = () => {
    const [dollarsData, setDollarsData] = useState(null);
    useEffect(() => {
        // Fetch Dollar data
        const dollarsApiUrl = `${URLs.base_api_url}/dollars?names=contadoconliqui&names=bolsa&names=blue`;
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
                <Table striped bordered hover>
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
                </Table>
            </>
        )}
    </>)
}

export default ExchangeTable;
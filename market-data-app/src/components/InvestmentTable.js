import React from 'react';
import DataCell from './DataCell';
import AlignedCell from './AlignedCell';
import Table from 'react-bootstrap/Table';
import UpdateButton from './UpdateButton';
const InvestmentTable = ({ value: data }) => {
    return(<>
        { data && (
            <>
            <Table striped bordered hover>
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
                                <UpdateButton/>
                                <button onClick={() => console.log('Delete', row)}>Delete</button>
                            </AlignedCell>
                    </tr>
                    ))}
                </tbody>
            </Table>
            </>
            )}
    </>);
}

export default InvestmentTable;
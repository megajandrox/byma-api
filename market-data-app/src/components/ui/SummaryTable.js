import React, { useContext } from 'react';
import DataCell from './DataCell';
import Table from 'react-bootstrap/Table';
import { InvestmentContext } from '../../contexts/InvestmentContext';

const SummaryTable = () => {
    const { data } = useContext(InvestmentContext);
    return(<div>
        { data && (
            <>
            <h2>Summary</h2>
            <Table striped bordered hover>
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
            </Table>
            </>
            )}
    </div>);
}

export default SummaryTable;
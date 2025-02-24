import React from 'react';
import DataCell from './DataCell';

const SummaryTable = ({ value: data }) => {
    return(<div>
        { data && (
            <>
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
            </>
            )}
    </div>);
}

export default SummaryTable;
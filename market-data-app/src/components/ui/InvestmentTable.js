import React, { useContext } from 'react';
import DataCell from './DataCell';
import Table from 'react-bootstrap/Table';
import { InvestmentContext } from '../../contexts/InvestmentContext';
import UpdateButton from './UpdateButton';
import DeleteButton from './DeleteButton';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const InvestmentTable = () => {
    const { data } = useContext(InvestmentContext);
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
                            <td><DataCell value={row.symbol} /></td>
                            <td><DataCell value={row.initial_date} type="date"/></td>
                            <td><DataCell value={row.porc_invested} type="percentage"/></td>
                            <td><DataCell value={row.amount} type="currency" /></td>
                            <td><DataCell value={row.initial_price} type="currency" /></td>
                            <td><DataCell value={row.qty} /></td>
                            <td><DataCell value={row.current_price} type="currency" /></td>
                            <td><DataCell value={row.revenue} type="currency" /></td>
                            <td>
                                <Container>
                                    <Row>
                                        <Col><UpdateButton/></Col>
                                        <Col><DeleteButton /></Col>
                                    </Row>
                                </Container>
                            </td>
                    </tr>
                    ))}
                </tbody>
            </Table>
            </>
            )}
    </>);
}

export default InvestmentTable;
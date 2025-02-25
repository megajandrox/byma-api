import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from'react-bootstrap/Button';

const AddInvestmentForm = ({ handleSubmit, handleChange}) => {
    return(<>
        <div>
            <h2>New Investment</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="newInvestmentForm.symbol" onChange={handleChange} required>
                    <Form.Label>Symbol</Form.Label>
                    <Form.Control type="text" placeholder="APPL" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="newInvestmentForm.initial_date" onChange={handleChange} required>
                    <Form.Label>Initial Date</Form.Label>
                    <Form.Control type="date" placeholder="MM/DD/YYYY" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="newInvestmentForm.amount" onChange={handleChange} required>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" placeholder="Amount" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="newInvestmentForm.qty" onChange={handleChange} required>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" placeholder="Quantity" />
                </Form.Group>
                <Button type="submit">Save</Button>
            </Form>
        </div>
    </>);
}

export default AddInvestmentForm;
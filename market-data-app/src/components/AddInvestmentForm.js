import React from 'react';

const AddInvestmentForm = ({ handleSubmit, setShowForm, handleChange}) => {
    return(<>
        <button onClick={() => setShowForm(true)}>Add Investment</button>
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
    </>);
}

export default AddInvestmentForm;
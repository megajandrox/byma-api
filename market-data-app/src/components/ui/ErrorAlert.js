import React from 'react';
import Alert from 'react-bootstrap/Alert';

const ErrorAlert = ({ message }) => {
    <Alert key='danger' variant='danger'>
        { message }
    </Alert>
}

export default ErrorAlert;
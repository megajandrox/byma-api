import React from 'react';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';

const UpdateButton = () => {
    const handleClick = () => {
        console.log('Button clicked!');
    };

    return (
        <>
            <div className="text-center mt-5">
                <OverlayTrigger
                    placement="top"
                    overlay={
                    <Tooltip id="tooltip-top">
                        Update an Investment
                    </Tooltip>
                    }
                >
                    <Button variant="primary" onClick={handleClick}><i className="bi bi-check-circle me-2"></i></Button>
                </OverlayTrigger>
            </div>
        </>
    )
}

export default UpdateButton;
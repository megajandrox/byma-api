import React from 'react';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';

const DeleteButton = () => {
    const handleClick = () => {
        console.log('Button Delete clicked!');
    };

    return (
        <>
            <div className="text-center mt-5">
                <OverlayTrigger
                    placement="top"
                    overlay={
                    <Tooltip id="tooltip-top">
                        Delete an Investment
                    </Tooltip>
                    }
                >
                    <Button variant="danger" onClick={handleClick}><i className="bi bi-x-circle me-2"></i></Button>
                </OverlayTrigger>
            </div>
        </>
    )
}

export default DeleteButton;
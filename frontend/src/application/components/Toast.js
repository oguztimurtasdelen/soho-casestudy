import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const Toasts = ({_show, _message}) => {
    const [show, setShow] = useState(_show);

    return (
        <ToastContainer position="top-end">
            <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide>
                <Toast.Header>
                    <strong className="me-auto">Warning</strong>
                </Toast.Header>
                <Toast.Body>{_message}</Toast.Body>
            </Toast>
        </ToastContainer>
        
    );
}

export default Toasts;
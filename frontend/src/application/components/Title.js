import React from "react";
import { Navbar, Container } from "react-bootstrap";

const Title = ({title}) => {
    return (
        <Navbar
            bg='dark' 
            data-bs-theme="dark" 
            className="bg-body-tertiary mb-3"
        >
            <Container>
                <Navbar.Brand>{title}</Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default Title;
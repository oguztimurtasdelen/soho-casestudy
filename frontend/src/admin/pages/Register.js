import React, { useState } from 'react';
import { Form, Button, Alert, Toast, Navbar, Container } from 'react-bootstrap';
import { Link, useNavigate, useHistory } from 'react-router-dom';

// Services
import authenticationService from "../../services/admin/authenticationService";

// Pages & Components
import Title from "../../application/components/Title";

// System Messages
import { systemMessages } from "../../assets/messages";


const Register = () => {

    // Hooks
    const [registerFormData, setRegisterFormData] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [alertMessage, setAlertMessage] = useState('');

    const history = useHistory();


    // Submit Registration Form
    const submitRegisterForm = async (e) => {
        e.preventDefault();

        // Check Password Regex
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{4,12}$/;
        if (!passwordRegex.test(registerFormData.password)) {
            setAlertMessage(
                systemMessages['form.login.password.regex']
            );
            return;
        }

        if (registerFormData.password !== registerFormData.confirmPassword) {
            setAlertMessage(
                systemMessages['form.login.confirmpassword.notsame']
            );
            return;
        }

        const result = await authenticationService.register(registerFormData);
        if (!result.error) {
            // Show success message here
            history.push("/admin/login");
            
        } else {
            // Show error message here
            
        }

    };


    const handleInputChange = (e) => {
        setRegisterFormData({
            ...registerFormData,
            [e.target.name]: e.target.value,
        });
    };

    
    return (
        <div>
            <Title title={'REGISTER'}/>
            {alertMessage && <Alert variant="warning">{alertMessage}</Alert>}
            <Form onSubmit={submitRegisterForm}>
                <div className='row'>
                    <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12" controlId="formFullName">
                        <Form.Label>Name Surname</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your name and surname"
                            name="fullName"
                            value={registerFormData.fullName}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12" controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your username"
                            name="username"
                            value={registerFormData.username}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Text className="text-muted">
                            name.surname@soho.dev
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            value={registerFormData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Text className="text-muted">
                            {systemMessages['form.login.password.regex']}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12" controlId="formConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password, again"
                            name="confirmPassword"
                            value={registerFormData.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Text className="text-muted">
                            Retype your password
                        </Form.Text>
                    </Form.Group>

                    <div className="mb-3 d-grid">
                        <Button variant="dark" type="submit">
                            Register
                        </Button>
                    </div>
                </div>
            </Form>

            <div className="alert alert-info" role="alert">
                <p className="mt-3">
                    Already have an account?{' '}
                    <Link to="/admin/login" className="link">
                        Login here.
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

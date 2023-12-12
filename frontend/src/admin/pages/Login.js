import React, { useState } from 'react';
import { Form, Button, InputGroup, FormControl, FormText, Alert, Navbar, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

// Services
import authenticationService from "../../services/admin/authenticationService";

// Pages & Components
import Title from "../../application/components/Title";

// System Messages
import { systemMessages } from "../../assets/messages";

const Login = () => {

  // Hooks
  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const history = useHistory();

  const submitLoginForm = async (e) => {
    // Cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
    e.preventDefault();

    if (!loginFormData.username || !loginFormData.password) {
      
      return;
    }

    const result = await authenticationService.login(loginFormData);
    if (!result.error) {
      // Show success message here
      // Save credentials to local storage
      
      history.push("/admin/");
    } else {
      // Show error message here
    }

  };

  const handleInputChange = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
};


  return (
    <div>
      <Title title={'LOGIN'}/>
      
      <Form onSubmit={submitLoginForm}>
        <div className="row">
          <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              name="username"
              value={loginFormData.username}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <FormControl
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                name="password"
                value={loginFormData.password}
                onChange={handleInputChange}
                required
              />
              <InputGroup.Text
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer' }}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <div className="mb-3 d-grid">
            <Button variant="dark" type="submit">
              Login
            </Button>
          </div>
        </div>
      </Form>

      <div className="alert alert-info" role="alert">
        <p className="mt-3">
          Don't have an account?{' '}
          <Link to="/admin/register" className="link">
            Register here.
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

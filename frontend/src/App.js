import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import { AuthContext } from './contexts/auth-context';

// Application Components & Pages
import PrivateRoute from './application/components/PrivateRoute';
import Home from './application/pages/Home';
import Sidebar from './application/components/Sidebar';
import ProductDetailsPage from './application/pages/ProductDetailsPage';


// Admin Components & Pages
import Login from './admin/pages/Login';
import Register from './admin/pages/Register';
import AdminSidebar from "./admin/components/Sidebar";
import Dashboard from "./admin/pages/Dashboard";
import OrderManagement from './admin/pages/OrderManagement';

// Services
import authenticationService from "./services/admin/authenticationService"


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <Router>
      <div className="app-container">
        <AuthContext.Provider
          value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
        >
          {isLoggedIn ? true : false}
        </AuthContext.Provider>

        <Sidebar />
        <AdminSidebar />
        
        
        <div className="content-container">
          <div className='container'>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/product/:productid" exact component={ProductDetailsPage} />
              
              <Route path="/admin/login" exact component={Login} />
              <Route path="/admin/register" exact component={Register} />
              
              <PrivateRoute path="/admin/" exact component={Dashboard} />
              <PrivateRoute path="/admin/order-management/:productcode" exact component={OrderManagement} />
              <Redirect to="/" />
            </Switch>
            
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
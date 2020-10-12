import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import NotFound from './components/utils/NotFound';
import Login from './components/reg/Login';
import Register from './components/reg/Register';
import Header from './components/utils/Header';
import Profile from './components/utils/Profile';
import UserProfile from './components/agent/UserProfile';
import AdminProfile from './components/admin/AdminProfile';
import Shipment from './components/agent/Shipment';
import AddShipment from './components/sec/AddShipment';
import Customers from './components/agent/Customers';
import TrackTrace from './components/homepage/TrackAndTrace';
import Payment from './components/agent/Payment';
import Account from './components/agent/Account';
import Contact from './components/agent/Contact';
import ForgotPass from './components/reg/ForgotPass';
import UpdatePass from './components/reg/UpdatePass';
import ModShipment from './components/mod/ModShipment';
import TrackAndTrace from './components/homepage/TrackAndTrace';

import { ProtectedRoute } from './components/utils/ProtectedRoute';
import AuthProvider from './context/AuthContext';
import ViewShipments from './components/sec/ViewShipments/ViewShipments';

function App() {
  const currentLocation = window.location.pathname;
  // console.log(currentLocation)
  return (
    // <ViewShipments/>
    <AuthProvider>
        <Router>
          {
            currentLocation === "/" ? null : <Header />
          }
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/user/resetPassword/+:token" component={UpdatePass} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPass} />
            <Route path="/tracktrace" component={TrackAndTrace} />
            <ProtectedRoute path="/profile" component={Profile} />
            <ProtectedRoute path="/agent" component={UserProfile} />
            <ProtectedRoute path="/ModShipment" component={ModShipment} />
            <ProtectedRoute path="/admin" component={AdminProfile} />
            <ProtectedRoute path="/shipment" component={Shipment} />
            <ProtectedRoute path="/track&trace" component={TrackTrace} />
            <ProtectedRoute path="/payment" component={Payment} />
            <ProtectedRoute path="/account" component={Account} />
            <ProtectedRoute path="/contact" component={Contact} />
            <ProtectedRoute path="/customers" component={Customers} />
            <ProtectedRoute path="/AddShipment" component={AddShipment} />
            <Route component={NotFound} />
          </Switch>
        </Router>
    </AuthProvider>
  );
}

export default App;

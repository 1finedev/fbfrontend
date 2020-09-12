import React, { useContext } from 'react';

import { AuthContext } from '../../context/AuthContext';
import UserProfile from '../agent/UserProfile';
import AdminProfile from '../admin/AdminProfile';
import SecProfile from '../sec/SecProfile';
import ModProfile from '../mod/ModProfile';
import { Spinner } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = props => {
  const { role, isSuper } = useContext(AuthContext);
  const selectProfile = props => {
    switch (role) {
      case null:
        return <Spinner />;
      case 'admin':
        return <AdminProfile />;
      case 'mod':
        return <ModProfile />;
      case 'sec':
        return <SecProfile />;
      case 'user':
        return <UserProfile />;
      default:
        return <p>Unable to render page.. Contact webmaster</p>;
    }
  };
  return <div> {selectProfile()} </div>;
};

export default Profile;

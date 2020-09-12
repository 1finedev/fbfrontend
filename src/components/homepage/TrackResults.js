import React, { useContext, useState } from 'react';
import { Table } from 'reactstrap';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const TrackResults = props => {
  let validUser = false;
  const {
    mobile,
    shipstatus,
    shipType,
    paymentStatus,
    shipMode,
    shipcode,
    name,
    destination,
    weight,
    carton,
    createdAt
  } = props.data;
  const { user, isAuthenticated } = useContext(AuthContext);
  if (user) {
    if (props.data.user._id === user._id) {
      validUser = true;
    }
  }

  const date = new Date(createdAt);
  const agent = props.data.user && props.data.user.agentID;
  return (
    <>
      {' '}
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Track Shipment Details</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className="td1">
          <tr>
            <th scope="row">*</th>
            <td>Shipment Name:</td>
            <td>{name}</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">*</th>
            <td>Shipment Code:</td>
            <td>{shipcode}</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">*</th>
            <td>Destination:</td>
            <td>{destination}</td>
            <td>...</td>
          </tr>
          <tr>
            <th scope="row">*</th>
            <td>Weight:</td>
            <td>{weight}KG</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">*</th>
            <td>Status:</td>
            <td>{shipstatus}</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">*</th>
            <td>Reciever Mobile:</td>
            <td>{validUser ? <>{mobile}</> : <>*Number Hidden*</>}</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">*</th>
            <td>Logged Date:</td>
            <td>{date.toDateString()}</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">*</th>
            <td>Shipment Type:</td>
            <td>{shipType}</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">*</th>
            <td>carton No:</td>
            <td>{carton}</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">*</th>
            <td>Payment Status:</td>
            <td>{paymentStatus}</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">*</th>
            <td>Sender</td>
            <td>{agent}</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">*</th>
            <td>Shipment Mode:</td>
            <td>{shipMode}</td>
            <td></td>
          </tr>
        </tbody>
        <Link to="/tracktrace">
          <h6>...Back to Tracking</h6>
        </Link>
      </Table>
    </>
  );
};

export default TrackResults;

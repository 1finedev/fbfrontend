import React, { useContext, useEffect } from 'react';
import {
  Jumbotron,
  Container,
  Toast,
  ToastBody,
  ToastHeader,
  Button
} from 'reactstrap';
import { AuthContext } from '../../context/AuthContext';
import { ShipmentContext } from '../../context/ShipmentContext';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import 'bootstrap/dist/css/bootstrap.min.css';

const ModProfile = props => {
  const { user } = useContext(AuthContext);
  const { stats } = useContext(ShipmentContext);
  const name = user.name;
  const tShip = stats && stats.tshipments;
  const tkg = stats && stats.tkg;

  return (
    <div>
      <Jumbotron>
        <h4 className="display-5">Welcome {name} </h4>

        <span>ACCOUNT OVERVIEW PAGE</span>

        <hr className="my-2" />
        <Container>
          <div className="profileanalytics">
            <div className="topanalcenter">
              <div className="inner">
                <div className="analcircle">
                  <CountUp start={0} end={tShip} delay={0}>
                    {({ countUpRef }) => (
                      <div>
                        <span ref={countUpRef} />
                      </div>
                    )}
                  </CountUp>
                </div>
                Shipments (Week)
              </div>
              <div className="inner">
                <div className="analcircle">
                  {' '}
                  <CountUp start={0} end={tkg} delay={0}>
                    {({ countUpRef }) => (
                      <div>
                        <span ref={countUpRef} />
                      </div>
                    )}
                  </CountUp>
                </div>
                Total Kilograms
              </div>
            </div>
            <hr className="my-2" />
          </div>
        </Container>
        <h5 className="analyhead">QUICK LINKS</h5>
        <div className="p-3 my-2 rounded bg-docs-transparent-grid links">
          <Toast>
            <ToastHeader>SHIPMENTS</ToastHeader>
            <ToastBody>
              <span>View, Update and Flag Shipments</span>
              <Link to="/ModShipment">
                <Button color="primary wrap">Go to Shipments</Button>
              </Link>
            </ToastBody>
          </Toast>
          <Toast>
            <ToastHeader>ADD CUSTOMERS</ToastHeader>
            <ToastBody>
              <span>Add, Edit and Delete Customers</span>
              <Link to="/customers">
                <Button color="primary wrap">Go to Customers</Button>
              </Link>
            </ToastBody>
          </Toast>
          <Toast>
            <ToastHeader>TRACK & TRACE</ToastHeader>
            <ToastBody>
              <span>Enter a "Tracking Number" to get information</span>
              <Link to="/Track&Trace">
                <Button color="primary wrap">Go to Track & Trace</Button>
              </Link>
            </ToastBody>
          </Toast>
          <Toast>
            <ToastHeader>PERFORMACE & PAYMENTS</ToastHeader>
            <ToastBody>
              <span>Review Performace, Claim rewards and more...</span>
              <Link to="/payment">
                <Button color="primary wrap">Go to payments</Button>
              </Link>
            </ToastBody>
          </Toast>
          <Toast>
            <ToastHeader>ACCOUNT</ToastHeader>
            <ToastBody>
              <span>Edit profile, Change password, Delete Account </span>
              <Link to="/account">
                <Button color="primary wrap">Go to Account</Button>
              </Link>
            </ToastBody>
          </Toast>

          <Toast>
            <ToastHeader>Contact Us</ToastHeader>
            <ToastBody>
              <span>Use this link to lodge your complains</span>
              <Link to="/contact">
                <Button color="primary wrap">Contact Us</Button>
              </Link>
            </ToastBody>
          </Toast>
        </div>
      </Jumbotron>
    </div>
  );
};

export default ModProfile;

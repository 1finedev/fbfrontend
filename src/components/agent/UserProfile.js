import React, { useContext, useState, useEffect } from 'react';
import {
  Jumbotron,
  Container,
  Toast,
  ToastBody,
  ToastHeader,
  Button,
  Badge,
  Popover,
  PopoverHeader
} from 'reactstrap';
import { AuthContext } from '../../context/AuthContext';
import { ShipmentContext } from '../../context/ShipmentContext';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';

const UserProfile = props => {
  const { user } = useContext(AuthContext);
  const { stats, agentWeekStats } = useContext(ShipmentContext);
  const name = user.name;
  const admin = user.admin;
  const tShip = stats && stats.tshipments;
  const tkg = stats && stats.tkg;
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);
  useEffect(() => {
    toggle();
  }, []);
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
                Total Shipments
              </div>
              <div>
                {admin ? (
                  <>
                    {' '}
                    <Toast>
                      <ToastHeader>Admin Portal</ToastHeader>
                      <ToastBody>
                        <span>Access Admin Area</span> <br />
                        <Link to="/admin">
                          <Button color="primary wrap">Go to Admin</Button>
                        </Link>
                      </ToastBody>
                    </Toast>
                  </>
                ) : null}
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
              <span>View, Dispute and update shipments</span>
              <br />
              <Link to="/shipment">
                <Button id="Popover1" color="primary wrap">
                  Go to Shipments{' '}
                </Button>
              </Link>
              <Popover
                placement="top-end"
                isOpen={popoverOpen}
                target="Popover1"
                toggle={toggle}
              >
                <PopoverHeader>
                  <Badge color="danger">+{agentWeekStats}</Badge>
                </PopoverHeader>
              </Popover>
            </ToastBody>
          </Toast>
          <Toast>
            <ToastHeader>Performance & Analytics</ToastHeader>
            <ToastBody>
              <span>Review Performances, Check Statistics and more..</span>{' '}
              <br />
              <Link to="/customers">
                <Button color="primary wrap">Go to Analytics</Button>
              </Link>
            </ToastBody>
          </Toast>
          <Toast>
            <ToastHeader>TRACK & TRACE</ToastHeader>
            <ToastBody>
              <span>Enter a "Tracking Number" to get information</span> <br />
              <Link to="/Track&Trace">
                <Button color="primary wrap">Go to Track & Trace</Button>
              </Link>
            </ToastBody>
          </Toast>
          <Toast>
            <ToastHeader>PERFORMACE & PAYMENTS</ToastHeader>
            <ToastBody>
              <span>Review Performace, Claim rewards and more...</span> <br />
              <Link to="/payment">
                <Button color="primary wrap">Go to payments</Button>
              </Link>
            </ToastBody>
          </Toast>
          <Toast>
            <ToastHeader>ACCOUNT</ToastHeader>
            <ToastBody>
              <span>Edit profile, Change password, Delete Account </span> <br />
              <Link to="/account">
                <Button color="primary wrap">Go to Account</Button>
              </Link>
            </ToastBody>
          </Toast>

          <Toast>
            <ToastHeader>Contact Us</ToastHeader>
            <ToastBody>
              <span>Use this link to lodge your complains</span> <br />
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

export default UserProfile;

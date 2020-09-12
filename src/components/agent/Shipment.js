import React, { useContext, useState, useEffect } from 'react';
import { ShipmentContext } from './../../context/ShipmentContext';
import ShipmentService from './../../services/ShipmentService';
import { AuthContext } from '../../context/AuthContext';
import classnames from 'classnames';
import startOfWeek from 'date-fns/startOfWeek';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Jumbotron,
  Tooltip,
  Table,
  Progress
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ModalShip from './Modal';

const Shipment = () => {
  const [error, setError] = useState(null);
  const { Messages, shipmentsAgent } = useContext(ShipmentContext);
  const { user } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);
  const [clickedShip, setClickedShip] = useState(null);
  const Ships = shipmentsAgent && shipmentsAgent;
  const [ships2, setShips2] = useState(null);
  const shipmentContext = useContext(ShipmentContext);
  const userid = user && user._id;
  const startDate = startOfWeek(Date.now(), { weekStartsOn: 6 });
  let count;
  const [activeTab, setActiveTab] = useState('1');

  const toggler = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const removeClass = () => {
    setTimeout(() => {
      shipmentContext.setMessages('');
      setError('');
    }, 2000);
  };

  const getShipmentsAgent = async id => {
    const res = await ShipmentService.getShipmentsAgent(id);
    const { error, data } = res;
    if (data) {
      shipmentContext.setShipmentsAgent(data);
    } else {
      setError(error);
      removeClass();
    }
  };

  const getWeekShipmentsAgent = async () => {
    const res = await ShipmentService.getWeekShipmentsAgent();
    const { error, doc } = res;
    const totalWeekShips = doc.length;
    if (doc) {
      setShips2(doc);
      shipmentContext.setAgentWeekStats(totalWeekShips);
    } else {
      setError(error);
      removeClass();
    }
  };

  const editShip = clickedId => {
    setClickedShip(clickedId);
    setEdit(true);
  };

  const handleSearch = async (e, current) => {
    const value = { [e.target.name]: e.target.value };
    if (current) {
      const res = await ShipmentService.searchShipmentsAgent(value, current);
      const { error, data } = res;
      if (data) {
        setShips2(data.doc);
        count = data.results;
        setEdit(true);
      } else {
        setError(error);
        removeClass();
      }
    } else {
      const res = await ShipmentService.searchShipmentsAgent(value);
      const { error, data } = res;
      if (data) {
        shipmentContext.setShipmentsAgent(data.doc);
        count = data.results;
        setEdit(true);
      } else {
        setError(error);
        removeClass();
      }
    }
  };

  useEffect(() => {
    getShipmentsAgent(userid);
    getWeekShipmentsAgent();
  }, [Messages]);

  return (
    <div>
      <Nav tabs className="tabs">
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggler('1');
            }}
          >
            Current Shipment(s)
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggler('2');
            }}
          >
            View All Shipments
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="2">
          <div className="flex">
            <div className="addshipment2">
              <Jumbotron>
                <h4>All Weeks </h4>
                <div className="searchpane">
                  <div className="input-group form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="term"
                      placeholder="search a shipment"
                      onChange={e => {
                        handleSearch(e);
                      }}
                    />
                  </div>
                </div>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>SHIP CODE</th>
                      <th>NAME</th>
                      <th>DESTINATION</th>
                      <th>WEIGHT</th>
                      <th>PHONE</th>
                      <th>DATE</th>
                      <th>STATUS</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Ships
                      ? Ships.map((shipment, index) => {
                          const no = index + 1;
                          const date = new Date(shipment.createdAt);
                          const lock = shipment.locked;
                          return (
                            <tr key={shipment._id}>
                              <th scope="row">{no}</th>
                              <td>FB-{shipment.shipcode}</td>
                              <td>{shipment.name}</td>
                              <td>{shipment.destination}</td>
                              <td>{shipment.weight}</td>
                              <td>{shipment.mobile}</td>
                              <td>{date.toDateString()}</td>
                              <td>{shipment.shipstatus}</td>
                              <td>{shipment.action}</td>
                              <td>
                                {lock ? (
                                  <i class="fa regtext1 fa-lock" aria-hidden="true"></i>
                                ) : (
                                  <>
                                    <Link
                                      onClick={() => {
                                        editShip(shipment._id);
                                      }}
                                    >
                                      <i
                                        class="fa fa-pencil-square-o"
                                        aria-hidden="true"
                                      ></i>
                                    </Link>
                                  </>
                                )}
                              </td>
                              {edit && clickedShip === shipment._id ? (
                                <ModalShip
                                  id={shipment._id}
                                  mobile={shipment.mobile}
                                  destination={shipment.destination}
                                />
                              ) : null}
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </Table>
              </Jumbotron>
            </div>
          </div>
        </TabPane>
      </TabContent>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <div className="flex">
            <div className="addshipment2">
              <Jumbotron>
                <h4>This Week </h4>
                <div className="searchpane">
                  <div className="input-group form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="term"
                      placeholder="search a shipment"
                      onChange={e => {
                        let current = true;
                        handleSearch(e, current);
                      }}
                    />
                  </div>
                </div>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>SHIP CODE</th>
                      <th>NAME</th>
                      <th>DESTINATION</th>
                      <th>WEIGHT</th>
                      <th>PHONE</th>
                      <th>DATE</th>
                      <th>STATUS</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ships2
                      ? ships2.map((shipment, index) => {
                          const no = index + 1;
                          const date = new Date(shipment.createdAt);
                          const lock = shipment.locked;

                          return (
                            <tr key={shipment._id}>
                              <th scope="row">{no}</th>
                              <td>FB-{shipment.shipcode}</td>
                              <td>{shipment.name}</td>
                              <td>{shipment.destination}</td>
                              <td>{shipment.weight}</td>
                              <td>{shipment.mobile}</td>
                              <td>{date.toDateString()}</td>
                              <td>{shipment.shipstatus}</td>
                              <td>{shipment.action}</td>
                              <td>
                                {lock ? (
                                  <i class="fa regtext1 fa-lock" aria-hidden="true"></i>
                                ) : (
                                    <>
                                <Link
                                  onClick={() => {
                                    editShip(shipment._id);
                                  }}
                                >
                                  <i
                                    class="fa fa-pencil-square-o"
                                    aria-hidden="true"
                                  ></i>
                                      </Link></>
                                  )}
                              </td>
                              {edit && clickedShip === shipment._id ? (
                                <ModalShip
                                  id={shipment._id}
                                  mobile={shipment.mobile}
                                  destination={shipment.destination}
                                />
                              ) : null}
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </Table>
              </Jumbotron>
            </div>
          </div>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Shipment;

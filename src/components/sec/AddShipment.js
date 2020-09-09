import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import ModalShip from './Modal';
import startOfWeek from 'date-fns/startOfWeek';
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
import classnames from 'classnames';
import { ShipmentContext } from './../../context/ShipmentContext';
import ShipmentService from './../../services/ShipmentService';
import SearchShipments from '../utils/SearchShipments';

const AddShipment = props => {
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [error, setError] = useState(false);
  const [edit, setEdit] = useState(false);
  const [clickedShip, setClickedShip] = useState(null);
  const [progress, setProgress] = useState(null);
  const [pagination, setPagination] = useState(1);
  const [indexPoint, setIndexPoint] = useState(1);
  const [file, setFile] = useState();
  const { handleSubmit, register, errors, reset } = useForm();
  const {
    register: register2,
    errors: errors2,
    handleSubmit: handleSubmit2
  } = useForm();
  const shipmentContext = useContext(ShipmentContext);
  const { Messages, todayShipment, shipments } = useContext(ShipmentContext);
  const todayShip = todayShipment && todayShipment.data;
  const Ships = shipments && shipments.data;
  const startDate = startOfWeek(Date.now(), { weekStartsOn: 6 });
  let lock = false;

  const removeClass = () => {
    setTimeout(() => {
      shipmentContext.setMessages('');
      setError('');
    }, 2000);
  };

  // load more pagination
  const loadMore = () => {
    const totalNo = (Ships && Ships.length) || (todayShip && todayShip.length);
    if (totalNo < 100) {
      return null;
    }
    return 'Load More...';
  };

  const editShip = clickedId => {
    setClickedShip(clickedId);
    setEdit(true);
  };

  const deleteShip = async id => {
    if (
      window.confirm('Click Ok to Confirm delete! Note: This cannot be undone!')
    ) {
      const data = await ShipmentService.deleteShipment(id);
      const { message, error } = data;
      if (message) {
        shipmentContext.setMessages(message);
        removeClass();
      } else {
        setError(error);
      }
    } else {
      return;
    }
  };
  const getShipments = async () => {
    const data = await ShipmentService.getShipmentsToday(pagination);
    shipmentContext.setTodayShipment(data);
  };

  const getShipmentsAll = async () => {
    const data = await ShipmentService.getShipments(pagination);
    shipmentContext.setShipments(data);
  };

  const onChange = e => {
    setFile(e.target.files[0]);
  };

  const postManyShipment = async values => {
    setProgress(30);
    const formData = new FormData();
    formData.append('file', file);
    setProgress(65);
    const data = await ShipmentService.postManyShipment(formData);
    setProgress(75);
    const { message, error } = data;
    setProgress(100);
    if (message) {
      shipmentContext.setMessages(message);
      reset();
      removeClass();
      setProgress(null);
      return;
    } else {
      setError(error);
      removeClass();
      setProgress(null);
      return;
    }
  };
  const postShipment = async values => {
    const data = await ShipmentService.postOneShipment(values);
    const { message, error } = data;

    if (message) {
      shipmentContext.setMessages(message);
      reset();
      removeClass();
      return;
    } else {
      setError(error);
      removeClass();
      return;
    }
  };

  const [activeTab, setActiveTab] = useState('1');

  const toggler = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    getShipments();
    getShipmentsAll();
  }, [Messages, pagination]);

  return (
    <div>
      <Nav tabs className="tabs">
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggler('1');
              setPagination(1);
              setIndexPoint(1);
            }}
          >
            Add Shipment
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggler('2');
              setPagination(1);
              setIndexPoint(1);
            }}
          >
            View All Shipments
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => {
              toggler('3');
              setPagination(1);
              setIndexPoint(1);
            }}
          >
            View Unassigned Shipments
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <div className="flex">
            <div className="addshipment">
              <Jumbotron>
                <div>
                  <div>
                    <label>
                      {Messages ? (
                        <h5 className="regtext2">{Messages}</h5>
                      ) : null}
                      {error ? <h5 className="regtext1">{error}</h5> : null}{' '}
                    </label>
                    <div className="multiship">
                      <h4> Add Multiple Shipments</h4>
                      <label className="regtext1">
                        {errors2.file && errors2.file.message}
                      </label>
                      {progress ? (
                        <Progress color="success" value={progress} />
                      ) : (
                        <form
                          key={2}
                          onChange={onChange}
                          onSubmit={handleSubmit2(postManyShipment)}
                        >
                          {' '}
                          <label className="regtext">
                            Upload CSV File
                          </label>{' '}
                          <div className="input-group form-group">
                            <input
                              type="file"
                              className="form-control"
                              name="file"
                              ref={register2({
                                required: 'File Required!'
                              })}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="submit"
                              value="Upload"
                              className="btn float-right login_btn"
                            />
                          </div>
                        </form>
                      )}
                    </div>
                    <hr />
                    <h4> Add Single Shipment</h4>{' '}
                    <form key={1} onSubmit={handleSubmit(postShipment)}>
                      <label className="regtext">Customer Name</label>{' '}
                      <div className="input-group form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          id="nameerror"
                          placeholder="Customer Name"
                          ref={register({
                            required: 'Customer Name is required!'
                          })}
                        />
                        {errors ? (
                          <Tooltip
                            placement="top"
                            isOpen={tooltipOpen}
                            target="nameerror"
                            toggle={toggle}
                          >
                            <label>{errors.name && errors.name.message}</label>
                          </Tooltip>
                        ) : null}
                      </div>
                      <label className="regtext">Destination</label>
                      <div className="input-group form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="destination"
                          id="desterror"
                          placeholder="Destination"
                          ref={register({
                            required: 'Destination is required!'
                          })}
                        />
                        {errors ? (
                          <Tooltip
                            placement="top"
                            isOpen={tooltipOpen}
                            target="desterror"
                            toggle={toggle}
                          >
                            <label>
                              {errors.destination && errors.destination.message}
                            </label>
                          </Tooltip>
                        ) : null}
                      </div>
                      <label className="regtext">Weight (KG)</label>
                      <div className="input-group form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="weight"
                          id="weighterror"
                          placeholder="Weight"
                          ref={register({
                            required: 'Weight is required!',
                            pattern: {
                              value: /^[+]?([1-9][0-9]*(?:[.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/,
                              message: 'Enter a valid Weight'
                            }
                          })}
                        />
                        {errors ? (
                          <Tooltip
                            placement="top"
                            isOpen={tooltipOpen}
                            target="weighterror"
                            toggle={toggle}
                          >
                            <label>
                              {errors.weight && errors.weight.message}
                            </label>
                          </Tooltip>
                        ) : null}
                      </div>
                      <label className="regtext">Carton Number</label>
                      <div className="input-group form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="carton"
                          id="cartonerror"
                          placeholder="Carton Number"
                          ref={register({
                            required: 'Carton Number is required!',
                            pattern: {
                              value: /^[+]?([1-9][0-9]*(?:[.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/,
                              message: 'Enter a valid Carton Number'
                            }
                          })}
                        />
                        {errors ? (
                          <Tooltip
                            placement="top"
                            isOpen={tooltipOpen}
                            target="cartonerror"
                            toggle={toggle}
                          >
                            <label>
                              {errors.carton && errors.carton.message}
                            </label>
                          </Tooltip>
                        ) : null}
                      </div>
                      <label className="regtext">Agent Code</label>
                      <div className="input-group form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="agentID"
                          id="agentIDerror"
                          placeholder="Agent Code"
                          ref={register({
                            required: 'Agent Code:fb-- is required!'
                          })}
                        />
                        {errors ? (
                          <Tooltip
                            placement="top"
                            isOpen={tooltipOpen}
                            target="agentIDerror"
                            toggle={toggle}
                          >
                            <label>
                              {errors.agentID && errors.agentID.message}
                            </label>
                          </Tooltip>
                        ) : null}
                      </div>
                      <label className="regtext">Shipment Type</label>
                      <div className="input-group form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="shipType"
                          id="shipTypeError"
                          placeholder="Shipment Type"
                          ref={register({
                            required: 'Shipment type is required!'
                          })}
                        />
                        {errors ? (
                          <Tooltip
                            placement="top"
                            isOpen={tooltipOpen}
                            target="shipTypeError"
                            toggle={toggle}
                          >
                            <label>
                              {errors.shipType && errors.shipType.message}
                            </label>
                          </Tooltip>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <input
                          type="submit"
                          value="Add"
                          className="btn float-right login_btn"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </Jumbotron>
            </div>
            <div className="addshipment2">
              <Jumbotron>
                <h4>Today's Shipments </h4>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>NAME</th>
                      <th>DESTINATION</th>
                      <th>WEIGHT</th>
                      <th>CARTON</th>
                      <th>AGENT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayShipment
                      ? todayShip.map((shipment, index) => {
                          const no = index + indexPoint;
                          return (
                            <tr key={shipment._id}>
                              <th scope="row">{no}</th>
                              <td>{shipment.name}</td>
                              <td>{shipment.destination}</td>
                              <td>{shipment.weight}</td>
                              <td>{shipment.carton}</td>
                              <td>{shipment.user.agentID}</td>
                              <td>
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
                              </td>
                              {edit && clickedShip === shipment._id ? (
                                <ModalShip
                                  id={shipment._id}
                                  name={shipment.name}
                                  destination={shipment.destination}
                                  carton={shipment.carton}
                                  weight={shipment.weight}
                                  agentID={shipment.user.agentID}
                                  shipType={shipment.shipType}
                                />
                              ) : null}
                              <td>
                                <Link
                                  onClick={() => {
                                    deleteShip(shipment._id);
                                  }}
                                >
                                  <i class="fa fa-trash" aria-hidden="true"></i>
                                </Link>
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </Table>
                <Link
                  onClick={() => {
                    setPagination(pagination + 1);
                    setIndexPoint(indexPoint + 100);
                  }}
                >
                  <button>{loadMore()}</button>{' '}
                </Link>
                {pagination > 1 ? (
                  <Link
                    onClick={() => {
                      setPagination(pagination - 1);
                      setIndexPoint(indexPoint - 100);
                    }}
                  >
                    <button>{loadMore()}</button>{' '}
                  </Link>
                ) : null}
              </Jumbotron>
            </div>
          </div>
        </TabPane>
        <TabPane tabId="2">
          <div className="allship">
            {' '}
            <Jumbotron>
              <h4> All Shipments</h4>
              <div className="searchpane">
                <SearchShipments />
              </div>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>SHIP CODE</th>
                    <th>NAME</th>
                    <th>DESTINATION</th>
                    <th>WEIGHT</th>
                    <th>CARTON</th>
                    <th>AGENT</th>
                    <th>DATE</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {Ships
                    ? Ships.map((shipments, index) => {
                        const no = index + indexPoint;
                        const date = new Date(shipments.createdAt);
                        if (date < startDate) {
                          lock = true;
                        }
                        return (
                          <tr>
                            <th scope="row">{no}</th>
                            <td>FB-{shipments.shipcode}</td>
                            <td>{shipments.name}</td>
                            <td>{shipments.destination}</td>
                            <td>{shipments.weight}</td>
                            <td>{shipments.carton}</td>
                            <td>{shipments.user.agentID}</td>
                            <td>{date.toDateString()}</td>

                            <td>{shipments.shipstatus}</td>
                            <td>{shipments.action}</td>
                            <td>
                              {lock ? (
                                <i class="fa fa-lock" aria-hidden="true"></i>
                              ) : (
                                <>
                                  <Link
                                    onClick={() => {
                                      editShip(shipments._id);
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
                            {edit && clickedShip === shipments._id ? (
                              <ModalShip
                                id={shipments._id}
                                name={shipments.name}
                                destination={shipments.destination}
                                carton={shipments.carton}
                                weight={shipments.weight}
                                agentID={shipments.user.agentID}
                              />
                            ) : null}
                            <td>
                              {lock ? (
                                <i class="fa fa-lock" aria-hidden="true"></i>
                              ) : (
                                <>
                                  <Link
                                    onClick={() => {
                                      deleteShip(shipments._id);
                                    }}
                                  >
                                    <i
                                      class="fa fa-trash"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                </>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </Table>
              <Link
                onClick={() => {
                  setPagination(pagination + 1);
                  setIndexPoint(indexPoint + 100);
                }}
              >
                <button>{loadMore()}</button>{' '}
              </Link>
            </Jumbotron>
          </div>
        </TabPane>
      </TabContent>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="3">
          <div className="allship">
            <Jumbotron>
              <h4> Unassigned Shipments</h4>
              <div className="searchpane">
                <SearchShipments />
              </div>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>SHIP CODE</th>
                    <th>NAME</th>
                    <th>DESTINATION</th>
                    <th>WEIGHT</th>
                    <th>CARTON</th>
                    <th>AGENT</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {Ships
                    ? Ships.map((shipments, index) => {
                        const no = index + indexPoint;

                        if (shipments.user.agentID === 'idk') {
                          return (
                            <tr>
                              <th scope="row">{no}</th>
                              <td>FB-{shipments.shipcode}</td>
                              <td>{shipments.name}</td>
                              <td>{shipments.destination}</td>
                              <td>{shipments.weight}</td>
                              <td>{shipments.carton}</td>
                              <td>{shipments.user.agentID}</td>
                              <td>{shipments.shipstatus}</td>
                              <td>{shipments.action}</td>
                              <td>
                                <Link
                                  onClick={() => {
                                    editShip(shipments._id);
                                  }}
                                >
                                  <i
                                    class="fa fa-pencil-square-o"
                                    aria-hidden="true"
                                  ></i>
                                </Link>
                              </td>
                              {edit && clickedShip === shipments._id ? (
                                <ModalShip
                                  id={shipments._id}
                                  name={shipments.name}
                                  destination={shipments.destination}
                                  carton={shipments.carton}
                                  weight={shipments.weight}
                                  agentID={shipments.user.agentID}
                                />
                              ) : null}
                              <td>
                                <Link
                                  onClick={() => {
                                    deleteShip(shipments._id);
                                  }}
                                >
                                  <i class="fa fa-trash" aria-hidden="true"></i>
                                </Link>
                              </td>
                            </tr>
                          );
                        }
                      })
                    : null}
                </tbody>
              </Table>
              <Link
                onClick={() => {
                  setPagination(pagination + 1);
                }}
              >
                <button>{loadMore()}</button>{' '}
              </Link>
            </Jumbotron>
          </div>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default AddShipment;

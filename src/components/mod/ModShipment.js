import React, { useState, useContext, useEffect } from 'react';
import { Jumbotron, Button, Table } from 'reactstrap';
import ShipmentService from './../../services/ShipmentService';
import { ShipmentContext } from './../../context/ShipmentContext';
import SearchShipments from './../utils/SearchShipments';
import GeneratePayment from './GeneratePayment';
import { saveAs } from 'file-saver';
import { Progress } from 'reactstrap';

const ModShipment = () => {
  const { Messages, shipments } = useContext(ShipmentContext);
  const Ships = shipments && shipments.data;
  const shipmentContext = useContext(ShipmentContext);
  const [progress, setProgress] = useState(null);

  const removeClass = () => {
    setTimeout(() => {
      shipmentContext.setMessages('');
    }, 2000);
  };

  let shipids = [];
  console.log(shipids);
  const manifest = async e => {
    setProgress(45);
    const data = await ShipmentService.createManifest().then(() => {
      setProgress(60);
      const res = ShipmentService.downloadManifest();
      setProgress(75);
      return res;
    });
    setProgress(85);
    const pdfBlob = new Blob([data], { type: 'application/pdf' });
    setProgress(100);
    saveAs(pdfBlob, 'manifest.pdf');
    setProgress(null);
  };

  const getShipmentsAll = async () => {
    const data = await ShipmentService.getShipments();
    shipmentContext.setShipments(data);
  };

  const changeStatus = id => {
    const idobj = { id };

    if (shipids.some(item => item.id === id)) {
      shipids.pop(idobj);
    } else {
      shipids.push(idobj);
    }
  };

  const handleChange = async e => {
    const values = e.target.value;
    const data = await ShipmentService.updateStatus(values, shipids);
    if (data.status === 'success') {
      shipmentContext.setMessages('Shipments Updated');
      removeClass();
      window.location.href = '/ModShipment';
    }
  };

  useEffect(() => {
    getShipmentsAll();
  }, [Messages]);
  return (
    <div>
      <Jumbotron>
        <div className="searchpane">
          <div>
            <SearchShipments />
          </div>
          <div className="buttonGen">
            <Button color="primary" size="sm" onClick={manifest}>
              Click to Generate and download Weekly manifest
              {progress ? <Progress color="success" value={progress} /> : null}
            </Button>
          </div>
          <div>
            <GeneratePayment />
          </div>
        </div>
        <div>
          <center>
            {Messages ? <h6 className="regtext2">{Messages}</h6> : null}
          </center>
          <center>
            <h4>
              <label>View and Search Shipments </label>
            </h4>
          </center>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>SHIP CODE</th>
                <th>NAME</th>
                <th>DEST.</th>
                <th>WEIGHT</th>
                <th>CARTON</th>
                <th>FEES</th>
                <th>TOTAL</th>
                <th>MOBILE</th>
                <th>DATE</th>
                <th>STATUS</th>
                <th>ACTION</th>
                <th>
                  <select
                    type="text"
                    className="form-control"
                    onChange={e => handleChange(e)}
                    placeholder="Select"
                  >
                    <option value=""></option>
                    <option value="recieved">Recieved</option>
                    <option value="paid">Paid</option>
                    <option value="delivered">Delivered</option>
                    <option value="returned">Returned</option>
                    <option value="damaged">Damaged</option>
                    <option value="lost">Lost</option>
                    <option value="reset">RESET!</option>
                  </select>
                </th>
              </tr>
            </thead>
            <tbody>
              {Ships
                ? Ships.map((shipments, index) => {
                    const no = index + 1;
                    const date = new Date(shipments.createdAt);
                    let classy = 'regtext1';
                    if (shipments.paymentStatus === 'Paid') {
                      classy = 'regtext2';
                    }
                    shipids = shipments._id;
                    return (
                      <tr key={shipments._id}>
                        <th scope="row">{no}</th>
                        <td>FB-{shipments.shipcode}</td>
                        <td>{shipments.name}</td>
                        <td>{shipments.destination}</td>
                        <td>{shipments.weight}</td>
                        <td>{shipments.carton}</td>
                        <td>
                          Freight: <strong>₦{shipments.freight} </strong>
                          <br /> Customs: <strong>₦{shipments.customs}</strong>
                        </td>
                        <td className={classy}>₦{shipments.amountDue}</td>
                        <td>{shipments.mobile}</td>
                        <td>{date.toDateString()}</td>
                        <td>{shipments.shipstatus}</td>
                        <td>{shipments.action}</td>
                        <td>
                          <input
                            type="checkbox"
                            onClick={() => {
                              changeStatus(shipments._id);
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>
          <button>Load More..</button>
        </div>
      </Jumbotron>
    </div>
  );
};

export default ModShipment;

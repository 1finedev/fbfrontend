import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { ShipmentContext } from './../../context/ShipmentContext';
import ShipmentService from './../../services/ShipmentService';

const ModalShip = props => {
  const [error, setError] = useState(false);
  const { handleSubmit, register, errors, reset } = useForm();
  const { id, mobile, destination, className } = props;
  const shipmentContext = useContext(ShipmentContext);
  const { Messages } = useContext(ShipmentContext);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const removeClass = () => {
    setTimeout(() => {
      shipmentContext.setMessages('');
      setError('');
    }, 2000);
  };

  //remove unmodified fields
  function clean(obj) {
    for (var propName in obj) {
      if (obj[propName] === '' || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  }
  const updateShipment = async values => {
    clean(values);
    const data = await ShipmentService.editOneShipment(values, id);
    const { message, error } = data;

    if (message) {
      shipmentContext.setMessages(message);
      reset();
      removeClass();
      window.location.reload(true);
      return;
    } else {
      setError(error);
      removeClass();
      return;
    }
  };

  useEffect(() => {
    toggle();
  }, []);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Edit Shipment</ModalHeader>
        <ModalBody>
          {Messages ? <h5 className="regtext2">{Messages}</h5> : null}
          {error ? <h5 className="regtext1">{error}</h5> : null}
          <form onSubmit={handleSubmit(updateShipment)}>
            <div>
              {errors ? (
                <label className="regtext1">
                  {errors.mobile && errors.mobile.message}
                </label>
              ) : null}
            </div>
            <span>Enter Mobile Number (e.g: 08012345678)</span>
            <div className="input-group form-group">
              <input
                type="tel"
                className="form-control"
                name="mobile"
                placeholder={mobile}
                ref={register({
                  pattern: {
                    value: /^[0]\d{10}$/,
                    message: 'Enter a valid Number'
                  }
                })}
              />
            </div>
            <span>Change Shipment Destination</span>
            <div className="input-group form-group">
              <input
                type="text"
                className="form-control"
                name="destination"
                placeholder={destination}
                ref={register({
                  required: 'Destination is required!'
                })}
              />
            </div>
            <span>Action 'Deliver:🚚' or 'Hold:🚫' ?</span>
            <div className="input-group form-group">
              <select
                type="text"
                className="form-control"
                name="action"
                ref={register()}
              >
                <option value="🚚">Deliver</option>
                <option value="🚫">Hold</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Update"
                className="btn float-right login_btn"
              />
            </div>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalShip;

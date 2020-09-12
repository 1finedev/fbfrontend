import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { ShipmentContext } from './../../context/ShipmentContext';
import ShipmentService from './../../services/ShipmentService';
import 'bootstrap/dist/css/bootstrap.min.css';

const ModalShip = props => {
  const [error, setError] = useState(false);
  const { handleSubmit, register, errors, reset } = useForm();
  const {
    id,
    name,
    destination,
    weight,
    carton,
    agentID,
    className,
    shipType
  } = props;
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
      {Messages ? <h5 className="regtext2">{Messages}</h5> : null}
      <Modal
        isOpen={modal}
        animation={false}
        toggle={toggle}
        className={className}
      >
        <ModalHeader toggle={toggle}>Edit Shipment</ModalHeader>
        <ModalBody>
          {error ? <h5 className="regtext1">{error}</h5> : null}
          <form onSubmit={handleSubmit(updateShipment)}>
            {errors ? (
              <label>
                {errors.agentID && errors.agentID.message}
                {errors.name && errors.name.message}
                {errors.name && errors.name.message}
                {errors.weight && errors.weight.message}
                {errors.carton && errors.carton.message}
              </label>
            ) : null}

            <span>Name</span>
            <div className="input-group form-group">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder={name}
                ref={register()}
              />
            </div>
            <span>Destination</span>
            <div className="input-group form-group">
              <input
                type="text"
                className="form-control"
                name="destination"
                placeholder={destination}
                ref={register()}
              />
            </div>
            <span>Weight</span>
            <div className="input-group form-group">
              <input
                type="text"
                className="form-control"
                name="weight"
                placeholder={weight}
                ref={register({
                  pattern: {
                    value: /^[+]?([1-9][0-9]*(?:[.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/,
                    message: 'Enter a valid Weight'
                  }
                })}
              />
            </div>
            <span>Carton No:</span>
            <div className="input-group form-group">
              <input
                type="text"
                className="form-control"
                name="carton"
                id="cartonerror"
                placeholder={carton}
                ref={register({
                  pattern: {
                    value: /^[+]?([1-9][0-9]*(?:[.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/,
                    message: 'Enter a valid Carton Number'
                  }
                })}
              />
            </div>
            <span>AgentID</span>
            <div className="input-group form-group">
              <input
                type="text"
                className="form-control"
                name="agentID"
                id="agentIDerror"
                placeholder={agentID}
                ref={register()}
              />
            </div>
            <span>Shipment Type</span>
            <div className="input-group form-group">
              <input
                type="text"
                className="form-control"
                name="shipType"
                id="shipTypeError"
                placeholder={shipType}
                ref={register()}
              />
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

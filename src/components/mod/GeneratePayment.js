import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ShipmentContext } from './../../context/ShipmentContext';
import ShipmentService from './../../services/ShipmentService';

const GeneratePayment = () => {
  const { handleSubmit, register, errors, reset } = useForm();
  const [gen, setGen] = useState('');
  const shipmentContext = useContext(ShipmentContext);
  let classN = 'regtext1';
  const updateShipment = async values => {
    setGen('Sending rates to server!...');
    setTimeout(() => {
      setGen('Calculating Fees, Please Wait!...');
    }, 1000);
    const tOut = setInterval(() => {
      setGen('Still working....Please Wait...');
    }, 2000);
    const data = await ShipmentService.calculateFee(values);
    clearTimeout(tOut);
    console.log(data);
    const { error } = data;
    if (data.status === 'success') {
      classN = 'regtext2';
      setGen('Fees calculation Done!...');
      shipmentContext.setShipments(data.data);
      shipmentContext.setMessages('Shipments Updated!');
      setGen('');
      reset();
    } else {
      setGen('Error: Try again!');
      shipmentContext.setMessages(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(updateShipment)}>
        <label>Freight Rate: $</label>
        <div className="input-group form-group">
          <input
            type="number"
            className="form-control"
            name="freight"
            id="freightError"
            placeholder="Enter Amount"
            min="0"
            step=".01"
            ref={register({
              required: 'Freight Rate is required!',
              pattern: {
                value: /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/,
                message: 'Enter a valid amount'
              }
            })}
          />
        </div>
        <label>Dollar Rate(Today): ₦</label>
        <div className="input-group form-group">
          <input
            type="number"
            className="form-control"
            name="dollar"
            id="dollarError"
            placeholder="Enter Amount"
            ref={register({
              required: 'Dollar Rate is required!',
              pattern: {
                value: /^[+]?([1-9][0-9]*(?:[.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/,
                message: 'Enter a valid amount'
              }
            })}
          />
        </div>
        <label>Customs Rate: ₦</label>
        <div className="input-group form-group">
          <input
            type="number"
            className="form-control"
            name="customs"
            id="customerror"
            placeholder="Enter Amount"
            ref={register({
              required: 'Freight Rate is required!',
              pattern: {
                value: /^[+]?([1-9][0-9]*(?:[.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/,
                message: 'Enter a valid amount'
              }
            })}
          />
        </div>
        <span>{gen ? <label className={classN}>{gen}</label> : null}</span>
        <div className="input-group form-group">
          <input
            type="submit"
            value="Calculate"
            className="btn float-right login_btn"
          />
        </div>
      </form>
    </div>
  );
};

export default GeneratePayment;

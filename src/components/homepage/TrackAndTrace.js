import React, { useState } from 'react';
import { Jumbotron } from 'reactstrap';
import { useForm } from 'react-hook-form';
import ShipmentService from '../../services/ShipmentService';
import Spinner from '../utils/Spinner';
import TrackResults from './TrackResults';

const TrackAndTrace = props => {
  const [results, setResults] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async values => {
    setLoading(true);
    const data = await ShipmentService.trackShipment(values);
    const { error, shipment } = data;
    if (shipment) {
      setResults(shipment);
      setLoading(false);
      setLoaded(true);
    }
    if (error) {
      setLoading(false);
      setError(`${error} - Invalid Tracking Code!`);
    }
  };
  return (
    <div className="tracking">
      {loaded ? (
        <>
          <div>
            <Jumbotron>
              <h6>(1) Shipment found...</h6>
              <div>
                <TrackResults data={results} />
              </div>
            </Jumbotron>
          </div>
        </>
      ) : (
        <>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className="flextrack">
                <Jumbotron classname="tabs">
                  <h6 className="display-3">Track Shipment</h6>
                  <p className="lead">
                    Enter Tracking code below to get full information on
                    Cargo/Shipment
                  </p>
                  <hr className="my-2" />
                  <div className="trackform">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {error ? <h6 className="regtext1">{error} </h6> : null}
                      <h6 className="regtext1">
                        {errors.tracking && errors.tracking.message}
                      </h6>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="tracking"
                          placeholder="Enter a Tracking Code..."
                          ref={register({
                            required: 'Tracking Code is required!'
                            // pattern: {
                            //   value: /^(?=^.{14}$)[Ff][Bb][-]/,
                            //   message: 'Enter a valid Tracking Code'
                            // }
                          })}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="submit"
                          value="Track"
                          className="btn float-right login_btn"
                        />
                      </div>
                    </form>
                  </div>
                </Jumbotron>
              </div>
            </>
          )}{' '}
        </>
      )}
    </div>
  );
};

export default TrackAndTrace;

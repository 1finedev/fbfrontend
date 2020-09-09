import React, { useContext, useState, useEffect } from 'react';
import { ShipmentContext } from '../../context/ShipmentContext';
import ShipmentService from '../../services/ShipmentService';

const SearchShipments = () => {
  const shipmentContext = useContext(ShipmentContext);
  const [search, setSearch] = useState('name');
  const [valueSearch, setValueSearch] = useState(null);

  function clean(obj) {
    for (var propName in obj) {
      if (obj[propName] === '' || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  }
  const handleChange = e => {
    const value = e.target.value;
    setSearch(value);
  };

  const handleSearch = async e => {
    const values = { [e.target.name]: e.target.value };
    setValueSearch(values);
  };

  const runSearch = async e => {
    clean(valueSearch);
    const data = await ShipmentService.searchShipments(valueSearch);
    shipmentContext.setShipments(data);
  };

  useEffect(() => {
    runSearch();
  }, [valueSearch]);
  return (
    <div>
      <label>Search Shipments:</label>
      <div className="input-group form-group">
        <select
          type="text"
          className="form-control"
          name="action"
          onChange={e => handleChange(e)}
          placeholder="Filter"
        >
          <option value="name">Cust Name</option>
          <option value="destination">Destination</option>
          <option value="weight">Weight</option>
          <option value="carton">Carton No</option>
          <option value="tracking">Tracking No</option>
        </select>
      </div>
      <div className="input-group form-group search">
        <input
          type="text"
          className="form-control"
          name={search}
          placeholder="Search a shipment"
          onChange={e => {
            handleSearch(e);
          }}
        />
      </div>
    </div>
  );
};

export default SearchShipments;

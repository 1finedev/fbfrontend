import React, { useState } from 'react';
import CartonCard from './components/CartonCard/CartonCard';
import "./ViewShipments.scss";
import data from '../../ApiMockData.json';
import moment from 'moment';
import MainNav from './components/MainNav/MainNav';

const array = [0,11,22,343,43,52,63,27,28,39,49,59,99,44,96,114];

const ViewShipments = () =>{
    const [activeCardIdx, setActiveCardIdx] = useState(0);
    const activeCarton = array.find((a, i)=> i === activeCardIdx);
    const shipmentData = data.data.data;

    const onCardClick = (i) =>{
        setActiveCardIdx(i);
    }

    return(
        <div className = "view-shipments">
            <MainNav/>
            <div className = "header-section">
                
                <div className = "options-section">
                    <div className = "selects-container">
                        <div className = "selection-set week-selection"> 
                            <p>WEEK</p>
                            <select className = "options">
                                <option>WEEK 1</option>
                                <option>WEEK 2</option>
                                <option>WEEK 3</option>
                                <option>WEEK 4</option>
                            </select>
                        </div>
                        <div className = "selection-set week-selection"> 
                            <p>MONTH</p>
                            <select className = "options">
                                <option>JAN</option>
                                <option>FEB</option>
                                <option>MAR</option>
                                <option>APR</option>
                                <option>MAY</option>
                                <option>JUN</option>
                                <option>JUL</option>
                                <option>AUG</option>
                                <option>SEP</option>
                                <option>OCT</option>
                                <option>NOV</option>
                                <option>DEC</option>
                            </select>
                        </div>
                        <div className = "selection-set week-selection"> 
                            <p>YEAR</p>
                            <select className = "options">
                                <option>2020</option>
                            </select>
                        </div>
                    </div>
                    <div className = "search-section">
                        <div className = "input-container">
                            <input placeholder = "Search shipment" type="text"/>
                            <div className = 'search-icon-container'>
                                <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.8977 22.682L17.6696 16.4538C18.841 14.8429 19.5335 12.8615 19.5335 10.7216C19.5335 5.33656 15.1523 0.955292 9.76627 0.955292C4.38127 0.955292 0 5.33656 0 10.7216C0 16.1076 4.38127 20.4878 9.76627 20.4878C11.8078 20.4878 13.7039 19.8585 15.2737 18.7835L21.535 25.0447L23.8977 22.682ZM2.86464 10.7216C2.86464 6.91542 5.96114 3.81893 9.76727 3.81893C13.5734 3.81893 16.6699 6.91542 16.6699 10.7216C16.6699 14.5277 13.5734 17.6242 9.76727 17.6242C5.96013 17.6242 2.86464 14.5277 2.86464 10.7216Z" fill="black" fill-opacity="0.8"/>
                                </svg>
                            </div>
                        </div>
                        <select>
                            <option>Tracking Number</option>
                        </select>
                    </div>                    
                </div>

                <div className = "summary-section">
                    <h5>WEEKLY SUMMARY</h5>
                    <p>Total number of cartons: <strong>{array.length}</strong></p>
                    <p>Total number of shipments: {shipmentData.length}</p>
                    <p>Total weight: 3080kg</p>
                </div>
            </div>
            <div className = "main-section">
                <div className = "cartons-section">
                    <div className = "title-section">
                        <h5>
                            <div>C</div>
                            <div>A</div>
                            <div>R</div>
                            <div>T</div>
                            <div>O</div>
                            <div>N</div>
                            <div>S</div>
                        </h5>
                        <p>Total:  {array.length}</p>
                    </div>
                    { 
                        array.map((a, i) => (
                            <CartonCard
                                onClick = {()=>onCardClick(i)} 
                                active = {i === activeCardIdx? true : false}
                                number = {a}
                                shipments = {a+2}
                                key = {i}
                                weight = {a}
                            />
                        ))
                    }
                </div>
                <div className = "shipments-section">
                    <div className = "title-section">
                        <h5>SHIPMENTS IN CARTON {activeCarton}</h5>
                        <p>Total: {shipmentData.length}</p>
                    </div>
                    <div className = "shipment-table">
                        <table>
                            <tr>
                                <th>S/N</th>
                                <th>Ship Code</th>
                                <th>Name</th>
                                <th>Destination</th>
                                <th>Weight</th>
                                <th>Agent</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            {
                                shipmentData.map((a, i)=>(
                                    <tr>
                                        <td>{i+1}</td>
                                        <td>{a._id}</td>
                                        <td>{a.name}</td>
                                        <td>{a.destination}</td>
                                        <td>{a.weight}</td>
                                        <td>{a.user.agentID}</td>
                                        <td>{moment(a.createdAt).format("Do MMM")}</td>
                                        <td>{a.shipstatus}</td>
                                        <td>{a.action}</td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewShipments;
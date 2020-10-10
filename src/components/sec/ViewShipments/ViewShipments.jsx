import React, { useState } from 'react';
import CartonCard from './components/CartonCard/CartonCard';
import "./ViewShipments.scss";

const array = [0,11,22,343,43,52,63,27,28,39,49,59,99,44,96,114];

const ViewShipments = () =>{
    const [activeCardIdx, setActiveCardIdx] = useState(0);
    const activeCarton = array.find((a, i)=> i === activeCardIdx);

    const fetchCards = () =>{
        // In here, all cards for the current month is fetched on mount;
    }

    const onCardClick = (i) =>{
        setActiveCardIdx(i);
        // All shipment for
    }
    return(
        <div className = "view-shipments">
            <div className = "header-section">

            </div>
            <div className = "main-section">
                <div className = "cartons-section">
                    <div className = "title-section">
                        <h5>Cartons in september</h5>
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
                        <h5>Shipments in carton {activeCarton}</h5>
                    </div>
                    <div className = "shipment-table">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewShipments;
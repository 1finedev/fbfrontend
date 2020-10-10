import React, { useState } from 'react';
import CartonCard from './components/CartonCard/CartonCard';
import "./ViewShipments.scss";

const array = [0,1,2,3,4,5,6,7];

const ViewShipments = () =>{
    const [activeCard, setActiveCard] = useState(0);
    const onCardClick = (i) =>{
        setActiveCard(i)
    }
    return(
        <div className = "view-shipments">
            <div className = "main-section">
                <div className = "cartons-section">
                    { 
                        array.map((a, i) => (
                            <CartonCard onClick = {()=>onCardClick(i)} active = {i === activeCard? true : false}/>
                        ))
                    }
                </div>
                <div className = "shipments-section">

                </div>
            </div>
        </div>
    )
}

export default ViewShipments;
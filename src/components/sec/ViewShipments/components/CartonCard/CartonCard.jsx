import React from 'react';
import './CartonCard.scss';

const CartonCard = props =>{
    return(
        <div onClick = {props.onClick} className = {`carton-card ${props.active ? 'active' : null} `}>
            <div className = "carton-number-section">
                <h3 className = "carton-number-title">Carton Number</h3>
                <div className = 'number-container'>
                    <h3>33</h3>
                </div>
            </div>
            <div className = 'details-section'>
                <div className = "card-shipments-details">
                    <p>Shipments</p>
                    <p>33</p>
                </div>
                <div>
                    <p>Weight</p>
                    <p>33kg</p>
                </div>
            </div>
        </div>
    )
}


export default CartonCard;
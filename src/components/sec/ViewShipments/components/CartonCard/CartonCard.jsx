import React from 'react';
import './CartonCard.scss';

const CartonCard = props =>{
    return(
        <div onClick = {props.onClick} className = {`carton-card ${props.active ? 'active' : null} `}>
            <div className = "carton-number-section">
                <h4 className = "carton-number-title">Carton <div>Number</div></h4>
                <div className = 'number-container'>
                    <h4>{props.number}</h4>
                </div>
            </div>
            <div className = 'details-section'>
                <div className = "card-shipments-details">
                    <p className = "detail-title">Shipments</p>
                    <p>{props.shipments}</p>
                </div>
                <div>
                    <p className = "detail-title">Weight</p>
                    <p>{props.weight}kg</p>
                </div>
            </div>
        </div>
    )
}


export default CartonCard;
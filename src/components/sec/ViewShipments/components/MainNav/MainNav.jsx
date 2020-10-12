import React from 'react';
import './MainNav.scss';
// import {NavLink} from 'react-router-dom'

const MainNav = () =>{
    return(
        <nav className = "main-nav">
           <ul>
               <li>
                    <h5>
                       ADD NEW SHIPMENT
                    </h5>
               </li>
               <li>
                    <h5>
                       ALL SHIPMENTS
                    </h5>
               </li>
               <li>
                    <h5>
                       OTHER OPTION
                    </h5>
               </li>
           </ul>
        </nav>
    )
}

export default MainNav;
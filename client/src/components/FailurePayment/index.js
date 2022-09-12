import React from "react";
import { Link } from "react-router-dom";

export default function FailurePayment(){
    return(
        <div>
            <h3>Payment failed, try again</h3>
            <button><Link to={'/cart'}>Return cart</Link></button>
        </div>
    )
}
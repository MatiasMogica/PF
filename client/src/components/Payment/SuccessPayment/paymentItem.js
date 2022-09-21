import React from "react"
import './paymentItem.css'

const PaymentItem = ({_id, name, background_image, rating, price/* , amount */}) => {


    return (
        <div className="paytemContainer" key={_id}>
            <img className="payImage" alt={name} src={background_image} />
            <div>
                <h4 className="payItemTitle"> {name} </h4>
                <h4 className="payRating">Rating: {rating} </h4>
                <h4 className="payPrice">Price ${price} </h4>
                {/* <button className="btnDw">Download</button> */}
            </div>
        </div>
    )
}

export default PaymentItem
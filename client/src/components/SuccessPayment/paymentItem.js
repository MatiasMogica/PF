import React from "react"
// import "./CartItem.css"

const PaymentItem = ({_id, name, background_image, rating, price/* , amount */}) => {


    return (
        <div key={_id}>
            <img alt={name} className="image" src={background_image} />
            <div>
                <h4>Name: {name} </h4>
                <h4>Rating: {rating} </h4>
                <h4>Price ${price} </h4>
                <button>Download</button>
            </div>
        </div>
    )
}

export default PaymentItem
import React from 'react'

export const OrderInfo = (props) => {

    let orderHeader = "";
    let orderStyle = {};

    switch (props.type) {
        case "completed":
            orderHeader = "Completed";
            orderStyle = {
                backgroundColor: "#D6F6DD"
            }
            break;

        case "in-progress":
            orderHeader = "In Progress";
            orderStyle = {
                backgroundColor: "#EBD2B4"
            }
            break;

        case "failed":
            orderHeader = "Failed";
            orderStyle = {
                backgroundColor: "#F4989C"
            }
            break;
    }




    return (
        <div className="order" style={orderStyle}>
            <div className="order-header">
                <p>{orderHeader}</p>
                <i className={`fa-solid ${props.icon}`}></i>
            </div>
            {props.children}
        </div>
    )
}

export default OrderInfo;
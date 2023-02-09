import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderConfirmation({ setOrderPhase }) {
    const { resetOrder } = useOrderDetails();
    const [orderNumber, setOrderNumber] = useState(null);

    useEffect(() => {
        axios
            .post(`http://localhost:3030/order`)
            .then((response) => {
                setOrderNumber(response.data.orderNumber);
            })
            .catch((error) => {
                //TODO: handle error here
            });
    }, []);

    function handleClick() {
        //clear the order
        resetOrder();
        //send back to order page
        setOrderPhase("inProgress");
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Thank You!</h1>
            <h2>Your order number is {orderNumber}</h2>
            <p>as per our terms and conditions, nothing will happen here</p>
            <Button onClick={handleClick}>Create New Order</Button>
        </div>
    );
}

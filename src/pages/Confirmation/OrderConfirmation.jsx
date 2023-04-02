import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";

export default function OrderConfirmation({ setOrderPhase }) {
    const { resetOrder } = useOrderDetails();
    const [orderNumber, setOrderNumber] = useState(null);
    const [error, setError] = useState(false);

    const generateRandomString = () =>
        Math.random().toString(36).substring(2, 9).toUpperCase();

    const randomString = generateRandomString();

    useEffect(() => {
        // axios
        //     .post(`http://localhost:3030/order`)
        //     .then((response) => {
        //         setOrderNumber(response.data.orderNumber)
        //     })
        //     .catch((error) => setError(true))
        setOrderNumber(randomString);
    }, []);

    const newOrderButton = (
        <Button onClick={handleClick}>Create New Order</Button>
    );

    if (error) {
        return (
            <>
                <AlertBanner message={null} variant={null} />
                {newOrderButton}
            </>
        );
    }

    function handleClick() {
        //clear the order
        resetOrder();
        //send back to order page
        setOrderPhase("inProgress");
    }
    if (orderNumber) {
        return (
            <div style={{ textAlign: "center" }}>
                <h1>Thank You!</h1>
                <h2>Your order number is {orderNumber}</h2>
                <p>as per our terms and conditions, nothing will happen here</p>
                {newOrderButton}
            </div>
        );
    } else {
        return <div>loading</div>;
    }
}

import "./App.css";
import { useState } from "react";
import Container from "react-bootstrap/Container";

import OrderConfirmation from "./pages/Confirmation/OrderConfirmation";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";

import { OrderDetailsProvider } from "./contexts/OrderDetails";

export default function App() {
    const [orderPhase, setOrderPhase] = useState("inProgress");

    let Component = OrderEntry; //default to order page
    switch (orderPhase) {
        case "inProgress":
            Component = OrderEntry;
            break;
        case "review":
            Component = OrderSummary;
            break;
        case "completed":
            Component = OrderConfirmation;
            break;
        default:
    }
    return (
        <OrderDetailsProvider>
            {/* summary page and entry page need provider */}
            <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
        </OrderDetailsProvider>
    );
}

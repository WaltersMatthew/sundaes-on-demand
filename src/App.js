import Container from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";
import "./App.css";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
    return (
        <Container>
            <OrderDetailsProvider>
                {/* summary page and entry page need provider */}
                <OrderEntry />
            </OrderDetailsProvider>
            {/* confirmation page does not need provider */}
        </Container>
    );
}

export default App;

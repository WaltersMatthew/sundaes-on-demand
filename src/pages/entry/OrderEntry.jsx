import Options from "./Options";

function OrderEntry(props) {
    return (
        <div>
            <Options optionType="scoops" />
            <Options optionType="toppings" />
        </div>
    );
}

export default OrderEntry;

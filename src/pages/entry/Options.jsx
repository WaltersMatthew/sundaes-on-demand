import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../contexts/OrderDetails";

const iceCreamFlavors = [
    {
        name: "Mint chip",
        imagePath: "/images/mint-chip.png",
    },
    {
        name: "Vanilla",
        imagePath: "/images/vanilla.png",
    },
    {
        name: "Chocolate",
        imagePath: "/images/chocolate.png",
    },
    {
        name: "Salted caramel",
        imagePath: "/images/salted-caramel.png",
    },
];
const toppings = [
    {
        name: "M&Ms",
        imagePath: "/images/m-and-ms.png",
    },
    {
        name: "Hot fudge",
        imagePath: "/images/hot-fudge.png",
    },
    {
        name: "Peanut butter cups",
        imagePath: "/images/peanut-butter-cups.png",
    },
    {
        name: "Gummi bears",
        imagePath: "/images/gummi-bears.png",
    },
    {
        name: "Mochi",
        imagePath: "/images/mochi.png",
    },
    {
        name: "Cherries",
        imagePath: "/images/cherries.png",
    },
];

export default function Options({ optionType }) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
    const { totals } = useOrderDetails();

    useEffect(() => {
        // create an abourtController to attach to network request
        const controller = new AbortController();
        // axios
        //     // .get(`http://localhost:3030/${optionType}`)
        //     .get(require(data))
        //     .then((response) => console.log(response.data))
        //     .then((response) => setItems(response.data))
        //     .catch((error) => {
        //         if (error.name !== "CanceledError") setError(true);
        //     });
        optionType === "scoops"
            ? setItems(iceCreamFlavors)
            : setItems(toppings);
        //abort axios call on oncomponent unmount
        return () => controller.abort;
    }, [optionType]);

    if (error) {
        return <AlertBanner />;
    }

    const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

    const title =
        optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

    const optionItems = items.map((item) => (
        <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
        />
    ));

    return (
        <>
            <h2>{title}</h2>
            <p>{formatCurrency(pricePerItem[optionType])} each</p>

            <p>
                {title} total: {formatCurrency(totals[optionType])}
            </p>
            <Row>{optionItems}</Row>
        </>
    );
}

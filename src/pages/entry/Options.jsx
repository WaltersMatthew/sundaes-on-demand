import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";

export default function Options({ optionType }) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:3030/${optionType}`)
            .then((response) => setItems(response.data))
            .catch((error) => {
                setError(true);
            });
    }, [optionType]);

    if (error) {
        return <AlertBanner />;
    }

    // TODO: replace 'null' with toppingoption when available
    const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

    const optionItems = items.map((item) => (
        <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
        />
    ));

    return <Row>{optionItems}</Row>;
}

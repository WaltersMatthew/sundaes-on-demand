import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import ScoopOption from "./ScoopOption";

export default function Options({ optionType }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3030/${optionType}`)
            .then((response) => setItems(response.data))
            .catch((error) => {
                //TODO handle error response
            });
    }, [optionType]);

    // TODO: replace 'null' with toppingoption when available
    const ItemComponent = optionType === "scoops" ? ScoopOption : null;

    const optionItems = items.map((item) => (
        <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
        />
    ));

    return <Row>{optionItems}</Row>;
}

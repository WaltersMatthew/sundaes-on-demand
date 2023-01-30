import React, { useState } from "react";

function OrderSummary(props) {
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const onCheckboxClick = () => {
        setButtonDisabled(!buttonDisabled);
    };
    return (
        <div>
            <input type="checkbox" name="agree" onClick={onCheckboxClick} />
            <label>I agree to terms and conditions</label>
            <button name="Confirm order" disabled={buttonDisabled}>
                Confirm order
            </button>
        </div>
    );
}

export default OrderSummary;

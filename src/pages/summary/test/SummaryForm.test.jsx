import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("initial conditions", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", {
        name: /terms and conditions/i,
    });
    const confirmButton = screen.getByRole("button", {
        name: /confirm order/i,
    });

    expect(checkbox).not.toBeChecked();
    expect(confirmButton).toBeDisabled();
});

test("button enables on checkbox click, and disables on second click", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", {
        name: /terms and conditions/i,
    });
    const confirmButton = screen.getByRole("button", {
        name: /confirm order/i,
    });

    fireEvent.click(checkbox);
    expect(confirmButton).toBeEnabled();

    fireEvent.click(checkbox);
    expect(confirmButton).toBeDisabled();
});

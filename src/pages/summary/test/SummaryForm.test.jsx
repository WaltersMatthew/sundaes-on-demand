import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

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

test("button enables on checkbox click, and disables on second click", async () => {
    const user = userEvent.setup();

    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", {
        name: /terms and conditions/i,
    });
    const confirmButton = screen.getByRole("button", {
        name: /confirm order/i,
    });

    await user.click(checkbox);
    expect(confirmButton).toBeEnabled();

    await user.click(checkbox);
    expect(confirmButton).toBeDisabled();
});

test("Popover responds to hover", async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);
    //popover starts out hidden
    const nullPopover = screen.queryByText(
        /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    // popover appears on mouseover of label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    await user.hover(termsAndConditions);
    const popover = screen.getByText(
        /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    //popover disappears on mouse out
    await user.unhover(termsAndConditions);
    expect(popover).not.toBeInTheDocument();
});

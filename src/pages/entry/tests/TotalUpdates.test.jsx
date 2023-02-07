import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
    const user = userEvent.setup();
    render(<Options optionType="scoops" />);

    // make sure total starts out at $0.00
    const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
    expect(scoopSubtotal).toHaveTextContent("0.00");

    //update vanilla scoops to 1 and check subtotal
    const vanillaInput = await screen.findByRole("spinbutton", {
        name: "Vanilla",
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(scoopSubtotal).toHaveTextContent("2.00");

    //update chocolate scoops to 2 and check subtotal
    const chocolateInput = await screen.findByRole("spinbutton", {
        name: "Chocolate",
    });

    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");
    expect(scoopSubtotal).toHaveTextContent("6.00");
});

test("update topping subtotal when toppings change", async () => {
    const user = userEvent.setup();
    render(<Options optionType="toppings" />);

    const toppingSubtotal = screen.getByText("Toppings total: $", {
        exact: false,
    });
    expect(toppingSubtotal).toHaveTextContent("0.00");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
        name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    expect(toppingSubtotal).toHaveTextContent("1.50");

    const hotFudgeCheckbox = screen.getByRole("checkbox", {
        name: "Hot fudge",
    });
    await user.click(hotFudgeCheckbox);
    expect(toppingSubtotal).toHaveTextContent("3.00");

    await user.click(hotFudgeCheckbox);
    expect(toppingSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
    test("grand total starts at $0.00", () => {
        render(<OrderEntry />);

        const grandTotal = screen.getByText("Grand total: $", { exact: false });
        expect(grandTotal).toHaveTextContent("0.00");
    });

    test("grand total updates properly if scoop is added first", async () => {
        render(<OrderEntry />);
        const user = userEvent.setup();
        const grandTotal = screen.getByText("Grand total: $", { exact: false });
        const cherriesCheckbox = await screen.findByRole("checkbox", {
            name: "Cherries",
        });
        const chocolateInput = await screen.findByRole("spinbutton", {
            name: "Chocolate",
        });

        await user.clear(chocolateInput);
        await user.type(chocolateInput, "2");

        expect(grandTotal).toHaveTextContent("4.00");

        await user.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent("5.50");
    });

    test("grand total updates properly if topping is added first", async () => {
        render(<OrderEntry />);
        const user = userEvent.setup();
        const grandTotal = screen.getByText("Grand total: $", { exact: false });
        const cherriesCheckbox = await screen.findByRole("checkbox", {
            name: "Cherries",
        });
        const chocolateInput = await screen.findByRole("spinbutton", {
            name: "Chocolate",
        });

        await user.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent("1.50");

        await user.clear(chocolateInput);
        await user.type(chocolateInput, "2");
        expect(grandTotal).toHaveTextContent("5.50");
    });

    test("grand total updates properly if item is removed", async () => {
        render(<OrderEntry />);
        const user = userEvent.setup();
        const grandTotal = screen.getByText("Grand total: $", { exact: false });
        const cherriesCheckbox = await screen.findByRole("checkbox", {
            name: "Cherries",
        });
        const chocolateInput = await screen.findByRole("spinbutton", {
            name: "Chocolate",
        });
        //add cherries (total: 1.50)
        await user.click(cherriesCheckbox);

        //add two scoops of chocolate (total: 5.50)
        await user.clear(chocolateInput);
        await user.type(chocolateInput, "2");

        //remove one scoop of chocolate and check grand total
        await user.clear(chocolateInput);
        await user.type(chocolateInput, "1");
        expect(grandTotal).toHaveTextContent("3.50");

        // remove cherries and check grand total
        await user.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent("2.00");
    });
});

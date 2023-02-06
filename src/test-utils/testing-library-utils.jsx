import { render } from "@testing-library/react";
import { orderDetailsProvider } from "../contexts/OrderDetails";

const renderWithContext = (ui, options) =>
    render(ui, { wrapper: orderDetailsProvider, ...options });

//re export everything
export * from "@testing-library/react";

//overrride rnder method
export { renderWithContext as render };

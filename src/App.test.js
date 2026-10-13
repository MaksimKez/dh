import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders the message passed through props", () => {
  render(<App />);
  expect(
    screen.getByText("Welcome to the first React application")
  ).toBeInTheDocument();
});

test("calculates a power from the entered numbers", async () => {
  render(<App />);
  const inputs = screen.getAllByRole("spinbutton");
  await userEvent.clear(inputs[0]);
  await userEvent.type(inputs[0], "2");
  await userEvent.clear(inputs[1]);
  await userEvent.type(inputs[1], "3");
  expect(screen.getByText("Result: 8")).toBeInTheDocument();
});

test("calculates the modulus of a complex number", async () => {
  render(<App />);
  const field = screen.getByPlaceholderText("3+j4");
  await userEvent.clear(field);
  await userEvent.type(field, "3+j4");
  expect(screen.getByText("Modulus: 5")).toBeInTheDocument();
});

test("rejects an invalid complex number", async () => {
  render(<App />);
  const field = screen.getByPlaceholderText("3+j4");
  await userEvent.clear(field);
  await userEvent.type(field, "abc");
  expect(screen.getByText(/Invalid format/)).toBeInTheDocument();
});

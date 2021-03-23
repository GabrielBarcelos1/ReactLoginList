import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
describe("tests on the Login component", () => {
  test("check if the state change of the input Email is happening with numbers and letters", () => {
    render(<Login />, { wrapper: MemoryRouter });
    const inputEmail = screen.getByTestId("inputEmail");
    fireEvent.change(inputEmail, { target: { value: "abc@123.com" } });
    expect(inputEmail.value).toBe("abc@123.com");
  });
  test("check if the state change of the input Password is happening with numbers and letters", () => {
    render(<Login />, { wrapper: MemoryRouter });
    const inputPassWord = screen.getByTestId("inputPassWord");
    fireEvent.change(inputPassWord, { target: { value: "abc123" } });
    expect(inputPassWord.value).toBe("abc123");
  });
});

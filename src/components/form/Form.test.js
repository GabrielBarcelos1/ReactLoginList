import { render, screen, fireEvent,waitFor} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Form from "./Form";
describe("tests on the Form component", () => {
  test("check if the state change of the input name is happening", async () => {
    render(<Form />, { wrapper: MemoryRouter });
    const inputName = screen.getByTestId("inputName");
    fireEvent.change(inputName, { target: { value: "123" } });
    expect(inputName.value).toBe("123");
  });

  test("check if the state change of the input CPF is happening keeping the mask", () => {
    render(<Form />, { wrapper: MemoryRouter });
    const inputCPF = screen.getByTestId("inputCPF");
    fireEvent.change(inputCPF, { target: { value: "123" } });
    expect(inputCPF.value).toBe("123.___.___-__");
  });
  test("Checking if the CPF input is accepting letters", () => {
    render(<Form />, { wrapper: MemoryRouter });
    const inputCPF = screen.getByTestId("inputCPF");
    fireEvent.change(inputCPF, { target: { value: "abc" } });
    expect(inputCPF.value).toBe('___.___.___-__')
  });
  test("check if the state change of the input email is happening", () => {
    render(<Form />, { wrapper: MemoryRouter });
    const inputEmail = screen.getByTestId("inputEmail");
    fireEvent.change(inputEmail, { target: { value: "abc@gmail.com" } });
    expect(inputEmail.value).toBe('abc@gmail.com')
  });
  test("check if the state change of the input CEP is happening keeping the mask", () => {
    render(<Form />, { wrapper: MemoryRouter });
    const inputCEP = screen.getByTestId("inputCEP");
    fireEvent.change(inputCEP, { target: { value: "123" } });
    expect(inputCEP.value).toBe('12.3__-___')
  });
  test("Checking if the CEP input is accepting letters", () => {
    render(<Form />, { wrapper: MemoryRouter });
    const inputCEP = screen.getByTestId("inputCEP");
    fireEvent.change(inputCEP, { target: { value: "abc" } });
    expect(inputCEP.value).toBe('__.___-___')
  });
  test("check if the state change of the input district is happening with letters and numbers", () => {
    render(<Form />, { wrapper: MemoryRouter });
    const inputDisctrict = screen.getByTestId("inputDisctrict");
    fireEvent.change(inputDisctrict, { target: { value: "abc123" } });
    expect(inputDisctrict.value).toBe('abc123')
  });
  test("check if the state change of the input City is happening with letters and numbers", () => {
    render(<Form />, { wrapper: MemoryRouter });
    const inputCity = screen.getByTestId("inputCity");
    fireEvent.change(inputCity, { target: { value: "abc123" } });
    expect(inputCity.value).toBe('abc123')
  });
  test("check if the state change of the input Street is happening with letters and numbers", () => {
    render(<Form />, { wrapper: MemoryRouter });
    const inputStreet = screen.getByTestId("inputStreet");
    fireEvent.change(inputStreet, { target: { value: "abc123" } });
    expect(inputStreet.value).toBe('abc123')
  });
  test("check if the state change of the input Number is happening with letters and numbers", () => {
    render(<Form />, { wrapper: MemoryRouter });
    const inputNumber = screen.getByTestId("inputNumber");
    fireEvent.change(inputNumber, { target: { value: "abc123" } });
    expect(inputNumber.value).toBe('abc123')
  });
  test("Check the integration with api viaCep in the district field", async () => {
    render(<Form />, { wrapper: MemoryRouter });
    const inputCEP = screen.getByTestId("inputCEP");
    fireEvent.change(inputCEP, { target: { value: "88054610" } });
    const inputDisctrict = screen.getByTestId("inputDisctrict");
    await waitFor(() => expect(inputDisctrict.value).toBe("Canasvieiras"))
  });
  test("Check the integration with api viaCep in the City field", async () => {
    render(<Form />, { wrapper: MemoryRouter });
    const inputCEP = screen.getByTestId("inputCEP");
    fireEvent.change(inputCEP, { target: { value: "88054610" } });
    const inputCity = screen.getByTestId("inputCity");
    await waitFor(() => expect(inputCity.value).toBe("Florianópolis"))
  });
  test("Check the integration with api viaCep in the Street field", async () => {
    render(<Form />, { wrapper: MemoryRouter });
    const inputCEP = screen.getByTestId("inputCEP");
    fireEvent.change(inputCEP, { target: { value: "88054610" } });
    const inputStreet = screen.getByTestId("inputStreet");
    await waitFor(() => expect(inputStreet.value).toBe("Rua do Lamim"))
  });
  test("check if the maximum size of the CPF input is working",  () => {
    render(<Form />, { wrapper: MemoryRouter });
    const inputCPF = screen.getByTestId("inputCPF");
    fireEvent.change(inputCPF, { target: { value: "01234567890123456789012345678901234567890123456789" } });
    expect(inputCPF.value.length).toBe(14)
  });
  test("check if the maximum size of the CEP input is working", async () => {
    render(<Form />, { wrapper: MemoryRouter });
    const inputCEP = screen.getByTestId("inputCEP");
    fireEvent.change(inputCEP, { target: { value: "01234567890123456789012345678901234567890123456789" } });
    expect(inputCEP.value.length).toBe(10)
  });
});

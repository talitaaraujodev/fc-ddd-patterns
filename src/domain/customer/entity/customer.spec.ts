import { Address } from "./../value-object/address";
import { Customer } from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "Creuza");
    }).toThrowError("Id is required");
  });
  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("1", "");
    }).toThrowError("Name is required");
  });
  it("should change name", () => {
    // Arrange
    const customer = new Customer("123", "Creuza");
    // Act
    customer.changeName("Jubileu");
    // Assert
    expect(customer.name).toBe("Jubileu");
  });
  it("should activate customer", () => {
    const customer = new Customer("123", "Creuza");
    const address = new Address("Rua ABC", 123, "15220-250", "São Paulo");
    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });
  it("should deactivate customer", () => {
    const customer = new Customer("123", "Creuza");

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });
  it("should  throw error when address is undefined when you activate a customer ", () => {
    expect(() => {
      const customer = new Customer("123", "Creuza");
      customer.activate();

      expect(customer.isActive()).toBe(true);
    }).toThrowError("Address is mandatory to activate a customer");
  });
});

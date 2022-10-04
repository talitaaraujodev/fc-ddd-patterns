import { Address } from "./domain/customer/value-object/address";
import { Customer } from "./domain/customer/entity/customer";
import { Order } from "./domain/checkout/entity/order";
import { OrderItem } from "./domain/checkout/entity/order-item";

// ID
let customer = new Customer("123", "Teste!!");
const address = new Address("Rua ABC", 100, "19016-120", "Sergipe");

customer.Address = address;
customer.activate();

// Relation agregation Objecty - Entity
const item1 = new OrderItem("1", "Item 1 ", 10, "123", 5);
const item2 = new OrderItem("2", "Item 2 ", 30, "456", 7);

const order = new Order("1", "123", [item1, item2]);

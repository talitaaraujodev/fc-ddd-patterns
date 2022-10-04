import { Order } from "./order";
import { OrderItem } from "./order-item";

describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            const item1 = new OrderItem("i1", "Item 1 ", 100, "p1", 5);
            const item2 = new OrderItem("i2", "Item 2 ", 500, "p2", 7);
            let order = new Order("", "c1", [item1, item2]);
        }).toThrowError("Id is required");
    });
    it("should throw error when customerId is empty", () => {
        expect(() => {
            const item1 = new OrderItem("i1", "Item 1 ", 100, "p1", 5);
            const item2 = new OrderItem("i2", "Item 2 ", 500, "p2", 7);
            let order = new Order("o1", "", [item1, item2]);
        }).toThrowError("CustomerId is required");
    });
    it("should throw error when items is empty", () => {
        expect(() => {
            let order = new Order("o1", "c1", []);
        }).toThrowError("Items are required");
    });
    it("should throw error when the quantity of items is empty", () => {
        expect(() => {
            const item1 = new OrderItem("i1", "Item 1 ", 100, "p1", 0);
            const item2 = new OrderItem("i2", "Item 2 ", 500, "p2", 0);
            let order = new Order("o1", "c1", [item1, item2]);
        }).toThrowError("Quantity must be greater than 0");
    });
    it("should calculate total", () => {
        const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
        const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);

        const order = new Order("o1", "c1", [item]);

        let total = order.total();

        expect(order.total()).toBe(200);

        const order2 = new Order("o1", "c1", [item, item2]);
        total = order2.total();
        expect(total).toBe(600);
    });
});

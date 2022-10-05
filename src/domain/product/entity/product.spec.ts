import { Product } from "./product";

describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            const product = new Product("", "Product 1", 50);
        }).toThrowError("Id is required");
    });
    it("should throw error when name is empty", () => {
        expect(() => {
            const product = new Product("1", "", 50);
        }).toThrowError("Name is required");
    });
    it("should throw error when price is less than zero", () => {
        expect(() => {
            const product = new Product("1", "Product 1", -1);
        }).toThrowError("Price must be greater than zero");
    });
    it("should change name", () => {
        const product = new Product("1", "Product 1", 50);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2")
    });
    it("should change proce", () => {
        const product = new Product("1", "Product 1", 50);
        product.changePrice(100);
        expect(product.price).toBe(100)
    });
});

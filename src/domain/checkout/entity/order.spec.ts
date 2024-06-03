import OrderItem from "./order_item"
import Order from "./order"

describe('Order unit tests', () => { 
    it("should throw error when id is empty", () => {
        expect(() => {new Order("", "1234", [])})
        .toThrow("Id is required")
    })

    it("should throw error when customerId is empty", () => {
        expect(() => {new Order("1234", "", [])})
        .toThrow("CustomerId is required")
    })

    it("should throw error when items are empty", () => {
        expect(() => {new Order("1234", "1234", [])})
        .toThrow("Items are required")
    })

    it("should calculate ", () => {
        const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
        const item2 = new OrderItem("i2", "Item 2", 50, "p2", 2);
        const order = new Order("o1", "Order 1", [item]);

        const total =  order.total();

        expect(total).toBe(200);

        const order2 = new Order("o2", "Order 2", [item, item2]);

        const total2 = order2.total();

        expect(total2).toBe(300);
    })

    it("should throw error when quantity is less or equal zero", () => {
        expect(() => {
            const item = new OrderItem("i1", "Item 1", 50, "p2", 0);
            new Order("o1", "Order 1", [item]);
        }).toThrow("Quantity must be greater than zero")
    })
 })
import Customer from "../../customer/entity/customer";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import LogWhenCustomerIsCreatedHandler1 from "../../customer/event/handler/log-when-customer-is-created.handler";
import LogWhenCustomerIsCreatedHandler2 from "../../customer/event/handler/log-when-customer-is-created.handler2";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {

    beforeEach(() => {
        const eventDispatcher = EventDispatcher.getInstance();
        eventDispatcher.unregisterAll()
    });

    it("should register an event handler", () => {

        const eventDispatcher = EventDispatcher.getInstance();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"])
            .toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length)
            .toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0])
            .toMatchObject(eventHandler);
    })

    it("should unregister an event handler", () => {
        const eventDispatcher = EventDispatcher.getInstance();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0])
            .toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"])
            .toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length)
            .toBe(0);
    })

    it("should unregister all events handler", () => {
        const eventDispatcher = EventDispatcher.getInstance();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0])
            .toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"])
            .toBeUndefined();
    })

    it("should notify all events handler", () => {
        const eventDispatcher = EventDispatcher.getInstance();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0])
            .toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            descriptin: "Product 1 description",
            price: 10.0
        })

        eventDispatcher.notify(productCreatedEvent);
        expect(spyEventHandler).toHaveBeenCalled();
    })
});
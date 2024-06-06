import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import CustomerCreatedEvent from "./customer-created.event";

describe("CustomerCreatedEvent" , () => {
    
    beforeEach(() => {
        const eventDispatcher = EventDispatcher.getInstance();
        eventDispatcher.unregisterAll()
    });

    it("should notify an event handler on create customer", () => {

        const eventDispatcher = EventDispatcher.getInstance();

        const createdCustomer = new Customer("123", "customer1")

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"])
            .toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length)
            .toBe(2);

        const customerCreatedEvent = new CustomerCreatedEvent(createdCustomer)

        eventDispatcher.notify(customerCreatedEvent);
    })
})
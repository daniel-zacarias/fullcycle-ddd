import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import CustomerChangeAddressEvent from "./customer-change-address.event";
import CustomerCreatedEvent from "./customer-created.event";

describe("CustomerChangeAddressEvent" , () => {
    
    beforeEach(() => {
        const eventDispatcher = EventDispatcher.getInstance();
        eventDispatcher.unregisterAll()
    });

    it("should notify an event handler on change address customer", () => {

        const eventDispatcher = EventDispatcher.getInstance();

        const customer = new Customer("123", "customer1");
        const address = new Address("Servidão do Encanto", 72,
         "88062506", "Florianópolis")

        customer.changeAddress(address)


        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"])
            .toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length)
            .toBe(1);

        const customerChangeAddressEvent = new CustomerChangeAddressEvent(customer)

        eventDispatcher.notify(customerChangeAddressEvent);
    })
})
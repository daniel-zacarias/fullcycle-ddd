import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import Customer from "../../entity/customer";
import CustomerCreatedEvent from "../customer-created.event";

export default class LogWhenCustomerChangeHandler implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {
        const customer = event.eventData as Customer;
        console.log(`Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${customer.Address.street}, ${customer.Address.city}, ${customer.Address.number}`)
    }
}
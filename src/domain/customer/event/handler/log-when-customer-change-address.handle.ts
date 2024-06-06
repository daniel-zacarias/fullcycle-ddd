import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import Customer from "../../entity/customer";
import CustomerChangeAddressEvent from "../customer-change-address.event";

export default class LogWhenCustomerChangeHandler implements EventHandlerInterface<CustomerChangeAddressEvent> {
    handle(event: CustomerChangeAddressEvent): void {
        const customer = event.eventData as Customer;
        console.log(`Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${customer.Address.street}, ${customer.Address.city}, ${customer.Address.number}`)
    }
}
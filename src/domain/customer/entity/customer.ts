import EventDispatcher from "../../@shared/event/event-dispatcher";
import LogWhenCustomerChangeHandler from "../event/handler/log-when-customer-change-address.handle";
import LogWhenCustomerIsCreatedHandler1 from "../event/handler/log-when-customer-is-created.handler";
import LogWhenCustomerIsCreatedHandler2 from "../event/handler/log-when-customer-is-created.handler2";
import Address from "../value-object/address";

export default class Customer{
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = true;
    private _rewardPoints: number = 0;
    private _eventDispatcher = EventDispatcher.getInstance();

    constructor(id: string, name: string){
        this._id = id;
        this._name = name;
        this.validate();
        this._eventDispatcher.register("CustomerCreatedEvent", new LogWhenCustomerIsCreatedHandler1());
        this._eventDispatcher.register("CustomerCreatedEvent", new LogWhenCustomerIsCreatedHandler2());
    }

    validate(){
        if(this._name.length == 0)
            throw new Error("Name is required");

        if(this._id.length == 0)
            throw new Error("Id is required");
    }

    changeName(name:string) {
        this._name = name;
        this.validate();
    }

    changeAddress(address: Address) {
        this._address = address;
        this.validate();
        this._eventDispatcher.register("CustomerChangeAddressEvent", new LogWhenCustomerChangeHandler())
    }


    activate(){
        if(this._address == undefined) 
            throw Error("Address is mandatory to activate a customer")
        this._active = true;
    }

    deactivate(){
        this._active = false;
    }

    isActive(){
        return this._active;
    }

    get name(): string {
        return this._name;
    }

    get rewardPoints(): number{
        return this._rewardPoints;
    }

    get id(): string{
        return this._id;
    }

    get Address(): Address{
        return this._address
    }

    addRewardPoints(points: number){
        this._rewardPoints += points;
    }

    set Address(address: Address){
        this._address = address;
    }


}
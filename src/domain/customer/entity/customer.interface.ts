import Address from "../value-object/address";

export default interface CustomerInterface {
    get name(): string;

    get rewardPoints(): number;

    get id(): string;

    get Address(): Address;
}
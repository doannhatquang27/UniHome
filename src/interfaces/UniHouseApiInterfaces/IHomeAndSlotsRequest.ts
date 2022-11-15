import IBookSlot from "./IBookingSlot";
import IHouse from "./IHouse";

export default interface IHomeAndSlotsRequest {
  house: IHouse;
  slot: IBookSlot[];
}

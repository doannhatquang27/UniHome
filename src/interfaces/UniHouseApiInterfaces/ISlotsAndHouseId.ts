import IBookSlot from "./IBookingSlot";

export default interface ISlotsAndHouseId {
  houseId: string;
  slots: IBookSlot[];
}

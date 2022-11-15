export default interface IBookSlot {
  slotId: string;
  houseId: string | null;
  startTime: number;
  endTime: number;
  status: string | null;
}

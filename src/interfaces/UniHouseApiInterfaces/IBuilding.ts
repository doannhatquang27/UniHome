import IOwner from "./IOwner";

export default interface IBookSlot {
  buildingId: string;
  name: string;
  wardId: string;
  address: string;
  disableTime: null;
  status: "Available";
  image: string;
  buildingOwnerFullName: string | null;
  buildingOwnerPhoneNum: string | null;
  updateTime: null;
  ownerId: string;
  coordinaryX: number;
  coordinaryY: number;
  distance: number;
  wardName: string;
  districtName: string;
  districtId: string;
  owner: IOwner;
}

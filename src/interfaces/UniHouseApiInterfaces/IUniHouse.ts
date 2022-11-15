import IUniversity from "./IUniversity";

export default interface IUniHouse {
  uniHouseId: string;
  houseId: string;
  universityId: string;
  distance: number;
  university: IUniversity;
}

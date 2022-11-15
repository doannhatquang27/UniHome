import { HouseStatusEnum } from "../../enums/HouseEnum";

export default interface IHouseType {
  houseTypeId: string;
  name: string;
  status: HouseStatusEnum;
}

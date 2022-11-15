import IHouse from "./IHouse";

export interface IHouseListWithTotalPage {
  houses: IHouse[];
  totalPage: number;
}

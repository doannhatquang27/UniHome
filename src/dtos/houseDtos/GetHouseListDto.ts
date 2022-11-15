import {
  HouseOrderByEnum,
  HouseStatusEnum,
  OrderTypeEnum,
} from "../../enums/HouseEnum";
import { RentEntityEnum } from "../../enums/RentEntityEnum";

export interface GetHouseListDTO {
  status?: HouseStatusEnum;
  creatorId?: string;
  wardId?: string;
  districtId?: string;
  houseTypeId?: string;
  name: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  isSharing?: boolean;
  gender?: number;
  rentStatus?: RentEntityEnum;
  orderType?: OrderTypeEnum;
  orderBy?: HouseOrderByEnum;
  pageNumber: number;
  pageSize: number;
  includeRenType?: number;
}

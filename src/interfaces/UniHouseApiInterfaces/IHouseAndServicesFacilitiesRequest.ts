import IRentEntity from "./IRentEntity";
import IRentFacility from "./IRentFacility";
import IRentService from "./IRentService";

export default interface IHouseAndServicesFacilitiesRequest {
  rent: IRentEntity;
  rentFacitilies: IRentFacility[];
  rentServices: IRentService[];
}

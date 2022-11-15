import IFacility from "./IFacility";

export default interface IRentFacility {
  rentFacilityId: string;
  rentObjectId: string | null;
  facilityId: string | null;
  facility: IFacility | null;
}

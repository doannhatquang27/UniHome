import IService from "./IService";

export default interface IRentService {
  rentServiceId: string;
  rentObjectId: string | null;
  serviceId: string | null;
  service: IService | null;
}

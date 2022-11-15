export default interface IService {
  serviceId: string;
  name: string;
  status: number;
  icon: string;
  isDefault: boolean;
  createdBy: string;
  price: number;
  createdTime: Date;
  updatedTime: Date;
  unitName: string;
  isFixed: boolean;
}

import IRole from "./IRole";

export default interface IUser {
  address: string | null;
  citizenNumber: string | null;
  citizenNumberDate: Date | null;
  dateOfBirth: string;
  email: string;
  fullname: string;
  gender: number;
  image: string;
  lastModified: Date | null;
  modifiedBy: string | null;
  phone: string;
  role: IRole;
  roleId: string;
  roleName: string;
  status: string;
  statusString: string;
  universityId: string | null;
  userId: string;
}

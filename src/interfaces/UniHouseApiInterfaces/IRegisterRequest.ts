import IUser from "./IUser";

export default interface IRegisterRequest {
  accessToken: string;
  user: IUser;
}

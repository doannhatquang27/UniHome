import { INotification } from "./INotification";

export interface INotificationWithTotalPage {
  notifications: INotification[];
  totalPage: number;
}

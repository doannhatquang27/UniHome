export interface INotification {
  notificationId: number;
  receiverId: string;
  receiverName: string;
  content: string;
  fullContent: string;
  title: string;
  time: string;
  isRead: boolean;
}

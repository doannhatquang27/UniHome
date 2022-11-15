interface NotificationTypeProps {
  notificationTypeId: string;
  notificationTypeName: string;
}

export const NotificationIdType = {
  Payment: "8F956311-88ED-4EB9-9D1E-15987C850A02",
  Appointment: "475F616C-CF13-46E0-89D9-2A705BA11DD0",
  QA: "44B8BF5F-E888-46C4-B13A-7E0BCEE2B83E",
  Problem: "C698F58F-70CD-468C-B065-C437B6F3B50E",
  Sharing: "3765D469-54E5-490D-B82F-C7A1F29840FE",
  Contract: "1EE38434-FDF9-46FC-88F4-F8EEE261020C",
  Other: "989F769E-B5E8-4A0E-A441-4E94BF7ECE6A",
};

export const NotificationType: NotificationTypeProps[] = [
  {
    notificationTypeId: NotificationIdType.Payment,
    notificationTypeName: "Thanh Toán",
  },
  {
    notificationTypeId: NotificationIdType.Appointment,
    notificationTypeName: "Cuộc Hẹn",
  },
  {
    notificationTypeId: NotificationIdType.Other,
    notificationTypeName: "Khác",
  },
  {
    notificationTypeId: NotificationIdType.QA,
    notificationTypeName: "Q&A",
  },
  {
    notificationTypeId: NotificationIdType.Problem,
    notificationTypeName: "Vấn Đề Trọ",
  },
  {
    notificationTypeId: NotificationIdType.Sharing,
    notificationTypeName: "Ở Ghép",
  },
  {
    notificationTypeId: NotificationIdType.Contract,
    notificationTypeName: "Hợp Đồng",
  },
];

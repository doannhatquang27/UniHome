export enum AppointmentStatusEnum {
  Accepted = 1,
  Rejected = 2,
  Expired = 3,
  Waiting = 4,
  Aborted_Renter = 5,
  Aborted_Owner = 6,
  Finished = 7,
}

export default interface IAppointment {
  appointmentId: string;
  createdDate: string;
  status: number;
  statusString: string;
  houseId: string;
  renterName: string | null;
  renterPhone: string | null;
  renterEmail: string | null;
  note: string | null;
  abortReason: string | null;
  abortTime: string | null;
  acceptTime: string | null;
  updateTime: string | null;
  createdTime: string;
  ownerId: string;
  renterId: string | null;
  meetTime: number;
  meetDate: string;
  slotId: string | null;
  address: string | null;
  ownerName: string | null;
  ownerPhone: string | null;
}

import IAppointment from "./IAppointment";

export default interface IAppointmentWithTotalRecord {
  appointments: IAppointment[];
  totalRecord: number;
}

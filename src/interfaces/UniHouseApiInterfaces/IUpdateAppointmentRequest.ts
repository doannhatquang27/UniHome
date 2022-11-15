export default interface IUpdateAppointmentRequest {
  appointmentId: string;
  status: string | null;
  abortReason: string | null;
}

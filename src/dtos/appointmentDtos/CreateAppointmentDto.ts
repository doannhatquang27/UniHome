export default interface CreateAppointmentDto {
  houseId: string;
  rentTypeId: string;
  renterName: string;
  renterPhone: string;
  renterEmail: string;
  note: string;
  renterId: string | null;
  meetTime: number;
  meetDate: string;
  slotId: string;
}

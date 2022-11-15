export default interface IPaymentReq {
  receiverId: string;
  senderId: string;
  content: string;
  paymentTypeId: number;
}

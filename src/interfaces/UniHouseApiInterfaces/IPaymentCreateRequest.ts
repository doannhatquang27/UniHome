import IPaymentDetailReq from "./IPaymentDetailReq";
import IPaymentReq from "./IPaymentReq";

export default interface IPaymentCreateRequest {
  payment: IPaymentReq;
  paymentDetails: IPaymentDetailReq[];
}

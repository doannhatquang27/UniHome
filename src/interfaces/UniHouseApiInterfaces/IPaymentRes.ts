export default interface IPaymentRes {
  paymentId: string;
  senderId: string;
  receiverId: string;
  createdBy: string;
  amount: number;
  status: number;
  content: string;
  paymentTime: Date;
  contractId: string | null;
  paymentTypeId: string | null;
  senderName: string;
  receiverName: string;
  paymentTypeName: string;
  statusString: string;
  paymentType: string;
  paymentDetail: IPaymentDetailRes[];
  transactions: ITransaction[];
}

export interface IPaymentDetailRes {
  paymentDetailId: number;
  detailName: string;
  quantity: number;
  unitPrice: number;
  paymentId: string;
  unit: string;
}

export interface ITransaction {
  transactionId: number;
  tptransId: string;
  status: number;
  transactionTime: Date | null;
  paymentId: string;
}

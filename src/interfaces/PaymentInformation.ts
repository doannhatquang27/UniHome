export interface CreatePaymentInformation {
  partnerCode: string;
  partnerName: string;
  storeId: string;
  requestId: string;
  amount: number;
  orderId: string;
  orderInfo: string;
  redirectUrl: string;
  ipnUrl: string;
  requestType: string;
  extraData: string;
  autoCapture: boolean;
  lang: string;
  signature: string;
}

export interface GenerateCreatePaymentSignature {
  accessKey: string;
  amount: number;
  extraData: string;
  ipnUrl: string;
  orderId: string;
  orderInfo: string;
  partnerCode: string;
  redirectUrl: string;
  requestId: string;
  requestType: string;
}

export interface GenerateConfirmPaymentSignature {
  accessKey: string;
  amount: number;
  extraData: string;
  message: string;
  orderId: string;
  orderInfo: string;
  orderType: string;
  partnerCode: string;
  payType: string;
  requestId: string;
  responseTime: number;
  resultCode: number;
  transId: string;
}

export interface GenerateMomoPaymentQrCode {
  partnerCode: string;
  partnerName: string;
  storeId: string;
  requestType: string;
  ipnUrl: string;
  redirectUrl: string;
  orderId: string;
  amount: number;
  lang: string;
  orderInfo: string;
  requestId: string;
  extraData: string;
  signature: string;
}

export interface GenerateMomoPaymentQrCodeResponse {
  partnerCode: string;
  orderId: string;
  requestId: string;
  amount: number;
  responseTime: number;
  message: string; //Successful.
  resultCode: number;
  payUrl: string;
}

export interface AddTransactionForUpdatePaymentDTO {
  transId: string;
  status: number;
  paymentId: string;
}

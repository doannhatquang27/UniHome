import { Button } from "@material-ui/core";
import dotenv from "dotenv";
import { useSnackbar } from "notistack";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { COLORS } from "../../constants/color";
import PaymentType from "../../constants/payment-type";
import { AuthContext } from "../../contexts/AuthContext";
import {
  GenerateCreatePaymentSignature,
  GenerateMomoPaymentQrCode,
} from "../../interfaces/PaymentInformation";
import IPaymentCreateRequest from "../../interfaces/UniHouseApiInterfaces/IPaymentCreateRequest";
import IPaymentRes from "../../interfaces/UniHouseApiInterfaces/IPaymentRes";
import IRentEntity from "../../interfaces/UniHouseApiInterfaces/IRentEntity";
import {
  createPaymentAPI,
  generateMomoPaymentQrCode,
} from "../../services/payment-services";
import { blockRentForDepositRequestAPI } from "../../services/rent-services";
import { generateCreatePaymentSignature } from "../../services/utils/payment";
dotenv.config();

const AccessKey = process.env.REACT_APP_MOMO_ACCESS_KEY;
const PartnerCode = process.env.REACT_APP_MOMO_PARTNER_CODE;

interface Props {
  rentEntity: IRentEntity;
  rentEntityQuery: string;
}

const PaymentComponent: FC<Props> = ({ rentEntity, rentEntityQuery }) => {
  const { currentUser, accessToken } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  // const history = useHistory();
  const [paymentResponse, setPaymentResponse] = useState<IPaymentRes>();
  const currentLocationOrigin = window.location.origin;

  const generatePaymentQrCode = useCallback(async () => {
    if (AccessKey && PartnerCode && paymentResponse) {
      const generateSignaturePayload: GenerateCreatePaymentSignature = {
        accessKey: AccessKey,
        amount: paymentResponse.amount,
        // amount: 100000,
        extraData: rentEntityQuery,
        ipnUrl: "https://momo.vn",
        orderId: paymentResponse.paymentId,
        // orderId: "MM1540456472581",
        orderInfo: paymentResponse.content,
        // orderInfo: "Đặt cọc tiền nhà",
        partnerCode: PartnerCode,
        redirectUrl: `${currentLocationOrigin}/paymentsuccess`,
        requestId: paymentResponse.paymentId,
        // requestId: "MM1540456472581",
        requestType: "captureWallet",
      };

      const signature = generateCreatePaymentSignature(
        generateSignaturePayload
      );

      const generateQrPayload: GenerateMomoPaymentQrCode = {
        partnerCode: PartnerCode,
        partnerName: "Test",
        storeId: "MoMoTestStore",
        requestType: "captureWallet",
        ipnUrl: "https://momo.vn",
        redirectUrl: `${currentLocationOrigin}/paymentsuccess`,
        orderId: paymentResponse.paymentId,
        // orderId: "MM1540456472581",
        amount: paymentResponse.amount,
        // amount: 100000,
        lang: "en",
        orderInfo: paymentResponse.content,
        // orderInfo: "Đặt cọc tiền nhà",
        requestId: paymentResponse.paymentId,
        // requestId: "MM1540456472581",
        extraData: rentEntityQuery,
        signature,
      };

      if (accessToken) {
        const result = await generateMomoPaymentQrCode(
          generateQrPayload,
          accessToken
        );
        if (result) {
          window.open(result.payUrl, "_blank");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocationOrigin, paymentResponse, rentEntityQuery]);

  useEffect(() => {
    if (paymentResponse) {
      generatePaymentQrCode();
    }
  }, [generatePaymentQrCode, paymentResponse]);

  const createPaymentRequest = async () => {
    if (currentUser && accessToken) {
      const blockDepositRent = await blockRentForDepositRequestAPI(
        rentEntity.rentEntityId,
        accessToken
      );

      if (blockDepositRent) {
        const payload: IPaymentCreateRequest = {
          payment: {
            receiverId: rentEntity.createdBy,
            senderId: currentUser.userId,
            content: `Đặt cọc nhà ${rentEntity.name}`,
            paymentTypeId: PaymentType.DepositPayment,
          },
          paymentDetails: [
            {
              detailName: `Tiền cọc nhà ${rentEntity.name}`,
              quantity: 1,
              unitPrice: rentEntity.depositPrice,
              unit: "nhà",
            },
          ],
        };

        const result = await createPaymentAPI(payload, accessToken);
        setPaymentResponse(result);
      } else {
        enqueueSnackbar("Không thể đặt cọc phòng này", {
          variant: "error",
          transitionDuration: { enter: 400, exit: 200 },
        });
      }
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{ backgroundColor: COLORS.appSecondColor, borderRadius: 4 }}
        onClick={createPaymentRequest}
      >
        Đặt cọc giữ phòng
      </Button>
    </div>
  );
};

export default PaymentComponent;

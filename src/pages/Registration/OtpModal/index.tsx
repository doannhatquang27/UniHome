import { Button, Card, CardContent, Modal } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { SyntheticEvent, useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { COLORS } from "../../../constants/color";
import firebase from "../../../services/fire-base";
import "./index.scss";

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

interface Props {
  phoneNumber: string;
  visible: boolean;
  onClose: () => void;
  triggerRegistration: () => void;
}

const OtpModal: React.FC<Props> = ({
  phoneNumber,
  visible,
  onClose,
  triggerRegistration,
}) => {
  const [otpCode, setOtpCode] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "register-button",
      {
        size: "invisible",
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
          console.log("Recaptca varified");
        },
        defaultCountry: "VN",
      }
    );
  };

  const onSignInSubmit = () => {
    configureCaptcha();
    const phoneNumberWithCountryCode = "+84" + phoneNumber.substring(1);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumberWithCountryCode, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        enqueueSnackbar("Mã OTP đã được gửi", {
          variant: "success",
          transitionDuration: { enter: 400, exit: 200 },
        });
        // ...
      })
      .catch((error) => {
        // enqueueSnackbar("Không thể gửi mã OTP", {
        //   variant: "error",
        //   transitionDuration: { enter: 400, exit: 200 },
        // });
        console.error(error);
      });
  };

  useEffect(() => {
    if (phoneNumber && visible) {
      onSignInSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneNumber, visible]);

  const onSubmitOTP = (event: SyntheticEvent) => {
    event.preventDefault();
    window.confirmationResult
      .confirm(otpCode)
      .then((result: any) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));
        triggerRegistration();
        onClose();
        // ...
      })
      .catch((error: any) => {
        enqueueSnackbar("Mã OTP không đúng", {
          variant: "error",
          transitionDuration: { enter: 400, exit: 200 },
        });
        console.error(error);
      });
  };

  return (
    <React.Fragment>
      <Modal open={visible} onClose={onClose}>
        <Card className="otp-model-card">
          <CardContent className="card-content">
            <div>
              <span className="card-content_label">
                Nhập Mã OTP Được Gửi Đến Điện Thoại Để Xác Thực
              </span>
            </div>
            <OtpInput
              inputStyle="inputStyle"
              value={otpCode}
              onChange={(value: string) => setOtpCode(value)}
              numInputs={6}
              separator={<span>-</span>}
            />
            <Button
              onClick={onSubmitOTP}
              variant="contained"
              style={{
                backgroundColor: COLORS.appMainColor,
                color: "white",
              }}
            >
              Xác thực
            </Button>
          </CardContent>
        </Card>
      </Modal>
    </React.Fragment>
  );
};

export default OtpModal;

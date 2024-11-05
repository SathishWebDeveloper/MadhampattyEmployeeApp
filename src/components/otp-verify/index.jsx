import { Box } from "@mui/material";
import leftArrow from "assets/images/icons/left-arrow.svg";
import logobg from "assets/images/logo/logo.png";
import React, { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomButton from "styles/scss/utils/customstyles";
import { OtpVerifyRequest } from "../../redux/service/loginService";
import { changeValidEmailState } from "../../redux/slice/authTokenSlice";
const OtpPageVerify = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const temporaryToken = useSelector(
    (state) => state.authTokenAccess.rememberToken
  );
  const userValidEmail = useSelector(
    (state) => state.authTokenAccess.emailAddress
  );
  const isResError = useSelector((state) => state.authTokenAccess.apierror);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [otpValidate, setOtpvalidate] = useState(() => false);

  const handleChange = (index, e) => {
    const { value } = e.target;
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputRefs[index - 1].current.focus();
    }
  };
  const filteredOtp = useMemo(() => {
    if (!otp) return [];
    return otp?.filter((item) => item !== "");
  }, [otp]);

  const handleNaviagation = () => {
    navigate("/reset-password", { state: { auth: "verify" } });
  };

  const handleValidation = () => {
    if (filteredOtp.length !== 4) setOtpvalidate(true);
    else {
      const otpValue = otp.join("");
      setOtpvalidate(false);
      dispatch(
        OtpVerifyRequest({
          otpValue,
          temporaryToken,
          callback: handleNaviagation,
        })
      );
      /// here call an another dispatch method with api if response gets success means navigate or need to show the error
      // dispatch(changeValidEmailState());
      // navigate("/reset-password", { state: { auth: "verify" } });
    }
  };

  const handleBackForgotPage = () => {
    dispatch(changeValidEmailState());
  };

  return (
    <React.Fragment>
      <Box className="otp-container flex-box">
        <Box className="otp-boxfield flex-box">
          <Box className="otp-area flex-col">
            <Box className="otp-imagebox">
              <img src={logobg} alt="logo" className="project-logoimage" />
            </Box>
            <Box className="otp-formbox flex-colstart">
              <Box className="response-error-text flex-box">
                {isResError && isResError}
              </Box>
              <Box className="otp-formonsubmit flex-col">
                <Box className="otp-title gradient-titletext">
                  OTP Verification
                </Box>
                <Box className="otp-verifycontent">
                  OTP sent to {userValidEmail && userValidEmail}
                </Box>
                <Box className="otp-inputbox flex-col">
                  <Box className="otp-inputfield">
                    {otp.map((value, index) => (
                      <input
                        key={`inputfield${index}`}
                        className={`otp-input ${
                          otpValidate &&
                          otp[index] === "" &&
                          "otp-error-outline"
                        }`}
                        type="text"
                        maxLength="1"
                        value={value}
                        ref={inputRefs[index]}
                        onChange={(e) => handleChange(index, e)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                      />
                    ))}
                  </Box>
                  <Box className="otp-timefield">
                    {otpValidate && filteredOtp.length !== 4 && (
                      <Box className="validate-error-text">
                        Please enter valid OTP
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box className="otp-buttonfield flex-box">
                  <CustomButton onClick={() => handleValidation()}>
                    Verify
                  </CustomButton>
                </Box>
                <Box
                  className="otp-backpage"
                  onClick={() => handleBackForgotPage()}
                >
                  <img
                    src={leftArrow}
                    className="back-pageicon"
                    alt="backicon"
                  />
                  Back to Login
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};
export default OtpPageVerify;

import { Box, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import leftArrow from "assets/images/icons/left-arrow.svg";
import rightArrow from "assets/images/icons/right-arrow.png";
import logo from "assets/images/logo/logo.png";
import Loader from "components/Loader";
import OtpPageVerify from "components/otp-verify";
import { Field, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomButton from "styles/scss/utils/customstyles";
import { customTextFieldStyles } from "styles/scss/utils/inputfieldstyle.js";
import * as Yup from "yup";
import { ForgotPasswordRequest } from "../../../../redux/service/loginService";
import { changeValidEmailState } from "../../../../redux/slice/authTokenSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authKey = useSelector((state) => state.authTokenAccess.token);
  const isLoader = useSelector((state) => state.authTokenAccess.loading);
  const isResError = useSelector((state) => state.authTokenAccess.apierror);
  const userValidEmail = useSelector(
    (state) => state.authTokenAccess.validEmail
  );

  useEffect(() => {
    if (authKey) {
      navigate("/dashboard");
    }
    return () => {
      dispatch(changeValidEmailState());
    };
  }, [authKey, dispatch, navigate]);

  const validateEmail = (email) => {
    return Yup.string().email().isValidSync(email);
  };

  const handleFormSubmit = (values) => {
    dispatch(ForgotPasswordRequest(values));
  };

  const handleOtpStateChange = () => {
    dispatch(changeValidEmailState());
    navigate("/");
  };

  const EmailValidSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required *")
      .test("email", "Invalid email!", (value) => {
        return validateEmail(value);
      }),
  });

  return (
    <React.Fragment>
      {isLoader && <Loader />}
      {userValidEmail ? (
        <OtpPageVerify />
      ) : (
        <Box className="forgot-password-container flex-box">
          <Box className="forgot-password-box">
            <Box>
              <img src={logo} className="logo" alt="logo" />
              <Box className="response-error-text">
                {isResError && isResError}
              </Box>
              <Box className="title gradient-titletext">Forgot Password?</Box>
              <Box className="description">Enter Email ID & get OTP</Box>
              <Formik
                initialValues={{ email: "" }}
                validationSchema={EmailValidSchema}
                onSubmit={(values) => {
                  handleFormSubmit(values);
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  values,
                  errors,
                  touched,
                  handleSubmit,
                }) => {
                  return (
                    <form component="form" onSubmit={handleSubmit}>
                      <div>
                        <Field name="email">
                          {({ field }) => (
                            <FormControl
                              sx={customTextFieldStyles}
                              variant="outlined"
                              className="forgot-enter-email"
                            >
                              <InputLabel htmlFor="outlined-adornment-emailaddress">
                                Email ID*
                              </InputLabel>
                              <OutlinedInput
                                {...field}
                                name="email"
                                id="outlined-adornment-emailaddress"
                                label="Email ID*"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                touched={touched.email ? "true" : undefined}
                                error={touched.email && Boolean(errors.email)}
                              />
                            </FormControl>
                          )}
                        </Field>
                        <Box className="validate-error-text forgot-error">
                          {errors.email && touched.email ? (
                            <>{errors.email}</>
                          ) : null}
                        </Box>
                      </div>

                      <CustomButton type="submit">
                        Continue{" "}
                        <img
                          src={rightArrow}
                          alt="next"
                          className="continue-nextarrow"
                        />
                      </CustomButton>
                    </form>
                  );
                }}
              </Formik>
              <Box
                className="back-to-login-btn"
                onClick={() => handleOtpStateChange()}
              >
                <img src={leftArrow} className="back-pageicon" alt="backicon" />
                Back to Login
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};
export default ForgotPassword;

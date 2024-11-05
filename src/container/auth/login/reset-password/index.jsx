import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import hide from "assets/images/icons/pass-hide.png";
import visible from "assets/images/icons/pass-visible.png";
import logo from "assets/images/logo/logo.png";
import SuccessMessage from "components/success-modal";
import { Field, Formik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ResetPasswordRequest } from "../../../../redux/service/loginService";
import CustomButton from "styles/scss/utils/customstyles";
import { customTextFieldStyles } from "styles/scss/utils/inputfieldstyle.js";
import * as Yup from "yup";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const temporaryToken = useSelector(
    (state) => state.authTokenAccess.rememberToken
  );
  const isResError = useSelector((state) => state.authTokenAccess.apierror);
  const [successMsg, setSuccessMsg] = useState(() => true);
  const [passwordVerify, setPasswordVerify] = useState(() => true);
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const handleClickShowPassword = (e) => {
    const { name } = e.currentTarget;
    setShowPassword((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const otpsuccessMsg = `Your email address has been
  successfully verified.`;
  const passwordsuccessMsg = `Your Password has been 
  successfully changed.`;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@]).*$/;
  useEffect(() => {
    if (location?.state?.auth !== "verify") {
      navigate("/");
    } else {
      //   navigate('/reset-password',{state:{auth:'notverify'}})
      const newPath = {
        ...location,
        state: { ...location.state, auth: "notverify" },
      };
      navigate(newPath, { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    let timer = setTimeout(() => {
      setSuccessMsg(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [successMsg]);

  // const handleConfirmPassword = () => {
  //   setPasswordVerify(false);
  //   handleValidateNavigate();
  // };

  const handleValidateNavigate = () => {
    setPasswordVerify(false);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const SigninSchema = Yup.object().shape({
    // email: Yup.string().required("Please enter email ID."),
    // .test("email", "Invalid email!", (value) => {
    //   return validateEmail(value);
    // }),
    passwordOne: Yup.string()
      .min(8, "Password must be 8 or more characters")
      // .max(16, "too high")
      .matches(
        passwordRegex,
        "Password must contain at least 1 lowercase and 1 uppercase letter, 1 numeric, and 1 special character"
      )
      .required("Please enter an new password."),
    passwordTwo: Yup.string()
      .min(8, "Password must be 8 or more characters")
      .oneOf([Yup.ref("passwordOne")], "Sorry Password don’t match")
      // .max(16, "too high")
      .required("Please enter an confirm password."),
  });

  const handleFormSubmit = (values) => {
    const { passwordOne, passwordTwo } = values;
    console.log('123',values);
    dispatch(ResetPasswordRequest({passwordOne , passwordTwo , temporaryToken ,callback : handleValidateNavigate}))
    // handleValidateNavigate();
    
  };

  return (
    <React.Fragment>
      <Box className="reset-container flex-box">
        <Box className="reset-boxfield flex-box">
          {successMsg ? (
            <SuccessMessage content={otpsuccessMsg} />
          ) : !passwordVerify ? (
            <SuccessMessage content={passwordsuccessMsg} />
          ) : (
            <Box className="reset-area flex-col">
              <Box className="reset-imagebox">
                <img src={logo} alt="logo" className="project-logoimage" />
              </Box>
              <Box className="response-error-text flex-box">
                {isResError && isResError}
              </Box>
              {/* <Box className="validate-error-text">Api response error</Box> */}
              <Box className="gradient-titletext">Create New Password</Box>
              <Box className="reset-formbox">
                {/* {formik form on submit container} */}

                <Formik
                  initialValues={{ passwordOne: "", passwordTwo: "" }}
                  validationSchema={SigninSchema}
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
                      <form
                        className="reset-formonsubmit flex-col"
                        onSubmit={handleSubmit}
                      >
                        {/* <Box className="reset-formonsubmit flex-col"> */}
                        <Box className="reset-inputfield flex-col">
                          <Box className="reset-mobileContainer flex-colstart">
                            <Field name="passwordOne">
                              {({ field }) => (
                                <FormControl
                                  name="passwordOne"
                                  sx={customTextFieldStyles}
                                  variant="outlined"
                                  // inputProps={{ className: "mui-fontfamily" }}
                                >
                                  <InputLabel htmlFor="outlined-adornment-password">
                                    Enter New Password*
                                  </InputLabel>
                                  <OutlinedInput
                                    {...field}
                                    id="outlined-adornment-password"
                                    name="passwordOne"
                                    value={values.password}
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    touched={touched.password}
                                    error={
                                      touched.password &&
                                      Boolean(errors.password)
                                    }
                                    autoComplete="on"
                                    // InputProps={{ className: "mui-fontfamily" }}
                                    type={
                                      showPassword.newPassword
                                        ? "text"
                                        : "password"
                                    }
                                    endAdornment={
                                      <InputAdornment position="end">
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          name="newPassword"
                                          onClick={(e) =>
                                            handleClickShowPassword(e)
                                          }
                                          edge="end"
                                        >
                                          {showPassword.newPassword ? (
                                            <img
                                              src={hide}
                                              className="password-toggleicon"
                                              alt="password"
                                            />
                                          ) : (
                                            <img
                                              src={visible}
                                              className="password-toggleicon"
                                              alt="password"
                                            />
                                          )}
                                        </IconButton>
                                      </InputAdornment>
                                    }
                                    label="Enter New Password*"
                                  />
                                </FormControl>
                              )}
                            </Field>
                            <Box className="validate-error-text reset-error">
                              {errors.passwordOne && touched.passwordOne && (
                                <>{errors.passwordOne}</>
                              )}
                            </Box>
                          </Box>
                          <Box className="reset-passwordContainer flex-colstart">
                            <Field name="passwordTwo">
                              {({ field }) => (
                                <FormControl
                                  name="passwordTwo"
                                  sx={customTextFieldStyles}
                                  variant="outlined"
                                  // inputProps={{ className: "mui-fontfamily" }}
                                >
                                  <InputLabel htmlFor="outlined-adornment-password">
                                    Re-Enter New Password*
                                  </InputLabel>
                                  <OutlinedInput
                                    {...field}
                                    id="outlined-adornment-password"
                                    name="passwordTwo"
                                    value={values.password}
                                    variant="outlined"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    touched={touched.password}
                                    error={
                                      touched.password &&
                                      Boolean(errors.password)
                                    }
                                    autoComplete="on"
                                    type={
                                      showPassword.confirmPassword
                                        ? "text"
                                        : "password"
                                    }
                                    endAdornment={
                                      <InputAdornment position="end">
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          name="confirmPassword"
                                          onClick={(e) =>
                                            handleClickShowPassword(e)
                                          }
                                          edge="end"
                                        >
                                          {showPassword.confirmPassword ? (
                                            <img
                                              src={hide}
                                              className="password-toggleicon"
                                              alt="password"
                                            />
                                          ) : (
                                            <img
                                              src={visible}
                                              className="password-toggleicon"
                                              alt="password"
                                            />
                                          )}
                                        </IconButton>
                                      </InputAdornment>
                                    }
                                    label="Re-Enter New Password*"
                                  />
                                </FormControl>
                              )}
                            </Field>

                            <Box className="validate-error-text reset-error">
                              {errors.passwordTwo && touched.passwordTwo && (
                                <>{errors.passwordTwo}</>
                              )}
                            </Box>
                          </Box>
                        </Box>
                        <Box className="reset-buttonfield flex-box">
                          <CustomButton
                            type="submit"
                            // onClick={() => handleConfirmPassword()}
                          >
                            Submit
                          </CustomButton>
                        </Box>
                        {/* </Box> */}
                      </form>
                    );
                  }}
                </Formik>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </React.Fragment>
  );
};
export default ResetPassword;

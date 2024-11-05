import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import hide from "assets/images/icons/pass-hide.png";
import visible from "assets/images/icons/pass-visible.png";
import logo from "assets/images/logo/logo.png";
import Loader from "components/Loader";
import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomButton from "styles/scss/utils/customstyles";
import { customTextFieldStyles } from "styles/scss/utils/inputfieldstyle.js";
import * as Yup from "yup";
import { LoginAuthenticationRequest } from "../../../redux/service/loginService";
import { changeValidEmailState } from "../../../redux/slice/authTokenSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authKey = useSelector((state) => state.authTokenAccess.token);
  const isLoader = useSelector((state) => state.authTokenAccess.loading);
  const isResError = useSelector((state) => state.authTokenAccess.apierror);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (authKey) {
      navigate("/dashboard");
    }
    return () => dispatch(changeValidEmailState());
  }, [authKey,dispatch,navigate]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .required("Please enter email ID.")
      .test("email", "Invalid email!", (value) => {
        return validateEmail(value);
      }),
    password: Yup.string()
      .min(7, "Password must be 8 or more characters")
      .required("Please enter an password."),
  });

  const validateEmail = (email) => {
    return Yup.string().email().isValidSync(email);
  };

  const handleNaviagation = () => {
    navigate("/dashboard");
  };

  const handleFormSubmit = (values) => {
    dispatch(
      LoginAuthenticationRequest({ ...values, callback: handleNaviagation })
    );
  };

  return (
    <React.Fragment>
      <Box className="login-container flex-box">
        <Box className="login-boxfield flex-box">
          <Box className="login-area flex-col">
            {isLoader && <Loader />}
            <Box className="login-imagebox">
              <img src={logo} alt="logo" className="project-logoimage" />
            </Box>
            <Box className="login-errortitle-box flex-col">
              <Box className="response-error-text">
                {isResError && isResError}
              </Box>
              {/* // }  */}
              <Box className="gradient-titletext"> Sign In to continue</Box>
            </Box>
            <Box className="login-formbox">
              <Formik
                initialValues={{ email: "", password: "" }}
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
                      className="login-formonsubmit flex-col"
                      onSubmit={handleSubmit}
                    >
                      <Box className="login-inputfield flex-col">
                        <Box className="login-mobileContainer flex-colstart">
                          <Field name="email">
                            {({ field }) => (
                              <FormControl
                                sx={customTextFieldStyles}
                                variant="outlined"
                              >
                                <InputLabel htmlFor="outlined-adornment-emailaddress">
                                  Email ID*
                                </InputLabel>
                                <OutlinedInput
                                  {...field}
                                  name="email"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.email}
                                  touched={touched.email ? "true" : undefined}
                                  error={touched.email && Boolean(errors.email)}
                                  id="outlined-adornment-emailaddress"
                                  label="Email ID*"
                                />
                              </FormControl>
                            )}
                          </Field>
                          <Box className="validate-error-text login-error">
                            {errors.email && touched.email ? (
                              <>{errors.email}</>
                            ) : null}
                          </Box>
                        </Box>
                        <Box className="login-passwordContainer flex-colstart">
                          <Field name="password">
                            {({ field }) => (
                              <FormControl
                                name="password"
                                sx={customTextFieldStyles}
                              >
                                <InputLabel htmlFor="outlined-adornment-password">
                                  Password*
                                </InputLabel>
                                <OutlinedInput
                                  {...field}
                                  id="outlined-adornment-password"
                                  name="password"
                                  value={values.password}
                                  variant="outlined"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  touched={
                                    touched.password ? "true" : undefined
                                  }
                                  error={
                                    touched.password && Boolean(errors.password)
                                  }
                                  autoComplete="on"
                                  type={showPassword ? "text" : "password"}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                      >
                                        {showPassword ? (
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
                                  label="Password*"
                                />
                              </FormControl>
                            )}
                          </Field>
                          <Box className="validate-error-text login-error">
                            {errors.password && touched.password && (
                              <>{errors.password}</>
                            )}
                          </Box>
                        </Box>
                        <Box className="login-forgettext flex-spcbtn">
                          <Box className="login-remember">
                            <FormControlLabel
                              control={<Checkbox sx={{ padding: 0 }} />}
                              label="Remember me"
                              sx={{
                                padding: 0,
                                fontSize: "12px",
                                border: "#8A3A93",
                              }}
                            />
                          </Box>
                          <Box
                            className="login-forgot"
                            onClick={() => navigate("/forgot-password")}
                          >
                            Forgot Password?
                          </Box>
                        </Box>
                      </Box>
                      <Box className="login-buttonfield flex-box">
                        <CustomButton type="submit">Sign In</CustomButton>
                      </Box>
                    </form>
                  );
                }}
              </Formik>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};
export default Login;

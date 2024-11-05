import { Box, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Field, Formik } from "formik";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "styles/scss/utils/customstyles";
import { customTextFieldStyles } from "styles/scss/utils/inputfieldstyle.js";
import * as Yup from "yup";
import { createUserRequest, staffenrollPincodeData } from "../../../redux/service/staffenrollment-service";

const StaffAddProfile = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const livePinCode = useSelector(
    (state) => state.staffenrollmentAccess.pinCode
  );
  const authKey = useSelector((state) => state.authTokenAccess.token);

  const handleChangeRef = (event, remove = "") => {
    if (!remove) {
      let fileName = event?.target?.files[0]
        ? event?.target?.files[0]?.name
        : "Add Profile Image";
      document.getElementById("fileName").textContent = fileName;
    } else {
      document.getElementById("fileName").textContent = "Add Profile Image";
    }
  };

  const designationRoles = [
    { label: "SuperVisor", value: "SuperVisor" },
    { label: "Contracter", value: "Contracter" },
    { label: "Chef", value: "Chef" },
    { label: "Support", value: "Support" },
  ];

  const departmentRoles = [
    { label: "Cooking", value: "Cooking" },
    { label: "EmployeeManage", value: "EmployeeManage" },
    { label: "Decoration", value: "Decoration" },
    { label: "Stalls", value: "Stalls" },
  ];

  const digitsOnly = (value) => /^\d+$/.test(value);
  const handleZipCode = (e) => {
    if (e.target.value.length === 6 && /^\d+$/.test(e.target.value)) {
      dispatch(staffenrollPincodeData(e.target.value));
    }
  };
  const validateEmail = (email) => {
    return Yup.string().email().isValidSync(email);
  };
  const SigninSchema = Yup.object().shape({
    firstname: Yup.string().required("Please enter first name."),
    lastname: Yup.string().required("Please enter last name"),
    employeeid: Yup.string().required("Please enter employee id"),
    mobileno: Yup.string()
    .required("Please enter mobile number")
    .test([Yup.ref("zipcode")], "Please enter numbers only", digitsOnly)
    .min(10, 'Please enter valid mobile number'),

    email: Yup.string()
    .required("Please enter email id")
    .test("email", "Invalid email!", (value) => {
      return validateEmail(value);
    }),
    
    department: Yup.string().required("Please enter department"),
    designation: Yup.string().required("Please enter designation"),
    password: Yup.string()
    .required("Please enter password")
    .min(7, "Password must be 8 or more characters"),

    zipcode: Yup.string()
      .required("Please enter zipcode")
      .test([Yup.ref("zipcode")], "Please enter numbers only", digitsOnly)
      .test(
        [Yup.ref("zipcode")],
        "Must be exactly 6 characters",
        (val) => val.length === 6
      ),
    addressline1: Yup.string().required("Please enter addressline1"),
    addressline2: Yup.string().required("Please enter addressline2"),
    state: Yup.string().required("Please enter state"),
    city: Yup.string().required("Please enter city"),
    country: Yup.string().required("Please enter country"),
    imgfile: Yup.string().required("Please upload imgfile"),
  });

  const handleFormSubmit = (values,{resetForm}) => {
    const allData = {...values , authKey}
    console.log("values", allData);
    dispatch(createUserRequest(allData));
    resetForm();
  };

  return (
    <Box className="addprofile-container">
      <Formik
        initialValues={{
          firstname: "",
          employeeid: "",
          email: "",
          designation: "",
          zipcode: "",
          addressline2: "",
          city: "",
          lastname: "",
          mobileno: "",
          department: "",
          password: "",
          addressline1: "",
          state: "",
          country: "",
          imgfile: "",
        }}
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
          setFieldValue,
          handleSubmit,
          resetForm
        }) => {
          return (
            <form className="addprofile-container" onSubmit={handleSubmit}>
              <Box className="addprofile-inputfieldbox">
                <Box className="addprofile-inputcontainer">
                  <Box className="addprofile-inputfieldarea">
                    <Field name="firstname">
                      {({ field }) => (
                        <FormControl
                          sx={customTextFieldStyles}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-firstname">
                            First Name*
                          </InputLabel>
                          <OutlinedInput
                            {...field}
                            name="firstname"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstname}
                            touched={touched.firstname}
                            error={
                              touched.firstname && Boolean(errors.firstname)
                            }
                            id="outlined-adornment-firstname"
                            label="First Name*"
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box className="addprofile-errorfieldarea validate-error-text">
                    {errors.firstname && touched.firstname ? (
                      <>{errors.firstname}</>
                    ) : null}
                  </Box>
                </Box>

                <Box className="addprofile-inputcontainer">
                  <Box className="addprofile-inputfieldarea">
                    <Field name="lastname">
                      {({ field }) => (
                        <FormControl
                          sx={customTextFieldStyles}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-lastnameaddress">
                            Last Name*
                          </InputLabel>
                          <OutlinedInput
                            {...field}
                            name="lastname"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastname}
                            touched={touched.lastname}
                            error={touched.lastname && Boolean(errors.lastname)}
                            id="outlined-adornment-lastnameaddress"
                            label="Last Name*"
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box className="addprofile-errorfieldarea validate-error-text">
                    {" "}
                    {errors.lastname && touched.lastname ? (
                      <>{errors.lastname}</>
                    ) : null}
                  </Box>
                </Box>
              </Box>
              <Box className="addprofile-inputfieldbox">
                <Box className="addprofile-inputcontainer">
                  <Box className="addprofile-inputfieldarea">
                    <Field name="employeeid">
                      {({ field }) => (
                        <FormControl
                          sx={customTextFieldStyles}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-employeeid">
                            employee ID*
                          </InputLabel>
                          <OutlinedInput
                            {...field}
                            name="employeeid"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.employeeid}
                            touched={touched.employeeid}
                            error={
                              touched.employeeid && Boolean(errors.employeeid)
                            }
                            id="outlined-adornment-employeeid"
                            label="employee ID*"
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box className="addprofile-errorfieldarea validate-error-text">
                    {errors.employeeid && touched.employeeid ? (
                      <>{errors.employeeid}</>
                    ) : null}
                  </Box>
                </Box>
                <Box className="addprofile-inputcontainer">
                  <Box className="addprofile-inputfieldarea">
                    <Field name="mobileno">
                      {({ field }) => (
                        <FormControl
                          sx={customTextFieldStyles}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-mobileno">
                            Mobile Number
                          </InputLabel>
                          <OutlinedInput
                            {...field}
                            name="mobileno"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            inputProps={{ maxLength: 10 }}
                            value={values.mobileno}
                            touched={touched.mobileno}
                            
                            error={touched.mobileno && Boolean(errors.mobileno)}
                            id="outlined-adornment-mobileno"
                            label="Mobile Number"
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box className="addprofile-errorfieldarea validate-error-text">
                    {errors.mobileno && touched.mobileno ? (
                      <>{errors.mobileno}</>
                    ) : null}
                  </Box>
                </Box>
              </Box>
              <Box className="addprofile-inputfieldbox">
                <Box className="addprofile-inputcontainer">
                  <Box className="addprofile-inputfieldarea">
                    <Field name="email">
                      {({ field }) => (
                        <FormControl
                          sx={customTextFieldStyles}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-email">
                            Email id*
                          </InputLabel>
                          <OutlinedInput
                            {...field}
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            touched={touched.email}
                            error={touched.email && Boolean(errors.email)}
                            id="outlined-adornment-email"
                            label="Email id*"
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box className="addprofile-errorfieldarea validate-error-text">
                    {errors.email && touched.email ? <>{errors.email}</> : null}
                  </Box>
                </Box>

                <Box className="addprofile-inputcontainer">
                  <Box className="addprofile-inputfieldarea">
                    <Field name="department">
                      {({ field }) => (
                        <Autocomplete
                          id="combo-box-demo"
                          options={departmentRoles}
                          sx={customTextFieldStyles}
                          onChange={(e, data) => {
                            setFieldValue(
                              "department",
                              data !== null ? data?.value : ""
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="department"
                              {...field}
                              onBlur={handleBlur}
                              value={values.department}
                              touched={touched.department}
                              error={
                                touched.department && Boolean(errors.department)
                              }
                              label="Department"
                            />
                          )}
                        />
                      )}
                    </Field>
                  </Box>
                  <Box className="addprofile-errorfieldarea validate-error-text">
                    {errors.department && touched.department ? (
                      <>{errors.department}</>
                    ) : null}
                  </Box>
                </Box>
              </Box>
              <Box className="addprofile-inputfieldbox">
                <Box className="addprofile-inputcontainer">
                  <Box className="addprofile-inputfieldarea">
                    <Field name="designation">
                      {({ field }) => (
                        <Autocomplete
                          id="combo-box-demo"
                          options={designationRoles}
                          sx={customTextFieldStyles}
                          onChange={(e, data) => {
                            setFieldValue(
                              "designation",
                              data !== null ? data?.value : ""
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="designation"
                              {...field}
                              onBlur={handleBlur}
                              value={values.designation}
                              touched={touched.designation}
                              error={
                                touched.designation &&
                                Boolean(errors.designation)
                              }
                              label="Designation"
                            />
                          )}
                        />
                      )}
                    </Field>
                  </Box>
                  <Box className="addprofile-errorfieldarea validate-error-text">
                    {errors.designation && touched.designation ? (
                      <>{errors.designation}</>
                    ) : null}
                  </Box>
                </Box>
                <Box className="addprofile-inputcontainer">
                  <Box className="addprofile-inputfieldarea">
                    <Field name="password">
                      {({ field }) => (
                        <FormControl
                          sx={customTextFieldStyles}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-password">
                            Password*
                          </InputLabel>
                          <OutlinedInput
                            {...field}
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            touched={touched.password}
                            error={touched.password && Boolean(errors.password)}
                            id="outlined-adornment-password"
                            label="Password*"
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box className="addprofile-errorfieldarea validate-error-text">
                    {errors.password && touched.password ? (
                      <>{errors.password}</>
                    ) : null}
                  </Box>
                </Box>
              </Box>
              <Box className="addprofile-inputfieldbox">
                <Box className="addprofile-inputcontainer">
                  <Box className="addprofile-inputfieldarea">
                    <Field name="zipcode">
                      {({ field }) => (
                        <FormControl
                          sx={customTextFieldStyles}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-zipcode">
                            Zip Code*
                          </InputLabel>
                          <OutlinedInput
                            {...field}
                            name="zipcode"
                            onChange={(e) => {
                              handleZipCode(e);
                              handleChange(e);
                            }}
                            onBlur={(e) => {
                              handleBlur(e);
                              setFieldValue(
                                "city",
                                livePinCode.city !== null
                                  ? livePinCode.city
                                  : values.city
                              );
                              setFieldValue(
                                "state",
                                livePinCode.state !== null
                                  ? livePinCode.state
                                  : values.state
                              );
                              setFieldValue(
                                "country",
                                livePinCode.country !== null
                                  ? livePinCode.country
                                  : values.country
                              );
                            }}
                            value={values.zipcode}
                            touched={touched.zipcode}
                            error={touched.zipcode && Boolean(errors.zipcode)}
                            id="outlined-adornment-zipcode"
                            label="Zip Code*"
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box className="addprofile-errorfieldarea validate-error-text">
                    {errors.zipcode && touched.zipcode ? (
                      <>{errors.zipcode}</>
                    ) : null}
                    {livePinCode.error !== "" && livePinCode.error}
                  </Box>
                </Box>
                <Box className="addprofile-inputcontainer">
                  <Box className="addprofile-inputfieldarea">
                    <Field name="addressline1">
                      {({ field }) => (
                        <FormControl
                          sx={customTextFieldStyles}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-addressline1">
                            Address Line 1*
                          </InputLabel>
                          <OutlinedInput
                            {...field}
                            name="addressline1"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.addressline1}
                            touched={touched.addressline1}
                            error={
                              touched.addressline1 &&
                              Boolean(errors.addressline1)
                            }
                            id="outlined-adornment-addressline1"
                            label="Address Line 1*"
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box className="addprofile-errorfieldarea validate-error-text">
                    {errors.addressline1 && touched.addressline1 ? (
                      <>{errors.addressline1}</>
                    ) : null}
                  </Box>
                </Box>
              </Box>
              <Box className="addprofile-inputfieldbox">
                <Box className="addprofile-inputcontainer">
                  <Box className="addprofile-inputfieldarea">
                    <Field name="addressline2">
                      {({ field }) => (
                        <FormControl
                          sx={customTextFieldStyles}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-addressline2">
                            Address Line 2*
                          </InputLabel>
                          <OutlinedInput
                            {...field}
                            name="addressline2"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.addressline2}
                            touched={touched.addressline2}
                            error={
                              touched.addressline2 &&
                              Boolean(errors.addressline2)
                            }
                            id="outlined-adornment-addressline2"
                            label="Address Line 2*"
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box className="addprofile-errorfieldarea validate-error-text">
                    {errors.addressline2 && touched.addressline2 ? (
                      <>{errors.addressline2}</>
                    ) : null}
                  </Box>
                </Box>
                <Box className="addprofile-inputcontainer">
                  <Box className="addprofile-inputfieldarea">
                    <Field name="state">
                      {({ field }) => (
                        <FormControl
                          sx={customTextFieldStyles}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-state">
                            State*
                          </InputLabel>
                          <OutlinedInput
                            {...field}
                            name="state"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={
                              livePinCode.state !== null
                                ? livePinCode.state
                                : values.state
                            }
                            touched={touched.state}
                            error={touched.state && Boolean(errors.state)}
                            id="outlined-adornment-state"
                            label="State*"
                             // inputProps={{ readOnly: true }}
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box className="addprofile-errorfieldarea validate-error-text">
                    {errors.state && touched.state ? <>{errors.state}</> : null}
                  </Box>
                </Box>
              </Box>
              <Box className="addprofile-inputfieldbox">
                <Box className="addprofile-inputcontainer">
                  <Box className="addprofile-inputfieldarea">
                    <Field name="city">
                      {({ field }) => (
                        <FormControl
                          sx={customTextFieldStyles}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-city">
                            City*
                          </InputLabel>
                          <OutlinedInput
                            {...field}
                            name="city"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={
                              livePinCode.city !== null
                                ? livePinCode.city
                                : values.city
                            }
                            touched={touched.city}
                            error={touched.city && Boolean(errors.city)}
                            id="outlined-adornment-city"
                            label="City*"
                            // inputProps={{ readOnly: true }}
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box className="addprofile-errorfieldarea validate-error-text">
                    {errors.city && touched.city ? <>{errors.city}</> : null}
                  </Box>
                </Box>
                <Box className="addprofile-inputcontainer">
                  <Box className="addprofile-inputfieldarea">
                    <Field name="country">
                      {({ field }) => (
                        <FormControl
                          sx={customTextFieldStyles}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-country">
                            Country*
                          </InputLabel>
                          <OutlinedInput
                            {...field}
                            name="country"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={
                              livePinCode.country !== null
                                ? livePinCode.country
                                : values.country
                            }
                            touched={touched.country}
                            error={touched.country && Boolean(errors.country)}
                            id="outlined-adornment-country"
                            label="Country*"
                             // inputProps={{ readOnly: true }}
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box className="addprofile-errorfieldarea validate-error-text">
                    {errors.country && touched.country ? (
                      <>{errors.country}</>
                    ) : null}
                  </Box>
                </Box>
              </Box>

              <Box className="addprofile-inputfieldbox">
                <Box className="addprofile-imagefieldbox">
                  <Box className="addprofile-inputfieldarea">
                    <Field name="imgfile">
                      {({ field }) => (
                        <div>
                          <div
                            className={`custom-file-upload ${
                              errors.imgfile &&
                              touched.imgfile &&
                              "error-fileupload"
                            }`}
                            {...field}
                          >
                            <label className="custom-label" {...field}>
                              <input
                                {...field}
                                name="imgfile"
                                type="file"
                                id="fileInput"
                                value={values.imgfile}
                                ref={fileInputRef}
                                onChange={(event) => {
                                  setFieldValue("imgfile", event.target.value);
                                  handleChangeRef(event);
                                }}
                              />
                              Choose File
                            </label>
                            <div
                              id="fileName"
                              className="addprofile-uploadfilename"
                            >
                              Add Profile Image
                            </div>
                          </div>
                          <div
                            {...field}
                            name="imgfile"
                            className="inputfile-deletefield"
                            onClick={(event) => {
                              setFieldValue("imgfile", "");
                              handleChangeRef(event, "delete");
                            }}
                          >
                            {values?.imgfile && "cancel"}
                          </div>
                        </div>
                      )}
                    </Field>
                  </Box>
                  <Box className="addprofile-errorfieldarea validate-error-text">
                    {errors.imgfile && touched.imgfile ? (
                      <>{errors.imgfile}</>
                    ) : null}
                  </Box>
                </Box>
              </Box>

              <Box className="addprofile-buttoncontainer">
                <Box className="button">
                  <CustomButton type="submit">Save</CustomButton>
                </Box>
              </Box>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};
export default StaffAddProfile;

import { API_METHODS } from "utils/common/httpcalls";

export const PLUGINS_API_END_POINTS = {
  auth: {
    login: { endpoint: "auth/login", method: API_METHODS.POST },
    forgotpassword: { endpoint: "auth/forgot-password", method: API_METHODS.POST },
    verifyotp: { endpoint: "auth/verify-otp", method: API_METHODS.POST },
    resetpassword: {
      endpoint: "auth/reset-password",
      method: API_METHODS.POST,
    },
  },
  register: {
    createuser: { endpoint: "users/create", method: API_METHODS.POST },
    getuser : {endpoint : "users/list" , method:API_METHODS.GET}
  },
};

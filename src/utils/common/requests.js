import axios from "axios";

const axiosRequest = async (
  url,
  method,
  data = null,
  headers = {},
  params = null,
  sorting = {}
) => {
  try {
    console.log('headers',headers);
    const response = await axios({
      url: url,
      method: method,
      data: data,
      headers: headers,
      params: params,
      sorting: sorting,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export default axiosRequest;

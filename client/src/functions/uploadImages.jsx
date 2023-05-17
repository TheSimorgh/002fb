import axios from "axios";
import { server_url } from "../App";

export const uploadImages = async (formData, path, token) => {
  try {
    const { data } = await axios.post(
      `${server_url}/uploadImages`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

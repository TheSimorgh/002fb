import axios from "axios";
import { server_url } from "../App";

export const updateprofilePicture = async (url, token) => {
  try {
    const { data } = await axios.put(
      `${server_url}/updateProfilePicture`,
      {
        url,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};
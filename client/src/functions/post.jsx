import axios from "axios";
import { server_url } from "../App";

/* eslint-disable no-unused-vars */
export const createPost=async(
    type,
    background,
    text,
    images,
    user,
    token
)=>{
try {
   const {data}=await axios.post(`${server_url}/createPost`, {
    type,
    background,
    text,
    images,
    user,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  ) 
  return { status: "ok", data };
    
} catch (error) {
    return error.response.data.message;

}
}


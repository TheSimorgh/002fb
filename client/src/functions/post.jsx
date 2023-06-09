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




export const postReact=async (postId,react,token)=>{

  try {
    const {data}=await axios.put(`${server_url}/postReact`, {
      postId,
      react,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    ) 
    return "ok";
  } catch (error) {
    return error.response.data.message;

  }

}

export const getReacts = async (postId, token) => {
  try {
    const { data } = await axios.get(
      `${server_url}/getReacts/${postId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};



export const comment = async (postId, comment, image, token) => {
  try {
    const { data } = await axios.put(
      `${server_url}/comment`,
      {
        postId,
        comment,
        image,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};


export const savePost = async (postId,token) => {  
  try {
    const { data } = await axios.put(
      `${server_url}/savePost/${postId}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
    
  } catch (error) {
    return error.response.data.message;
  }
};

export const deletePost = async (postId,token) => {  
  try {
    const { data } = await axios.put(
      `${server_url}/deletePost/${postId}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
    
  } catch (error) {
    return error.response.data.message;
  
  }
};
export const xxx = async () => {  
  try {
    
    console.log("1");
  } catch (error) {
    return error.response.data.message;
  }
};
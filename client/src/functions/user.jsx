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
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};

export const updateCover = async (url, token) => {  
  try {
    const { data } = await axios.put(
      `${server_url}/updateCover`,
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
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};



export const addFriend = async (id, token) => {  
  try {

    const { data } = await axios.put(
      `${server_url}/addFriend/${id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};
export const unFriend = async (id, token) => {  
  try {

    const { data } = await axios.put(
      `${server_url}/unfriend/${id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};
export const cancelRequest = async (id, token) => {  
  try {

    const { data } = await axios.put(
      `${server_url}/cancelRequest/${id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};
export const acceptRequest = async (id, token) => {  
  try {

    const { data } = await axios.put(
      `${server_url}/acceptRequest/${id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};
export const deleteRequest = async (id, token) => {  
  try {

    const { data } = await axios.put(
      `${server_url}/deleteRequest/${id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};
export const follow = async (id, token) => {  
  try {

    const { data } = await axios.put(
      `${server_url}/follow/${id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};
export const unFollow = async (id, token) => {  
  try {

    const { data } = await axios.put(
      `${server_url}/unfollow/${id}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
    
  }
};


export const search = async (searchTerm,token) => {  
  try {

    const { data } = await axios.post(
      `${server_url}/search/${searchTerm}`,
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


export const addToSearchHistory = async (searchUser,token) => {  
  try {

    const { data } = await axios.put(
      `${server_url}/addToSearchHistory`,
      {searchUser},

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
export const getSearchHistory = async (token) => {
  try {
    const { data } = await axios.get(
      `${server_url}/getSearchHistory`,

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

export const removeFromSearch = async (searchUser,token) => {  
  try {
    const { data } = await axios.put(
      `${server_url}/removeFromSearch`,
      {searchUser},
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

export const getFriendsPageInfos = async (token) => {
  try {
    const { data } = await axios.get(
      `${server_url}/getFriendsPageInfos`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: "ok", data };
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
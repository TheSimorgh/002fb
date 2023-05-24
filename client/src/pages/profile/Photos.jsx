/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { server_url } from "../../App";
import { useNavigate } from "react-router-dom";
import { photosReducer } from "../../functions/reducers";

const Photos = ({ username, token }) => {
  const navigate = useNavigate();
  const [info,setInfo]=useState({})
  const [{ loading, error, photos }, dispatch] = useReducer(photosReducer, {
    loading: false,
    photos: {},
    error: "",
  });

  useEffect(() => {
    getPhotos();
  }, [username]);
  const path=`${username}/*`;
  const max=30;
  const sort="desc";

  
  async function getPhotos() {
    try {
      dispatch({
        type: "PHOTOS_REQUEST",
      });

      const { data } = await axios.post(`${server_url}/listImages`,
      {path,sort,max},
       {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.ok === false) {navigate("/profile");}
      console.log("PHOTOS_REQUEST Data");
      console.log(data);
      dispatch({ type: "PHOTOS_SUCCESS", payload: data });
      setInfo(data)
    } catch (error) {
      dispatch({type: "PHOTOS_ERROR",payload: error.response.data.message,});
    }
  }
  console.log("photos");
  console.log(photos);
  console.log(`Photos ===> ${photos}`);
  console.log(info);


  return (
    <div className="profile_card">
      <div className="profile_card_header">
        Photos
        <div className="profile_header_link">See all photos</div>
      </div>
      <div className="profile_card_count">
        {photos.total_count === 0
          ? ""
          : photos.total_count === 1
          ? "1 Photo"
          : `${photos.total_count} photos`}
      </div>
      <div className="profile_card_grid">
        {photos.resources &&
          photos.resources.slice(0, 9).map((img) => (
            <div className="profile_photo_card" key={img.public_id}>
              <img src={img.secure_url} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Photos;

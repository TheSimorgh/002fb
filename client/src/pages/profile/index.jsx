/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { useMediaQuery } from "react-responsive";
import { HashLoader } from "react-spinners";
import { useEffect, useReducer } from "react";
import { profileReducer } from "../../functions/reducers";
import { server_url } from "../../App";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  var userName = username === undefined ? user?.username : username;
  console.log(user);
  console.log(username);
  console.log(userName);

  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: "",
  });

  useEffect(() => {
    getProfile();
  }, [userName]);
  async function getProfile() {
    try {
      dispatch({
        type: "PROFILE_REQUEST",
      });
 
      const { data } = await axios.get(`${server_url}/getProfile/${userName}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if(data.ok===false){
        navigate("/profile")
      }
      dispatch({ type: "PROFILE_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
        payload: error.response.data.message,
      });
    }
  }
  console.log(profile);
  return (
<>
<div>
      Profile {userName} || {user.first_name}{" "}

    </div>
          <span>
          || {JSON.stringify(profile,0,null)}
         </span>
</>
  );
};

export default Profile;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

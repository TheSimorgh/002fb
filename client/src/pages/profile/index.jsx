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
import { Header } from "../../components";
import Cover from "./Cover";

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
  const {cover}=profile
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
      if (data.ok === false) {
        navigate("/profile");
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
      <div className="profile">
        <Header page={`profile`} />
        <div className="profile_top">
          <div className="profile_container">
            <Cover cover={cover} />
          </div>
        </div>
        <div className="profile_bottom"></div>
      </div>
    </>
  );
};

export default Profile;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

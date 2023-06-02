/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { useMediaQuery } from "react-responsive";
import { HashLoader } from "react-spinners";
import { useEffect, useReducer, useRef, useState } from "react";
import { profileReducer } from "../../functions/reducers";
import { server_url } from "../../App";
import { CreatePost, Header, Post } from "../../components";
import Cover from "./Cover";
import ProfilePicInfo from "./ProfilePicInfo";
import ProfileMenu from "./ProfileMenu";
import PlpUMayKnow from "./PlpUMayKnow";
import GridPosts from "./GridPosts";
import Photo from "./Photos";
import Photos from "./Photos";
import Friends from "./Friends";

const Profile = ({ setVisible }) => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  var userName = username === undefined ? user?.username : username;
  var visitor = userName === user.username ? false : true;

  const [photos, setPhotos] = useState({});
  console.log(user);
  console.log(username);
  console.log(userName);
const pRef=useRef(null)
  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: "",
  });
  const { cover } = profile;
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
  console.log("profile");
  console.log(profile);
  console.log(cover);
  console.log("visitor");
  console.log(visitor);

  return (
    <>
      <div className="profile">
        <Header page={`profile`} />
        <div className="profile_top">
          <div className="profile_container">
            <Cover cover={profile?.cover} visitor={visitor} />
            <ProfilePicInfo profile={profile} visitor={visitor} />
            <ProfileMenu />
          </div>
        </div>
        <div className="profile_bottom">
          <div className="profile_container">
            <div className="bottom_container">
              <PlpUMayKnow />
              <div className="profile_grid">
                <div className="profile_left">
                  <Photos username={userName} toke={user.token} />
                  <Friends friends={profile.friends} />
                  <div className="relative_fb_copyright">
                    <Link to="/">Privacy </Link>
                    <span>. </span>
                    <Link to="/">Terms </Link>
                    <span>. </span>
                    <Link to="/">Advertising </Link>
                    <span>. </span>
                    <Link to="/">
                      Ad Choices <i className="ad_choices_icon"></i>{" "}
                    </Link>
                    <span>. </span>
                    <Link to="/"></Link>Cookies <span>. </span>
                    <Link to="/">More </Link>
                    <span>. </span> <br />
                    Meta © 2022
                  </div>
                </div>
                <div className="profile_right">
                  {!visitor ? (
                    <CreatePost
                      user={user}
                      profile={profile}
                      setVisible={setVisible}
                    />
                  ) : null}

                  <GridPosts />
                  <div className="posts">
                    {profile?.posts && profile?.posts?.length ? (
                      profile?.posts.map((post) => (
                        <Post
                          post={post}
                          user={user}
                          profile={profile}
                          key={post._id}
                        />
                      ))
                    ) : (
                      <div className="no_posts">No posts available</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

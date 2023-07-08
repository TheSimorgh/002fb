/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import "./style.css";
import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CreatePost, Header, Intro, Post } from "../../components";
import { server_url } from "../../App";
import { profileReducer } from "../../functions/reducers";
import CreatePostPopup from "../../components/create_post_popup";
import PeopleUMayKnow from "./PeopleUMayKnow";
import ProfileMenu from "./ProfileMenu";
import Cover from "./Cover";
import ProfilePicturesInfos from "./ProfilePicturesInfos";
import GridPosts from "./GridPosts";
import { HashLoader } from "react-spinners";
import { Photo } from "../../svg";
import Photos from "./Photos";
import Friends from "./Friends";
import { useMediaQuery } from "react-responsive";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const Profile = ({ getAllPosts, posts }) => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const userName = username === undefined ? user.username : username;
  const [othername, setOthername] = useState(false);
  const [visible, setVisible] = useState();

  const [photos, setPhotos] = useState({});
  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: "",
  });
  let visitor = userName === user.username ? false : true;
  console.log(`Visitor: ${visitor}`);
  console.log(`Photos: ${photos}`);
  console.log(photos);
  const path = `${userName}/*`;
  const max = 30;
  const sort = "desc";
  async function getProfile() {
    try {
      dispatch({ type: "PROFILE_REQUEST" });

      const { data } = await axios.get(`${server_url}/getProfile/${userName}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (data.ok === false) {
        navigate("/profile");
      } else {
        try {
          const images = await axios.post(
            `${server_url}/listImages`,
            { path, sort, max },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setPhotos(images.data);
        } catch (error) {
          console.log(error);
        }
        dispatch({ type: "PROFILE_SUCCESS", payload: data });
      }
    } catch (error) {
      dispatch({ type: "PROFILE_ERROR", payload: error.response.data.message });
    }
  }
  useEffect(() => {
    getProfile();
    console.log("profile");
    console.log(profile);
    console.log(userName, username);
    console.log("Friends");
    console.log(profile?.friends);
  }, [userName]);
  useEffect(() => {
    setOthername(profile?.details?.otherName);
  }, [profile]);
  // useEffect(() => {
  // }, [user.picture]);
  // console.log(photos);
  const profileTop = useRef(null);
  const leftSide = useRef(null);
  const [height, setHeight] = useState();
  const [leftHeight, setLeftHeight] = useState();
  const [scrollHeight, setScrollHeight] = useState();
  useEffect(() => {
    setHeight(profileTop.current.clientHeight + 300);
    setLeftHeight(leftSide.current.clientHeight);
    window.addEventListener("scroll", getScroll, { passive: true });
    return () => {
      window.addEventListener("scroll", getScroll, { passive: true });
    };
  }, [loading, scrollHeight]);
  const check = useMediaQuery({
    query: "(min-width:901px)",
  });
  const getScroll = () => {
    setScrollHeight(window.pageYOffset);
  };
  console.log(scrollHeight);
  console.log(user);
  console.log(profile);

  return (
    <div className="profile">
      {visible && (
        <CreatePostPopup
          user={user}
          setVisible={setVisible}
          dispatch={dispatch}
          posts={profile?.posts}
          profile
        />
      )}

      <Header page="profile" getAllPosts={getAllPosts} />
      <div className="profile_top" ref={profileTop}>
      <div className="profile_container">
          {loading ? (
            <>
              <div className="profile_cover">
                <Skeleton
                  height="347px"
                  containerClassName="avatar-skeleton"
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div
                className="profile_img_wrap"
                style={{
                  marginBottom: "-3rem",
                  transform: "translateY(-8px)",
                }}
              >
                <div className="profile_w_left">
                  <Skeleton
                    circle
                    height="180px"
                    width="180px"
                    containerClassName="avatar-skeleton"
                    style={{ transform: "translateY(-3.3rem)" }}
                  />
                  <div className="profile_w_col">
                    <div className="profile_name">
                      <Skeleton
                        height="35px"
                        width="200px"
                        containerClassName="avatar-skeleton"
                      />
                      <Skeleton
                        height="30px"
                        width="100px"
                        containerClassName="avatar-skeleton"
                        style={{ transform: "translateY(2.5px)" }}
                      />
                    </div>
                    <div className="profile_friend_count">
                      <Skeleton
                        height="20px"
                        width="90px"
                        containerClassName="avatar-skeleton"
                        style={{ marginTop: "5px" }}
                      />
                    </div>
                    <div className="profile_friend_imgs">
                      {Array.from(new Array(6), (val, i) => i + 1).map(
                        (id, i) => (
                          <Skeleton
                            key={i}
                            circle
                            height="32px"
                            width="32px"
                            containerClassName="avatar-skeleton"
                            style={{ transform: `translateX(${-i * 7}px)` }}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className={`friendship ${!visitor && "fix"}`}>
                  <Skeleton
                    height="36px"
                    width={120}
                    containerClassName="avatar-skeleton"
                  />
                  <div className="flex">
                    <Skeleton
                      height="36px"
                      width={120}
                      containerClassName="avatar-skeleton"
                    />
                    {visitor && (
                      <Skeleton
                        height="36px"
                        width={120}
                        containerClassName="avatar-skeleton"
                      />
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Cover
                cover={profile.cover}
                visitor={visitor}
                photos={photos.resources}
              />
              <ProfilePicturesInfos
                profile={profile}
                visitor={visitor}
                photos={photos.resources}
                othername={othername}
                loading={loading}
              />
            </>
          )}

          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PeopleUMayKnow />

            <div
              className={`profile_grid
               ${
                 check && scrollHeight >= height && leftHeight > 1000
                   ? "scrollFixed showLess"
                   : check &&
                     scrollHeight >= height &&
                     leftHeight < 1000 &&
                     "scrollFixed showMore"
               }
              `}
            >
              <div className="profile_left" ref={leftSide}>
                {loading ? (
                  <>
                    <div className="profile_card">
                      <div className="profile_card_header">Intro</div>
                      <div className="sekelton_loader">
                        <HashLoader color="#1876f2" />
                      </div>
                    </div>
                    <div className="profile_card">
                      <div className="profile_card_header">
                        Photos
                        <div className="profile_header_link">
                          See all photos
                        </div>
                      </div>
                      <div className="sekelton_loader">
                        <HashLoader color="#1876f2" />
                      </div>
                    </div>
                    <div className="profile_card">
                      <div className="profile_card_header">
                        Friends
                        <div className="profile_header_link">
                          See all friends
                        </div>
                      </div>
                      <div className="sekelton_loader">
                        <HashLoader color="#1876f2" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Intro
                      detailss={profile.details}
                      visitor={visitor}
                      setOthername={setOthername}
                    />
                    <Photos
                      username={userName}
                      token={user.token}
                      photos={photos}
                    />
                    <Friends friends={profile?.friends} />
                  </>
                )}
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
                {!visitor && (
                  <CreatePost user={user} profile setVisible={setVisible} />
                )}
                <GridPosts />
                {loading ? (
                  <div className="sekelton_loader">
                    <HashLoader color="#1876f2" />
                  </div>
                ) : (
                  <div className="posts">
                    {profile?.posts && profile?.posts?.length ? (
                      profile?.posts.map((post) => (
                        <Post
                          post={post}
                          user={user}
                          key={post._id}
                          profile={profile}
                        />
                      )).reverse()
                    ) : (
                      <div className="no_posts">No posts available</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

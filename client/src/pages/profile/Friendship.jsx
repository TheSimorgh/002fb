/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useOutlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  acceptRequest,
  addFriend,
  cancelRequest,
  deleteRequest,
  follow,
  unFollow,
  unFriend,
} from "../../functions/user";
import useClickOutside from "../../helpers/clickOutside";

const Friendship = ({ friendshipp, profileid }) => {
  const { user } = useSelector((state) => state.user);
  const [friendship, setFriendship] = useState(friendshipp);
  const [friendsMenu, setFriendsMenu] = useState(true);
  const [respondMenu, setRespondMenu] = useState(false);
  const menu = useRef(null);
  const menu1 = useRef(null);

  useClickOutside(menu,  () => setFriendsMenu(false));
  useClickOutside(menu1, () => setRespondMenu(false));
  useEffect(() => {
    setFriendship(friendshipp);
  }, [friendshipp]);

  const addFriendHandler = async () => {
    setFriendship({ ...friendship, requestSent: true, following: true });
    await addFriend(profileid, user.token);
  };

  const unFriendHandler = async () => {
    setFriendship({
      ...friendship,
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    });
    await unFriend(profileid, user.token);
  };

  const acceptReqHandler = async () => {
    setFriendship({
      ...friendship,
      friends: true,
      following: true,
      requestSent: false,
      requestReceived: false,
    });
    await acceptRequest(profileid, user.token);
  };

  const cancelReqHandelr = async () => {
    setFriendship({ ...friendship, requestSent: false, following: false });
    await cancelRequest(profileid, user.token);
  };

  const delReqHandler = async () => {
    setFriendship({
      ...friendship,
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    });
    await deleteRequest(profileid, user.token);
  };

  const followHandler = async () => {
    setFriendship({ ...friendship, following: true });
    await follow(profileid, user.token);
  };

  const unfollowHandler = async () => {
    setFriendship({ ...friendship, following: false });
    await unFollow(profileid, user.token);
  };

  return (
    <div className="friendship">
      {friendship?.friends ? (
        <div className="friends_menu_wrap">
          <button className="gray_btn" onClick={() => setFriendsMenu(true)}>
            <img src="/icons/friends.png" alt="" />
            <span>Friends</span>
          </button>
          {friendsMenu && (
            <div className="open_cover_menu" ref={menu}>
              <div className="open_cover_menu_item hover1">
                <img src="/icons/favoritesOutline.png" alt="" />
                Favorites
              </div>
              <div className="open_cover_menu_item hover1">
                <img src="/icons/editFriends.png" alt="" />
                Edit Friend list
              </div>
              {friendship?.following ? (
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => unfollowHandler()}
                >
                  <img src="/icons/unfollowOutlined.png" alt="" />
                  Unfollow
                </div>
              ) : (
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => followHandler()}
                >
                  <img src="/icons/unfollowOutlined.png" alt="" />
                  Follow
                </div>
              )}
              <div
                className="open_cover_menu_item hover1"
                onClick={() => unFriendHandler()}
              >
                <i className="unfriend_outlined_icon"></i>
                Unfriend
              </div>
            </div>
          )}
        </div>
      ) : (
        !friendship?.requestSent &&
        !friendship?.requestReceived && (
          <button className="blue_btn" onClick={() => addFriendHandler()}>
            <img src="/icons/addFriend.png" alt="" className="invert" />
            <span>Add Friend</span>
          </button>
        )
      )}
           {friendship?.requestSent ? (
        <button className="blue_btn" onClick={() => cancelReqHandelr()}>
          <img
            src="/icons/cancelRequest.png"
            className="invert"
            alt=""
          />
          <span>Cancel Request</span>
        </button>
      ) : (
        friendship?.requestReceived && (
          <div className="friends_menu_wrap">
            <button className="gray_btn" onClick={() => setRespondMenu(true)}>
              <img src="/icons/friends.png" alt="" />
              <span>Respond</span>
            </button>
            {respondMenu && (
              <div className="open_cover_menu" ref={menu1}>
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => acceptReqHandler()}
                >
                  Confirm
                </div>
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => delReqHandler()}
                >
                  Delete
                </div>
              </div>
            )}
          </div>
        )
      )}
      <div className="flex">
        {friendship?.following ? (
          <button className="gray_btn" onClick={() => unfollowHandler()}>
            <img src="/icons/follow.png" alt="" />
            <span>Following</span>
          </button>
        ) : (
          <button className="blue_btn" onClick={() => followHandler()}>
            <img src="/icons/follow.png" className="invert" alt="" />
            <span>Follow</span>
          </button>
        )}
        <button className={friendship?.friends ? "blue_btn" : "gray_btn"}>
          <img
            src="/icons/message.png"
            className={friendship?.friends && "invert"}
            alt=""
          />
          <span>Message</span>
        </button>
      </div>
    </div>
  );
};

export default Friendship;

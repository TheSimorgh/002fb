


/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { server_url } from "../../App";
import { Link, useNavigate } from "react-router-dom";

const Friends = ({ friends }) => {
  console.log("friends");

 console.log(friends);

  return (
    <div className="profile_card">
      <div className="profile_card_header">
        Friends
        <div className="profile_header_link">See all friends</div>
      </div>
      {friends && (
        <div className="profile_card_count">
          {friends.length === 0
            ? ""
            : friends.length === 1
            ? "1 Friend"
            : `${friends.length} Friends`}
        </div>
      )}
      <div className="profile_card_grid">
        {friends &&
          friends.slice(0, 9).map((friend, i) => (
            <Link
              to={`/profile/${friend.username}`}
              className="profile_photo_card"
              key={i}
            >
              <img src={friend.picture} alt="" />
              <span>
                {friend.first_name} {friend.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Friends;

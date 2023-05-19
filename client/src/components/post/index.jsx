import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Moment from "react-moment";
import { useEffect, useRef, useState } from "react";
import { Dots, Public } from "../../svg";
import ReactsPopup from "./ReactsPopup";

const Post = ({ post, user }) => {
  const [reacts, setReacts] = useState();
  const [visible, setVisible] = useState(false);

  const total = 5;
  const comments = [1, 2, 35, 5, 7, 8];


  const reactHandler=()=>{}
  return (
    <div className="post">
      <div className="post_header">
        <Link
          to={`/profile/${post.user.username}`}
          className="post_header_left"
        >
          <img src={post.user.picture} alt="" />
          <div className="header_col">
            <div className="post_profile_name">
              {post.user.first_name} {post.user.last_name}
              <div className="updated_p">
                {post.type == "profilePicture" &&
                  `updated ${
                    post.user.gender === "male" ? "his" : "her"
                  } profile picture`}
                {post.type == "coverPicture" &&
                  `updated ${
                    post.user.gender === "male" ? "his" : "her"
                  } cover picture`}
              </div>
            </div>
            <div className="post_profile_privacy_date">
              <Moment fromNow interval={30}>
                {post.createdAt}
              </Moment>
              . <Public color="#828387" />
            </div>
          </div>
        </Link>
        <div className="post_header_right hover1">
          <Dots color="#828387" />
        </div>
      </div>
      {post.background ? (
        <div
          className="post_bg"
          style={{ backgroundImage: `url(${post.background})` }}
        >
          <div className="post_bg_text">{post.text}</div>
        </div>
      ) : (
        <>
          <div className="post_text">{post.text}</div>
        </>
      )}
      <div className="post_infos">
        <div className="reacts_count">
          <div className="reacts_count_imgs">
            {reacts &&
              reacts
                .sort((a, b) => {
                  return b.count - a.count;
                })
                .slice(0, 3)
                .map(
                  (react, i) =>
                    react.count > 0 && (
                      <img
                        src={`../../../reacts/${react.react}.svg`}
                        alt=""
                        key={i}
                      />
                    )
                )}
          </div>
          <div className="reacts_count_num">{total > 0 && total}</div>
        </div>
        <div className="to_right">
          <div className="comments_count">{comments.length} comments</div>
          <div className="share_count">0 share</div>
        </div>
      </div>

      <div className="post_actions">
        <ReactsPopup visible={visible} setVisible={setVisible} reactHandler={reactHandler} />
        <div
          className="post_action hover1"
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
          ></div>
         <i className="like_icon"></i>
          <span>Like</span>
      </div>
      <div className="post_action hover1">
          <i className="comment_icon"></i>
          <span>Comment</span>
        </div>
        <div className="post_action hover1">
          <i className="share_icon"></i>
          <span>Share</span>
        </div>
    </div>
  );
};

export default Post;

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

import { useEffect, useRef, useState } from "react";
import { Dots, Public } from "../../svg";
import ReactsPopup from "./ReactsPopup";
import Moment from "react-moment";
import CreateComment from "./CreateComment";
import Comment from "./Comment";
import PostMenu from "./PostMenu";

const Post = ({ post, user,profile }) => {
  const [reacts, setReacts] = useState();
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [count, setCount] = useState(1);
  const total = 5;
  const comments = [1, 2, 35, 5, 7, 8];
  const [checkSaved, setCheckSaved] = useState(true);
  const postRef = useRef(null);

  const reactHandler = () => {};
  console.log("post");
  console.log(post);
  return (
    <div className="post"   style={{ width: `${profile && "100%"}` }}>
      <div className="post_header">
        <Link
          to={`/profile/${post?.user?.username}`}
          className="post_header_left"
        >
          <img src={post?.user?.picture} alt="" />
          <div className="header_col">
            <div className="post_profile_name">
              {post?.user?.first_name} {post?.user?.last_name}
              <div className="updated_p">
                {post?.type == "profilePicture" &&
                  `updated ${
                    post?.user?.gender === "male" ? "his" : "her"
                  } profile picture`}
                {post?.type == "coverPicture" &&
                  `updated ${
                    post?.user?.gender === "male" ? "his" : "her"
                  } cover picture`}
              </div>
            </div>
            <div className="post_profile_privacy_date">
              <Moment fromNow interval={30}>
                {post?.createdAt}
              </Moment>
              . <Public color="#828387" />
            </div>
          </div>
        </Link>
        <div
          className="post_header_right hover1"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <Dots color="#828387" />
        </div>
      </div>
      {post?.background ? (
        <div
          className="post_bg"
          style={{ backgroundImage: `url(${post?.background})` }}
        >
          <div className="post_bg_text">{post?.text}</div>
        </div>
      ) : post.type === null ? (
        <>
          <div className="post_text">{post?.text}</div>
          {post?.images && post?.images?.length && (
            <div
              className={
                post?.images?.length === 1
                  ? "grid_1"
                  : post?.images?.length === 2
                  ? "grid_2"
                  : post?.images?.length === 3
                  ? "grid_3"
                  : post.images.length === 4
                  ? "grid_4"
                  : post?.images?.length >= 5 && "grid_5"
              }
            >
              {post?.images.slice(0, 5).map((image, i) => (
                <img src={image.url} key={i} alt="" className={`img-${i}`} />
              ))}
              {post?.images?.length > 5 && (
                <div className="more-pics-shadow">
                  +{post?.images?.length - 5}
                </div>
              )}
            </div>
          )}
        </>
      ) : post.type === "profilePicture" ? (
        <div className="post_profile_wrap">
          <div className="post_updated_bg">
            <img src={post.user.cover} alt="" />
          </div>
          <img
            src={post.images[0].url}
            alt=""
            className="post_updated_picture"
          />
        </div>
      ) : (
        <div className="post_cover_wrap">
          <img src={post.images[0].url} alt="" />
        </div>
      ) }

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
                      <img src={`/reacts/${react?.react}.svg`} alt="" key={i} />
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
        <ReactsPopup
          visible={visible}
          setVisible={setVisible}
          reactHandler={reactHandler}
        />
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
          // onClick={() => reactHandler(check ? check : "like")}
        >
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

      <div className="comments_wrap">
        <div className="comments_order"> </div>
        <CreateComment user={user} />

        {comments &&
          // comments.sort((a,b)=>{return new Date(b.commentAt)-new Date(a.commentAt)})
          comments
            .slice(0, count)
            .map((comment, i) => <Comment comment={comment} key={i} />)}
      </div>
      {showMenu && (
        <PostMenu
          userId={user.id}
          postUserId={post.user._id}
          imagesLength={post?.images?.length}
          setShowMenu={setShowMenu}
          postId={post._id}
          token={user.token}
          checkSaved={checkSaved}
          setCheckSaved={setCheckSaved}
          images={post.images}
          postRef={postRef}
        />
      )}
    </div>
  );
};

export default Post;

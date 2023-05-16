/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import Picker from "emoji-picker-react";
import useClickOutside from "../../helpers/clickOutside";
import AddToYourPost from "./AddToYourPost";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";
import ImagePreview from "./ImagePreview";
const CreatePostPopup = ({
  user,
  // setVisible,
  // posts,
  // dispatch,
  // profile,
}) => {
  const popup = useRef(null);
  const [text, setText] = useState("");
  const [visible, setVisible] = useState(true);
  const [showPrev, setShowPrev] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");

  useClickOutside(popup, () => {
    setVisible(false);
  });

  return (
    <div className="blur">
      <div className="postBox" ref={popup}>
        <div className="box_header">
          <div
            className="small_circle"
            onClick={() => {
              setVisible(false);
            }}
          >
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className="box_profile">
          <img src={user.picture} alt="" className="box_profile_img" />
          <div className="box_col">
            <div className="box_profile_name">
              {user.first_name} {user.last_name}
            </div>
            <div className="box_privacy">
              <img src="../../../icons/public.png" alt="" />
              <span>Public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>
        {!showPrev ? (
          <>
            <EmojiPickerBackgrounds  setBackground={setBackground}background={background} user={user} setText={setText} text={text} />
          </>
        ) : (
          <ImagePreview text={text}
          user={user}
          setText={setText}
          showPrev={showPrev}
          images={images}
          setImages={setImages}
          setShowPrev={setShowPrev}
          setError={setError} 
                     setBackground={setBackground}
              background={background} />
        )}
        <AddToYourPost setShowPrev={setShowPrev} />
        <button className="post_submit">Post</button>
      </div>
    </div>
  );
};

export default CreatePostPopup;

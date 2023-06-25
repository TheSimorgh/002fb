/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import { useMediaQuery } from "react-responsive";



const EmojiPickerBackgrounds = ({ text, setText, user, type2,  background,
  setBackground, }) => {
  const [picker, setPicker] = useState(false);
  const textRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState(null);
  const [showBgs, setShowBgs] = useState(false);
  const bgRef = useRef(null);

  // const postBackgrounds=[pic1,pic2,pic3,pic4,pic5,pic6,pic7,pic8,pic9,]
  const postBackgrounds=["./images/postBackgrounds/1.jpg",
  "./images/postBackgrounds/2.jpg",
  "./images/postBackgrounds/3.jpg",
  "./images/postBackgrounds/4.jpg",
  "./images/postBackgrounds/5.jpg",
  "./images/postBackgrounds/6.jpg",
  "./images/postBackgrounds/7.jpg",
  "./images/postBackgrounds/8.jpg",
  "./images/postBackgrounds/9.jpg"]
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  // useEffect(()=>{},[picker])

  const handleEmoji = ({ emoji }, e) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };


  const backgroundHanlder=(i)=>{
    bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
    setBackground(postBackgrounds[i]);
    bgRef.current.classList.add("bgHandler");
  }
  const removeBackground = () => {
    bgRef.current.style.backgroundImage = "";
    setBackground("");
    bgRef.current.classList.remove("bgHandler");
  };
  const sm = useMediaQuery({
    query: "(max-width:550px)",
  });
  return (
    <div className={type2 ? "images_input" : ""}>
      <div className={!type2 ? "flex_center" : "" } ref={bgRef}>
        <textarea
          maxLength="250"
          ref={textRef}
          value={text}
          placeholder={`What is on your mind,  ${user.first_name}`}
          className={`post_input ${type2 ? "input2" : ""} ${
            sm && !background && "l0"
          }`}
          onChange={(e) => setText(e.target.value)}
          style={{
            paddingTop: `${
              background
                ? Math.abs(textRef.current.value.length * 0.1 - 32)
                : "0"
            }%`,
          }}
        ></textarea>
      </div>
      <div className={!type2 ? "post_emojis_wrap" : ""}>
        {picker ? (
          <div
            className={`comment_emoji_picker ${
              type2 ? "movepicker2" : "rlmove"
            }`}
          >
            <Picker onEmojiClick={handleEmoji} />
          </div>
        ) : null}
        {!type2 ? (
          <img
            src="../../../icons/colorful.png"
            alt=""
            onClick={() => {
             setShowBgs((prev) => !prev);
           }}
          />
        ) : null}


        {!type2 && showBgs ?  (<div className="post_backgrounds" >
        <div
              className="no_bg"
              onClick={() => {
                removeBackground();
              }}
            ></div>
           {postBackgrounds.map((e,i)=>(
            <img src={e}  key={i}  
            onClick={() => {
              backgroundHanlder(i);
            }}
            />
           ))}
        
        </div>):null }
        <i
          className={`emoji_icon_large ${type2 ? "moveleft" : ""}`}
          onClick={() => {
            setPicker((prev) => !prev);
          }}
        ></i>
      </div>
    </div>
  );
};

export default EmojiPickerBackgrounds;

/* eslint-disable react/prop-types */
import React,{useEffect, useRef, useState} from "react";
import "./style.css";
import Picker from "emoji-picker-react";
import useClickOutside from "../../helpers/clickOutside";
import AddToYourPost from "./AddToYourPost";

const CreatePostPopup = ({ user,
    // setVisible,
    // posts,
    // dispatch,
    // profile,
}) => {
    const popup = useRef(null);
    const [text, setText] = useState("");
    const [visible, setVisible] = useState(true);
    const [picker, setPicker] = useState(false);
    const textRef = useRef(null);
    const [cursorPosition,setCursorPosition]=useState()
    const [showPrev, setShowPrev] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [images, setImages] = useState([]);
    const [background, setBackground] = useState("");

    useEffect(()=>{
      textRef.current.selectionEnd=cursorPosition
    },[cursorPosition])
    useClickOutside(popup, () => {
        setVisible(false);
      });
      const handleEmoji=({emoji},e)=>{
        const ref=textRef.current;
        ref.focus();
        const start =text.substring(0,ref.selectionStart);
        const end =text.substring(ref.selectionStart);
        const newText=start+emoji+end;
        setText(newText);
        setCursorPosition(start.length+emoji.length)
      }
  return (
    <div className="blur" >
      <div className="postBox" ref={popup}>
        <div className="box_header">
          <div  className="small_circle"  onClick={() => {
              setVisible(false);
            }}>
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
            <div className="flex_center">
            <textarea maxLength="100"
            ref={textRef}
            value={text}
            placeholder={`What is on your mind,  ${user.first_name}`}
           className="post_input"
           onChange={(e)=>setText(e.target.value)}
           
           ></textarea>
            </div>
            </>
        ):(2)}
        <div className="post_emojis_wrap" >
         {picker ?  <div className="comment_emoji_picker rlmove" >
            <Picker onEmojiClick={handleEmoji} />
          </div> :null}
          <img
            src="../../../icons/colorful.png"
            alt=""
            // onClick={() => {
            //   setShowBgs((prev) => !prev);
            // }}
          />
          <i className="emoji_icon_large" 
               onClick={() => {
             setPicker((prev) => !prev);
             }}
          ></i>
        </div>
        <AddToYourPost setShowPrev={setShowPrev}/>
      </div>
    </div>
  );
};

export default CreatePostPopup;

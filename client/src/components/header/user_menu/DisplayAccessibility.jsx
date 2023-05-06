/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { darkTheme_false, darkTheme_true } from "../../../reducer/features/themeSlice";
import { useEffect, useState } from "react";
const DisplayAccessibility =({ setVisible }) =>{
  const dispatch = useDispatch();
  const { darkTheme } = useSelector((state) => (state.theme));
  useEffect(()=>{console.log(darkTheme);
  },[darkTheme])
  // const [message, setMessage] = useState('');
  // const handleChange = event => {
  //   setMessage(event.target.value);

  //   // 👇️ this is the input field itself
  //   console.log(event.target);

  //   // 👇️ this is the new value of the input
  //   console.log(event.target.value);
  // };
  return (
    <div className="absolute_wrap">
      <div className="absolute_wrap_header">
        <div
          className="circle hover1"
          onClick={() => {
            setVisible(0);
          }}
        >
          <i className="arrow_back_icon"></i>
        </div>
        Display & Accessibility
      </div>
      <div className="mmenu_main">
        <div className="small_circle" style={{ width: "50px" }}>
          <i className="dark_filled_icon"></i>
        </div>
        <div className="mmenu_col">
          <span className="mmenu_span1">Dark Mode</span>
          <span className="mmenu_span2">
            Adjust the appearance of Facebook to reduce glare and give your eyes
            a break.
          </span>
        </div>
      </div>
      <label
        htmlFor="darkOff"
        className="hover1"
        onClick={() => {
          Cookies.set("darkTheme", false);
          dispatch(darkTheme_false());
        }}
      >
        <span>Off</span>
        {darkTheme ? (
          <input type="radio" name="dark" id="darkOff" readOnly />
        ) : (
          <input type="radio" name="dark" id="darkOff" readOnly />
        )}
      </label>
      <label
        htmlFor="darkOn"
        className="hover1"
        onClick={() => {
          Cookies.set("darkTheme", true);

          dispatch(darkTheme_true());
        }}
      >
        <span>On</span>
        {darkTheme ? (
          <input type="radio" name="dark" id="darkOn" readOnly />
        ) : (
          <input type="radio" name="dark" id="darkOn"readOnly />
        )}
      </label>
      <div className="mmenu_main">
        <div className="small_circle" style={{ width: "50px" }}>
          <i className="compact_icon"></i>
        </div>
        <div className="mmenu_col">
          <span className="mmenu_span1">Compact mode</span>
          <span className="mmenu_span2">
            Make your font size smaller so more content can fit on the screen.
          </span>
        </div>
      </div>
      <label htmlFor="compactOff" className="hover1">
        <span>Off</span>
        <input type="radio" name="compact" id="compactOff" readOnly/>
      </label>
      <label htmlFor="compactOn" className="hover1">
        <span>On</span>
        <input type="radio" name="compact" id="compactOn" readOnly />
      </label>
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="keyboard_icon"></i>
        </div>
        <span>Keyboard</span>
        <div className="rArrow">
          <i className="right_icon"></i>
        </div>
      </div>
    </div>
  );
}


export default DisplayAccessibility
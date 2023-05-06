/* eslint-disable no-unused-vars */
 
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useClickOutside from "../../helpers/clickOutside";
import { Return,Search } from "../../svg";


const SearchMenu = ({ color,setShowSearchMenu }) => {
  const menu=useRef(null)
  const input=useRef(null)
  const [visibleIcon,setVisibleIcon]=useState(true)
  useClickOutside(menu,()=>setShowSearchMenu(prev=>!prev))
  // const fun =(input)=>{
  //   input.current.focus()
  //   setVisibleIcon(false)
  // }
  console.log(visibleIcon);
  useEffect(()=>{input.current.focus()},[])
  return (
    <div className="header_left search_area scrollbar" ref={menu}>
      <div className="search_wrap">
        <div className="header_logo">
          <div className="circle hover1">
           <Return />
          </div>
        </div>
        <div className="search" ref={input}   onClick={()=>{input.current.focus()}} >
        {visibleIcon ? <div> <Search color={color} /> </div>:null}
          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input"
            ref={input}
            onFocus={() => {
              setVisibleIcon(false);
            }}
            onBlur={() => {
              setVisibleIcon(true);
            }}
          />
        </div>
      </div>
      <div className="search_history_header">
        <span>Recent searches</span>
        <a>Edit</a>
      </div>
      <div className="search_history" ></div>
      <div className="search_results scrollbar" ></div>
    </div>
  );
};

export default SearchMenu;

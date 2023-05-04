/* eslint-disable no-unused-vars */
import "./style.css";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  Friends,
  FriendsActive,
  Gaming,
  Home,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from "../../svg";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import Cookies from "js-cookie";
const Header = () => {
    // const { user } = useSelector((user) => ({ ...user }));
    const { user } = useSelector((state) => state.user);
    const user2 =  Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

    const color = "#65676b";
    console.log("Header");
    console.log(user);
    console.log(user2);

  return (
    <header>
     <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div
          className="search search1"
          onClick={() => {
            // setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input"
          />
        </div>
    </div>
      <div className="header_middle" >
      <Link
          to="/"
          className={`middle_icon home active`}
          onClick={() => {}
            // getAllPosts()
        }
        >
          {/* {page === "home" ? <HomeActive /> : <Home color={color} />} */}
          <Home color={color} />
        </Link>
        <Link
          to="/friends"
          className={`middle_icon 
          }
          
          `}
        >
          {/* {page === "friends" ? <FriendsActive /> : <Friends color={color} />} */}
          <Friends color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1 ">
          <Gaming color={color} />
        </Link>


      </div>
      <div className="header_right"    ></div>

    </header>
  )
}

export default Header

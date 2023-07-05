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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { logout, reset } from "../../reducer/features/userSlice";
import SearchMenu from "./SearchMenu";
import AllMenu from "./AllMenu";
import useClickOutside from "../../helpers/clickOutside";
import UserMenu from "./user_menu";
const Header = ({page,getAllPosts}) => {
  // const { user } = useSelector((user) => ({ ...user }));
  const { user } = useSelector((state) => state.user);
  // const { user } = useSelector((user) => ({...user}));

  const user2 = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : user;

  const dispatch = useDispatch();
  const color = "#65676b";
  // console.log("Header");
  // console.log("user");
  // console.log(user);
  // console.log(user2);
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const all_menu = useRef(null);
  const user_menu = useRef(null);
  useClickOutside(all_menu, () => setShowAllMenu(false));
  useClickOutside(user_menu, () => setShowUserMenu(false));
  useEffect(()=>{

  },[user2])
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
            onClick={() => setShowSearchMenu((prev) => !prev)}
          />
        </div>
      </div>

      {showSearchMenu ? (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} token={user.token}/>
      ) : null}

      <div className="header_middle">
        <Link
          to="/"
          className={`middle_icon ${page === "home" ? "active" : "hover1"}`}

          onClick={
            () =>  getAllPosts()
            
          }
        >
           {page === "home" ? <HomeActive /> : <Home color={color} />} 

        </Link>
        <Link
          to="/friends"
          className={`middle_icon ${page === "friends" ? "active" : "hover1"}`}
        >
           {page === "friends" ? <FriendsActive /> : <Friends color={color} />}
      
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
      <div className="header_right">
      <Link
          to="/profile"
          className={`profile_link hover1 ${
            page === "profile" ? "active_link" : ""
          }`}
        >
          <img src={user2?.picture} alt={user2?.username} />
          <span>{user2?.first_name}</span>
        </Link>
        <div
          className={`circle_icon hover1 ${showAllMenu && "active_header"}`}
          ref={all_menu}
        >
          <div
            onClick={() => {
              setShowAllMenu((prev) => !prev);
            }}
          >
            <div style={{ transform: "translateY(2px)" }}>
              <Menu />
            </div>
          </div>

          {showAllMenu && <AllMenu />}
        </div>

        <div className="circle_icon">
          <Messenger />
        </div>
        <div className="circle_icon">
          <Notifications />
          <div className="right_notification">5</div>
        </div>
        <div
          className={`circle_icon hover1 ${showUserMenu && "active_header"}`}
          ref={user_menu}
        >
          <div
            onClick={() => {
              setShowUserMenu((prev) => !prev);
            }}
          >
            <div style={{ transform: "translateY(2px)" }}>
              <ArrowDown />
            </div>
          </div>

          {showUserMenu && <UserMenu user={user} />}
        </div>
     
      </div>
    </header>
  );
};

export default Header;

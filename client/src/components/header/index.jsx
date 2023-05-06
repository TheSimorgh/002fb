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
import { useRef, useState } from "react";
import Cookies from "js-cookie";
import { logout, reset } from "../../reducer/features/userSlice";
import SearchMenu from "./SearchMenu";
import AllMenu from "./AllMenu";
import useClickOutside from "../../helpers/clickOutside";
import { all } from "axios";
const Header = () => {
  // const { user } = useSelector((user) => ({ ...user }));
  const { user } = useSelector((state) => state.user);
  const user2 = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  const dispatch = useDispatch();
  const color = "#65676b";
  console.log("Header");
  console.log(user);
  console.log(user2);
  const [showSearchMenu,setShowSearchMenu]=useState(false)
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const all_menu=useRef(null)
useClickOutside(all_menu,()=>setShowAllMenu(false))

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
            onClick={()=>setShowSearchMenu(prev=>!prev)}
          />
        </div>
  
      </div>

     {showSearchMenu ?  <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} /> : null}

      <div className="header_middle">
        <Link
          to="/"
          className={`middle_icon home active`}
          onClick={
            () => {}
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
      <div className="header_right">
        <Link
          to="/profile"
          className={`profile_link hover1 
              "active_link"
              `}
        >
          <img src={user?.picture} alt="" />
          <span>{user?.first_name}</span>
        </Link>
        <div className="circle_icon" onClick={()=>setShowAllMenu(prev=>!prev)} ref={all_menu}>
          <Menu />
          {showAllMenu && <AllMenu />}
        </div>
      
        <div className="circle_icon">
          <Messenger />
        </div>
        <div className="circle_icon">
          <Notifications />
          <div className="right_notification">5</div>
        </div>
        <div className="circle_icon">
          <ArrowDown />
        </div>
        <div className="circle_icon" onClick={() => dispatch(reset())}>
          Logout
        </div>
      </div>
    </header>
  );
};

export default Header;

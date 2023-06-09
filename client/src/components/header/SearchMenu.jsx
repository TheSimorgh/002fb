/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useClickOutside from "../../helpers/clickOutside";
import { Return, Search } from "../../svg";
import {
  addToSearchHistory,
  getSearchHistory,
  removeFromSearch,
  search,
} from "../../functions/user";

const SearchMenu = ({ color, setShowSearchMenu, token }) => {
  const menu = useRef(null);
  const input = useRef(null);
  const [visibleIcon, setVisibleIcon] = useState(true);
  useClickOutside(menu, () => setShowSearchMenu((prev) => !prev));
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [iconVisible, setIconVisible] = useState(true);
  console.log(searchTerm);
  const fun =(input)=>{
    input.current.focus()
    setVisibleIcon(false)
  }   
  useEffect(() => {
    getHistory();
    console.log(searchHistory);
    // gggg()
  }, []);
  const gggg = async (searchTerm, token) => {
    const res = await search(searchTerm, token);
    setResults(res)

    console.log(res);
    console.log(searchTerm);
    console.log(results);
    
  };
  const getHistory = async () => {
    const res = await getSearchHistory(token);
    setSearchHistory(res);
    
  };
  console.log(visibleIcon);
  useEffect(() => {
    input.current.focus();
  }, [input]);

  const searchHandler = async () => {
    if (searchTerm == "") {
      setResults("");
    } else {
      const res = await search(searchTerm, token);
      console.log(res);
      setResults(res);
    }
  };
  const addToSearchHistoryHandler = async (searchUser) => {
    const res = await addToSearchHistory(searchUser, token);
    getHistory();
  };
  const removeHandler = async (searchUser) => {
    removeFromSearch(searchUser,token);
    getHistory();
  };

  return (
    <div className="header_left search_area scrollbar" ref={menu}>
      <div className="search_wrap">
        <div className="header_logo">
          <div className="circle hover1">
            <Return />
          </div>
        </div>
        <div
          className="search"
          ref={input}
          onClick={() => {
            input.current.focus();
          }}
        >
                 {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
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
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            onKeyUp={searchHandler}
          />
        </div>
      </div>
      {results == "" && (
        <div className="search_history_header">
          <span>Recent searches</span>
          <a>Edit</a>
        </div>
      )}
      <div className="search_history">
      {searchHistory &&
          results == "" &&
          searchHistory
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .map((user) => (
              <div className="search_user_item hover1" key={user._id}>
                <Link
                  className="flex"
                  to={`/profile/${user.user.username}`}
                  onClick={() => addToSearchHistoryHandler(user._id)}
                >
                  <img src={user.picture} alt="" />
                  <span>
                    {user.first_name} {user.last_name}
                  </span>
                </Link>
                <i
                  className="exit_icon"
                  onClick={() => {
                    removeHandler(user._id);
                  }}
                ></i>

              </div>
            ))}
      </div>
      <div className="search_results scrollbar">
        {results && results?.length  ?
          results.map((user) => (
            <Link
              to={`/profile/${user.username}`}
              className="search_user_item hover1"
              onClick={() => addToSearchHistoryHandler(user.user._id)}
              key={user._id}
            >
              <img src={user.picture} alt="" />
              <span>
                {user.first_name} {user.last_name}
              </span>
            </Link>
          )):null}
      </div>
    </div>
  );
};

export default SearchMenu;

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useClickOutside from "../../helpers/clickOutside";
import { Return,Search } from "../../svg";
import { search } from "../../functions/user";


const SearchMenu = ({ color,setShowSearchMenu,token }) => {
  const menu=useRef(null)
  const input=useRef(null)
  const [visibleIcon,setVisibleIcon]=useState(true)
  useClickOutside(menu,()=>setShowSearchMenu(prev=>!prev))
  const [searchTerm,setSearchTerm]=useState("")
  const [results, setResults] = useState([]);

  // const fun =(input)=>{
  //   input.current.focus()
  //   setVisibleIcon(false)
  // }
  console.log(visibleIcon);
  useEffect(()=>{input.current.focus()},[input])

  const searchHandler=async ()=>{
    if(searchTerm===""){
      setResults("")
    }else{
      const res=await search(searchTerm,token)
      setResults(res);
    }
  }

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
            onChange={e=>searchHandler(e.target.value)}
            value={searchTerm}
            onKeyUp={searchHandler}
          />
        </div>
      </div>
      <div className="search_history_header">
        <span>Recent searches</span>
        <a>Edit</a>
      </div>
      <div className="search_history" ></div>
      <div className="search_results scrollbar" >

      {results &&
          results.map((user) => (
            <Link
              to={`/profile/${user.username}`}
              className="search_user_item hover1"
              key={user._id}
            >
              <img src={user.picture} alt="" />
              <span>
                {user.first_name} {user.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SearchMenu;

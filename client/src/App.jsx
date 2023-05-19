/* eslint-disable no-unused-vars */
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { Routes, Route } from "react-router-dom";
import "./styles/icons/icons.css";
import "./index.css";
import "./styles/dark.css";

import { Activate, Home, Login, NotFound, Profile, Reset } from "./pages";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";

import CreatePostPopup from "./components/create_post_popup";
import { useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import { postsReducer } from "./functions/reducers";
import axios from "axios";



export const server_url = "http://localhost:8000";
function App() {
  const { user } = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);
  const [{loading,error,posts},dispatch]=useReducer(postsReducer,{
    loading: false,
    posts: [],
    error: "",
  })
  useEffect(()=>{getAllPosts(),
  console.log(posts);},[])
console.log(posts);
  async function getAllPosts(){
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });
      const { data } = await axios.get(
        `${server_url}/getAllPosts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({type:"POSTS_SUCCESS",payload:data})

    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: error.response.data.message,
      });
    }
  }
  const data = [
    // { path: "/login", element: <Login /> },
    { path: "/profile", element: <Profile /> },
    { path: "/", element: <Home setVisible={setVisible} visible={visible} posts={posts} /> },
    { path: "/activate/:token", element: <Activate /> },
  ];

  return (
    <div className={`"container mx-auto h-screen bg-dark`}>
      {visible && <CreatePostPopup user={user} setVisible={setVisible} />}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          {data.map((e, i) => (
            <Route path={e.path} element={e.element} key={i} />
          ))}
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;

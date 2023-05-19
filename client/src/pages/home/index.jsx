/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import {
  CreatePost,
  Header,
  Post,
  RightHome,
  SendVerification,
  Stories,
} from "../../components";
import Cookies from "js-cookie";
import { useRef, useState, useEffect } from "react";
import useClickOutside from "../../helpers/clickOutside";
import {
  homeToggleFun,
  home_visible_false,
  home_visible_true,
} from "../../reducer/features/togglesSlice";
import LeftHome from "../../components/home/left";
import "./style.css";

const Home = ({ setVisible, visible, posts }) => {
  // const {user}=useSelector((state)=>state.user)
  // const user2 =  Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  // const [data,setData]=useState(user2)
  // console.log("Home");
  // console.log(user);
  // console.log(user2);
  //////////////////////////////////
  const el = useRef(null);
  console.log("visible");

  console.log(visible);
  useClickOutside(el, () => {
    el.current.style.display = "none";
  });
  useClickOutside(el, () => setVisible(false));
  const { home_visible } = useSelector((state) => state.toggles);

  const { user } = useSelector((state) => state.user);
  const cookie_user = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : null;
  const dispatch = useDispatch();
  // console.log("home_visible");
  // console.log(home_visible);
  // console.log("USer");
  // console.log(user);
  // console.log("Cookie User");
  // console.log(cookie_user);

  const middle = useRef(null);
  const [height, setHeight] = useState();
  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, [ height]);

  return (
    <div
      className="home"
       style={{ height: `${height + 150}px` }}
    >
      <Header />
      <LeftHome user={user} />
      <RightHome user={user} />
      <div className="home_middle" ref={middle}>
        <Stories />
        {user.verified === false && <SendVerification user={user} />}
        <CreatePost user={user} setVisible={setVisible} />

       
          <div className="posts">
          {posts.map((post, i) => (
                 <Post key={i} post={post} user={user} />   
         ))} 
          </div>
    </div>
    </div>
  );
};

export default Home;

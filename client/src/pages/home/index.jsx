/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux"
import { CreatePost, Header, RightHome, Stories } from "../../components"
import Cookies from "js-cookie"
import { useRef, useState,useEffect } from "react"
import useClickOutside from "../../helpers/clickOutside"
import { homeToggleFun, home_visible_false, home_visible_true } from "../../reducer/features/togglesSlice"
import LeftHome from "../../components/home/left"
 import "./style.css";



const Home = () => {
  // const {user}=useSelector((state)=>state.user)
  // const user2 =  Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
// const [data,setData]=useState(user2)
  console.log("Home");
  // console.log(user);
  // console.log(user2);
  //////////////////////////////////
  const el =useRef(null)

  useClickOutside(el,()=>{el.current.style.display="none"})
  useClickOutside(el,()=>setVisible(false))
const {home_visible}=useSelector(state=>state.toggles)
const dispatch=useDispatch()
console.log("home_visible");
console.log(home_visible);
const [visible,setVisible]=useState(true)
const {user}=useSelector(state=>state.user)

const middle = useRef(null);
const [height, setHeight] = useState();
useEffect(() => {
  setHeight(middle.current.clientHeight);
}, [ height]);
  return (
    <div className="home" style={{ height: `${height + 150}px` }}>
     <Header />
     <LeftHome user={user} /> 
     <RightHome user={user}/>
     <div className="home_middle" ref={middle}>
       <Stories /> 
       <CreatePost  user={user} setVisible={setVisible} />
     </div>
     {/* <div className="home_middle">
      Middle
     </div> */}
     {/* <div style={{marginTop:"100px"}}></div>
    {visible ?  <div  ref={el} className="card" ></div> :null} */}
     {/* <div ref={el} className="card" ></div> */}
    {/* <p style={{colo:"black",top:"300"}} >{JSON.stringify(data)}</p> */}
    {/* <button onClick={()=>dispatch(homeToggleFun)} >+</button> */}
    {/* <button onClick={()=>setVisible(true)} >++</button> */}
    </div>
  )
}

export default Home


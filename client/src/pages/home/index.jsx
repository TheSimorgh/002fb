import { useSelector } from "react-redux"
import { Header } from "../../components"
import Cookies from "js-cookie"
import { useState } from "react"

const Home = () => {
  // const {user}=useSelector((state)=>state.user)
  // const user2 =  Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
// const [data,setData]=useState(user2)
  console.log("Home");
  // console.log(user);
  // console.log(user2);


  return (
    <div>
     <Header />
 {/* <p style={{colo:"black",top:"300"}} >{JSON.stringify(data)}</p> */}
    </div>
  )
}

export default Home


import { useEffect, useState } from "react";
import {LoginForm,RegisterForm,Footer } from "../../components/index"
import "./style.css";

const Login = () => {
  const [visible, setVisible] = useState(true);
  function toggleVisible (){
    setVisible(prev=>!prev)
  }
  useEffect(()=>{
    console.log(visible);
  },[visible])

  return (
    <div className="login">
    <div className="login_wrapper">
     
      {visible  ?  <LoginForm  toggleVisible={toggleVisible} />:<RegisterForm  toggleVisible={toggleVisible}  />} 
      {/* <LoginForm setVisible={setVisible} /> */}
      {/* <RegisterForm setVisible={setVisible} />  */}
      <Footer />
    </div>
  </div>
  )
}

export default Login

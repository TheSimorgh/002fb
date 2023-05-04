import { useEffect } from "react";
import {LoginForm,RegisterForm,Footer } from "../../components/index"
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { loginToggleFun } from "../../reducer/features/togglesSlice";

const Login = () => {
  const dispatch = useDispatch();

  const {login_visible}=useSelector((state)=>state.toggles)
  function toggleVisibleFun (){
    dispatch(loginToggleFun())
  }

  useEffect(()=>{
    console.log(login_visible);
  },[login_visible])

  return (
    <div className="login">
    <div className="login_wrapper">
      {login_visible  ?  <LoginForm  toggleVisible={toggleVisibleFun} />:<RegisterForm  toggleVisible={toggleVisibleFun}  />} 
      <Footer />
    </div>
  </div>
  )
}

export default Login

/* eslint-disable no-unused-vars */

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import axios from "axios";
import Cookies from "js-cookie";
import {
  CreatePost,
  Header,
  RightHome,
  Stories,
  LeftHome,
} from "../../components";

import React from "react";
import ActivateForm from "./ActivateForm";
import { activate, activateUserAccount, user_verification } from "../../reducer/features/userSlice";

const Activate = () => {
  // const { user,loading,error,successMessage } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const[err,setErr]=useState("")
  const [msg, setMsg] = useState("");
  const {token}=useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const backend_url="http://localhost:8000"
  console.log(token);

  // useEffect(() => {
  //   activateAccount(user,token);
  //   console.log("user_verification");
  //   console.log(user_verification);
  // }, []);

  //  function activateAccount (user,token){
  //     try {
  //      dispatch( activateUserAccount(user,token))
  //       setMsg(successMessage)
  //       setTimeout(() => {
  //       navigate("/");
  //     }, 3000);
  //     } catch (e) {
  //       console.log(error);
  //       setMsg(e.message || err|| error)
  //       setTimeout(() => {
  //       navigate("/");
  //     }, 3000);
  //     }
 
  // } 
  useEffect(() => {
    activateAccount();
    console.log("user_verification");
    console.log(user_verification);
  }, []);

  const activateAccount = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${backend_url}/activate`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);  
      Cookies.set("user", JSON.stringify({ ...user, verified: true }));

      dispatch(activate())
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };
  return (
    <div className="home">
      {/* {successMessage || msg ? ( 
        <ActivateForm
          type="success"
          text={successMessage}
          loading={loading}
          header="Account verification succeeded"
        />
      ) : null}
      {error || err ? (
        <ActivateForm
          type="error"
          text={error}
          loading={loading}
          header="Account verification failed"
        />
      ) : null}
      <Header />
      <LeftHome user={user} />

      <div className="home_middle">
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} /> */}


{success ? (
        <ActivateForm
          type="success"
          text={success}
          loading={loading}
          header="Account verification succeeded"
        />
      ) : null}
      {error ? (
        <ActivateForm
          type="error"
          text={error}
          loading={loading}
          header="Account verification failed"
        />
      ) : null}
      <Header />
      <LeftHome user={user} />

      <div className="home_middle">
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Activate;

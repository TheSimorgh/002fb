/* eslint-disable no-unused-vars */
import { Form, Formik } from "formik";
import { useState,useEffect } from "react";
import * as Yup from "yup";
import DateOfBirthSelect from "./DateOfBirthSelect";
import GenderSelect from "./GenderSelect";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {RegisterInput} from "../../components";
import "../../pages/login/style.css"
import http from "../../axios/CustomAxios";
import {   register, setUser2, truly } from "../../reducer/features/userSlice";
import { login_visible_false,login_visible_true } from "../../reducer/features/togglesSlice";
// eslint-disable-next-line react/prop-types


// eslint-disable-next-line react/prop-types
const RegisterForm = ({toggleVisible}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  };

  const [userInfo, setUserInfo] = useState(userInfos);
  const {
    first_name,
    last_name,
    email,
    password,
  
    bYear,
    bMonth,
    bDay,
    gender,
  } = userInfo;
  const {user,count,loading,isSuccess,message,successMessage,error}=useSelector((state)=>state.user)
//   console.log("Fetched UserInfo");
// console.log(isSuccess);
// console.log(user);
  const yearTemp = new Date().getFullYear();
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const user2 =  Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
// console.log(successMessage);
  // const user2 = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
     dispatch(setUser2(user2));
    console.log("user2");
    console.log(user2);
    // console.log("user");
    // console.log(user);
    // console.log(count);
    // console.log(message);
    // console.log(isSuccess);
    // console.log("Error");
    // console.log(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const years = Array.from(new Array(108), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);
  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What's your First name ?")
      .min(2, "Fisrt name must be between 2 and 16 characters.")
      .max(16, "Fisrt name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
    last_name: Yup.string()
      .required("What's your Last name ?")
      .min(2, "Last name must be between 2 and 16 characters.")
      .max(16, "Last name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
  });
  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");


   const [success, setSuccess] = useState("");


  // const server_url="http://localhost:8000"
const registerSubmit=()=>{
  dispatch( register(userInfo));
  setTimeout(()=>{
    // dispatch(login_visible_false())
    navigate("/login")
  },2000)
 
}
//  const registerSubmit = async () => {
//   try {
//     const {data}=await http.post(`http://localhost:8000/register`,userInfo)
//     setError("")
//     setSuccess(data.message);
//     const {message,...rest}=data
//     console.log(rest);
//     setTimeout(()=>{
//       dispatch(login(rest));
//       Cookies.set("user", JSON.stringify(rest));
//       navigate("/login")
//     },2000)
//     // console.log(1);
//   } catch (error) {
//     console.log(error.message);
//     setLoading(false)
//     setSuccess("")
//     setError(error.response.data.message)
//   }
//    };
  return (
    <div className="blur">
      {/* {isSuccess} */}
      <button onClick={()=>dispatch(truly())} >+</button>
      <div className="register">
        <div className="register_header">
          <i className="exit_icon" 
         onClick={() => toggleVisible()}
          
          ></i>
          <span>Sign Up</span>
        
          <span>it's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);
            let atleast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan70 = new Date(1970 + 70, 0, 1);
            if (current_date - picked_date < atleast14) {
              setDateError(
                "it looks like you(ve enetered the wrong info.Please make sure that you use your real date of birth."
              );
            } else if (current_date - picked_date > noMoreThan70) {
              setDateError(
                "it looks like you(ve enetered the wrong info.Please make sure that you use your real date of birth."
              );
            } else if (gender === "") {
              setDateError("");
              setGenderError(
                "Please choose a gender. You can change who can see this later."
              );
            } else {
              setDateError("");
              setGenderError("");
               registerSubmit();
            }
          }}
        >

        
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Surname"
                  name="last_name"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Mobile number or email address"
                  name="email"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="New password"
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  handleRegisterChange={handleRegisterChange}
                  dateError={dateError}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>

                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                />
              </div>
              <div className="reg_infos">
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Data Policy &nbsp;</span>
                and <span>Cookie Policy.</span> You may receive SMS
                notifications from us and can opt out at any time.
              </div>
              <div className="reg_btn_wrapper">
                <button className="blue_btn open_signup" type="submit">Sign Up</button>
              </div>
              <DotLoader color="#1876f2" loading={loading} size={30} />
              {error && <div className="error_text">{error}</div>}
              {successMessage && <div className="success_text">{successMessage}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}


export default RegisterForm

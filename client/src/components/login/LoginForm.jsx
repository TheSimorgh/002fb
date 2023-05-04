/* eslint-disable no-unused-vars */
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LoginInput from "./inputs/LoginInput";
import http from "../../axios/CustomAxios";
import { signin } from "../../reducer/features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const loginInfos = {
    email: "",
    password: "",
  };
// eslint-disable-next-line react/prop-types
const LoginForm = ({toggleVisible}) => {
  const {error,loading}=useSelector((state)=>state.user)
  const user2 =  Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
const [user,setUser]=useState("")
  console.log("User Login");
  console.log(user);
  console.log("User2 Login");
  console.log(user2);
    // eslint-disable-next-line no-unused-vars
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, setLogin] = useState(loginInfos);
    const { email, password } = login;
    const handleLoginChange = (e) => {
      const { name, value } = e.target;
      setLogin({ ...login, [name]: value });
    };
    const loginValidation = Yup.object({
      email: Yup.string()
        .required("Email address is required.")
        .email("Must be a valid email.")
        .max(100),
      password: Yup.string().required("Password is required"),
    });

    


    const server_url="http://localhost:8000"

    // const loginSubmit = async () => {
    //   try {
    //     const {data}=await http.post(`http://localhost:8000/login`,login)
    //     // setLoading(true);
    //     setUser(data)
    //     setTimeout(()=>{
    //       // Cookies.set("user", JSON.stringify(data));
    //       // navigate("/register")
    //     },3000)
    //     console.log(1);
    //   } catch (error) {
    //     console.log(error.message);
    //     // setLoading(false);
    //     // setError(error.response.data.message);
    //   }
    //    };


       const loginSubmit=async()=>{
        dispatch(signin(login))
        setTimeout(()=>{
          navigate("/")
        },1000)        
      }
    return (
      <div className="login_wrap">
        <div className="login_1">
          <img src="../../icons/facebook.svg" alt="" />
          <span>
            Facebook helps you connect and share with the people in your life.
          </span>
        </div>
        <div className="login_2">
          <div className="login_2_wrap">
            <Formik
              enableReinitialize
              initialValues={{
                email,
                password,
              }}
              validationSchema={loginValidation}
              onSubmit={() => {
                loginSubmit();
             }}
            >
           
         
              {(formik) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="email"
                    placeholder="Email address or phone number"
                    onChange={handleLoginChange}
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleLoginChange}
                    bottom
                  />
                  <button type="submit" className="blue_btn">
                    Log In
                  </button>
                </Form>
              )}
            </Formik>
            <Link to="/reset" className="forgot_password">
              Forgotten password?
            </Link>
            <DotLoader color="#1876f2" loading={loading} size={30} />
  
            {error && <div className="error_text">{error}</div>}
            <div className="sign_splitter"></div>
            <button
              className="blue_btn open_signup"
             onClick={() => toggleVisible()}
            >
              Create Account
            </button>
          </div>
          <Link to="/" className="sign_extra">
            <b>Create a Page</b> for a celebrity, brand or business.
          </Link>
        </div>
      </div>
    );
  }
  

export default LoginForm
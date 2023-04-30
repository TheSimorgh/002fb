const {   validateEmail,validateLength,validateUsername,} = require("../helpers/validation");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/token");
const { sendVerificationEmail } = require("../helpers/mailer");
const dotenv = require("dotenv");
dotenv.config();
const BASE_URL="http:://localhost:5137"

exports.register=async(req,res)=>{
   try {
    const {
        first_name,
        last_name,
        email,
        password,
        username,
        bYear,
        bMonth,
        bDay,
        gender,
      } = req.body;

      if(!validateEmail(email)){return res.status(400).json({message:"invalid email address"})}
      const check = await User.findOne({email})
      if(check){return res.status(400).json({message: "This email address already exists,try with a different email address"})}
      if (!validateLength(first_name, 3, 30)) {return res.status(400).json({message: "first name must between 3 and 30 characters.",});}
      if (!validateLength(last_name, 3, 30)) {return res.status(400).json({message: "last name must between 3 and 30 characters.",}); }
      if (!validateLength(password, 6, 40)) {return res.status(400).json({message: "password must be at least 6 characters.",});}
      const cryptedPassword=await bcrypt.hash(password,12)
      let tempUsername = first_name + last_name;
      let newUsername = await validateUsername(tempUsername);
      const user = await new User({
        first_name,
        last_name,
        email,
        password: cryptedPassword,
        username: newUsername,
        bYear,
        bMonth,
        bDay,
        gender,
      }).save();

      const emailVerificationToken=generateToken({id:user._id.toString()},"30m")
    //   console.log(emailVerificationToken);
      const url = `${BASE_URL}/activate/${emailVerificationToken}`;
      sendVerificationEmail(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      url,
      message: "Register Success ! please activate your email to start",
    });

   } catch (error) {
    res.status(500).json({message:error.message})
    console.log(`register:${error} `);
   }
}

exports.activateAccount=async (req,res)=>{
const validUser = req.user.id;
const {token}=req.body
console.log(token);
console.log(req.body);

}
const express = require("express");
const { register,activateAccount, login,auth, sendVerification, findUser, sendResetPasswordCode, changePassword, getProfile,updateProfilePicture, updateCover, updateDetails, addFriend } = require("../controllers/user");
const { authMidd } = require("../middlwares/authMidd");


const router = express.Router()

router.post("/register",register)
router.post("/login", login);
router.post("/activate",authMidd, activateAccount)
router.post("/sendVerification",authMidd, sendVerification)
router.post("/findUser", findUser)
router.post("/sendResetPasswordCode", sendResetPasswordCode);
router.post("/changePassword", changePassword);
router.get("/getProfile/:username",authMidd,  getProfile);
router.put("/updateProfilePicture", authMidd,updateProfilePicture);
router.put("/updateCover", authMidd,updateCover);
router.put("/updateDetails", authMidd,updateDetails);
router.put("/addFriend/:id", authMidd,addFriend);


getProfile
router.post("/auth",authMidd, auth)
module.exports= router;
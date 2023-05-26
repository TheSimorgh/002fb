const express = require("express");
const { register,activateAccount, login,auth, sendVerification, findUser, sendResetPasswordCode, changePassword, getProfile,updateProfilePicture,updateCover } = require("../controllers/user");
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
router.post("/updateProfilePicture", authMidd,updateProfilePicture);
router.post("/updateProfilePicture", authMidd,updateCover);


getProfile
router.post("/auth",authMidd, auth)
module.exports= router;
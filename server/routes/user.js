const express = require("express");
const { register,activateAccount, login,auth, sendVerification, findUser, sendResetPasswordCode, changePassword, getProfile,updateProfilePicture, updateCover, updateDetails, addFriend, cancelRequest, follow, unFollow, acceptRequest, unfriend, deleteRequest } = require("../controllers/user");
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
router.put("/unfriend/:id", authMidd,unfriend);
router.put("/cancelRequest/:id", authMidd,cancelRequest);
router.put("/acceptRequest/:id", authMidd,acceptRequest);
router.put("/deleteRequest/:id", authMidd,deleteRequest);
router.put("/follow/:id", authMidd,follow);
router.put("/unfollow/:id", authMidd,unFollow);




router.post("/auth",authMidd, auth)
module.exports= router;
const express = require("express");
const { register,activateAccount, login,auth } = require("../controllers/user");
const { authMidd } = require("../middlwares/authMidd");


const router = express.Router()

router.post("/register",register)
router.post("/login", login);
router.post("/activate",activateAccount)
router.post("/auth",authMidd, auth)
module.exports= router;
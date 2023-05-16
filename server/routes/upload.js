const express = require("express");
const { imgUploadMidd } = require("../middlwares/imgUploadMidd");
const { upload2Images } = require("../controllers/upload2");


const router = express.Router()
router.post("/uploadImages",imgUploadMidd, upload2Images)


module.exports = router;
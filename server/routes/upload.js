const express = require("express");
const { imgUploadMidd } = require("../middlwares/imgUploadMidd");
const { uploadImages ,listImages} = require("../controllers/upload");
const { authMidd } = require("../middlwares/authMidd");


const router = express.Router()
router.post("/uploadImages", authMidd, imgUploadMidd, uploadImages)
router.post("/listImages", authMidd, listImages);


module.exports = router;
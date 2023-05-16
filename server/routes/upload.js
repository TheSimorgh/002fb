const express = require("express");
const { imgUploadMidd } = require("../middlwares/imgUploadMidd");
const { uploadImages } = require("../controllers/upload");


const router = express.Router()
router.post("/uploadImages",imgUploadMidd, uploadImages)


module.exports = router;
const express = require("express")
const { createPost, getAllPosts, comment } = require("../controllers/post")
const { authMidd } = require("../middlwares/authMidd")

const router = express.Router()
router.post("/createPost",authMidd, createPost)
router.get("/getAllPosts", getAllPosts)
router.put("/comment", authMidd,comment)

router.get("/post",(req,res)=>{
    res.send("Hello userRoute")
})

module.exports = router;
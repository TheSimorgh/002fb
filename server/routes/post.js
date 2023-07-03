const express = require("express")
const { createPost, getAllPosts, comment, deletePost, savePost } = require("../controllers/post")
const { authMidd } = require("../middlwares/authMidd")

const router = express.Router()
router.post("/createPost",authMidd, createPost)
router.get("/getAllPosts",authMidd, getAllPosts)
router.put("/comment", authMidd,comment)
router.get("/deletePost/:id",authMidd,deletePost)
router.put("/savePost/:id",authMidd,savePost)
router.get("/post",(req,res)=>{
    res.send("Hello userRoute")
})

module.exports = router;
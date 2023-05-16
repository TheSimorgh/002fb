const Post = require("../models/Post");
const User = require("../models/User");


exports.createPost=async (req,res)=>{
    try {
     const post = await new Post(req.body).save();
     await post.populate("user", "first_name last_name cover picture username");
     res.json(post);
      console.log(`createPost`);
  
    } catch (error) {
      
    }
  }

  exports.getAllPosts=async (req,res)=>{
    try {
      console.log(`getAllPosts`);
  
    } catch (error) {
      
    }
  }
  exports.deletePost=async (req,res)=>{
    try {
      console.log(`  exports.deletePost=async (req,res)=>{
        `);
  
    } catch (error) {
      
    }
  }
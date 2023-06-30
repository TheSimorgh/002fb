const Post = require("../models/Post");
const User = require("../models/User");


exports.createPost=async (req,res)=>{
    try {
     const post = await new Post(req.body).save();
     await post.populate("user", "first_name last_name cover picture username");
     res.json(post);
      console.log(`createPost`);
  
    } catch (error) {
      return res.status(500).json({message:error.message})
    }
  }

  exports.getAllPosts=async (req,res)=>{
    try {
      const posts = await Post.find().populate("user", "first_name last_name picture username cover").sort({ createdAt: -1 })
      res.status(200).json(posts)
      console.log(`getAllPosts`);
  
    } catch (error) {
      return res.status(500).json({message:error.message})

    }
  }
  exports.deletePost=async (req,res)=>{
    try {
      console.log(`  exports.deletePost=async (req,res)=>{
        `);
  
    } catch (error) {
      
    }
  }


  exports.comment=async (req,res)=>{
    try {
      const {comment,image,postId}=req.body;
      let newComments =await Post.findByIdAndUpdate(postId,{
        $push:{
          comment: comment,
          image: image,
          commentBy: req.user.id,
          commentAt: new Date(),
        }
      },
      {
        new: true,
      }).populate("comments.commentBy", "picture first_name last_name username");
      res.json(newComments.comments);

    } catch (error) {
      return res.status(500).json({message:error.message})

    }
  }
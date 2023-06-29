const React = require("../models/React");
const User = require("../models/User");
const { ObjectId } = mongoose.Schema;

exports.postReact = async (req, res) => {
  try {
    const { postId, react } = req.body;
    const check = await React.findOne({
      postRef: postId,
      reactBy: ObjectId(req.user.id),
    });
    if (check == null) {
      const newReact = new React({
        react: react,
        postRef: postId,
        reactBy: ObjectId(req.user.id),
      });
    }else{
        
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getReacts = async = () => {
  try {
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

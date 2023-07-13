const postModel = require('../models/post');

const createPost = async (req, res, next) => {
  try {
    // const avatars = req.files.map((file) => file.path.replace(/\\/g, '/'));
    const arrimages = req.files.avators.map((data) => data?.path?.replace(/\\/g, "/"))
    const arrvideos = req.files.videos.map((data) => data?.path?.replace(/\\/g, "/"))
    
    const newPost = new postModel({
      name: req.body.name,
      description: req.body.description,
      avators: arrimages, 
      videos: arrvideos,
      saved: req.body.saved,
      reported: req.body.reported,
    });

    
    const data = await newPost.save();
    console.log("d1",data)
    res.send({
      message: "Post created",
      status: 201,
      data: data,
    });
  } catch (err) {
    res.send({
      message: "Post not created",
      status: 404,
    });
  }
};

const createLikedPost = async(req, res, next) => {
  try {
    const { _id} = req.body;
    const Id = req.id
    console.log(Id)
    const updatedPost = await postModel.findOneAndUpdate(
      { _id: _id },
      { $push: { liked: { user: Id } } },
      { new: true }
    );
    console.log(updatedPost.liked.length)

    res.send({
      message: "Post liked successfully",
      status: 200,
      data: updatedPost,
      totallength:updatedPost.liked.length
    });
  } catch (err) {
    res.send({
      message: "Failed to like post",
      status: 500,
    });
  }
}

const createCommentPost = async(req, res, next) => {
 
    try {
      const { _id, comments } = req.body;
      const userId = req.id;
      console.log(_id,comments,userId)
      const updatedPost = await postModel.findOneAndUpdate(
        { _id: _id },
        { $push: { comments: { user: userId, text: comments } } },
        { new: true }
      );
      console.log(updatedPost.comments.length)
  
      res.send({
        message: "Comment added successfully",
        status: 200,
        data: updatedPost,
        totallength:updatedPost.comments.length
      });
    } catch (err) {
      res.send({
        message: "Failed to add comment",
        status: 500,
      });
    }
};


module.exports = {
  createPost,
  createLikedPost,
  createCommentPost
};

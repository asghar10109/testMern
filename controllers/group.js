const groupModel = require('../models/group');
const postModel = require('../models/post');
var mongoose = require('mongoose');


const createGroup = async (req, res, next) => {
    try{
        const filename = req.file.path;
        const files = `${filename}`.replace("public","")
        const userId = req.id
        
            const newUser = new groupModel({
                name: req.body.name,
                description: req.body.description,
                group_types: req.body.group_types,
                coverimage: `${files}`?.replace(/\\/g, "/"),
                user:userId,
                post:req.body.post,
                members:[req.body.members]
            });
            
            const datas = await newUser.save();
            
            res.send({
                message:"Customer created successfully",
                status:201,
                data : datas
            })
    }catch(err){
        res.send({
            message:"Customer Not found",
            status:404
        })
    }
   
};

const getAllPost = async (req, res, next) => {
    const groupId = req.params.id;
    const id = new mongoose.Types.ObjectId(groupId)
   
    try {
  
   const data =  [
    {
      '$match': {
        '_id': id
      }
    }, {
      '$lookup': {
        'from': 'posts', 
        'localField': 'post', 
        'foreignField': '_id', 
        'as': 'result'
      }
    }, {
      '$unwind': {
        'path': '$result'
      }
    }, {
      '$group': {
        '_id': id, 
        '_id': {
          'name': '$name', 
          'description': '$description', 
          'post': '$post'
        }
      }
    }, {
      '$facet': {
        'data': [
          {
            '$limit': 1
          }
        ]
      }
    }, {
      '$sort': {
        'createdAt': -1
      }
    }
  ]   
      const posts = await groupModel.aggregate(data);
  
   
  
      res.send({
        message: "Posts retrieved successfully",
        status: 200,
        data: posts,
      });
    } catch (err) {
      console.error(err);
      res.send({
        message: "Failed to retrieve posts",
        status: 500,
      });
    }
  };
  

module.exports = {
    createGroup,
    getAllPost
};

const mongoose = require('mongoose')

const postModel = new mongoose.Schema({
    name:{
        type:String    
    },
    description:{
        type:String
    },
    avators: [{
      type: String
    }],
    videos: [{
      type: String
    }],
    liked: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          }
        }
      ],
    comments: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          },
          text: String
        }
    ],

    saved:{
        type:Boolean,
        default:false
    },
    reported:{
        type:Boolean,
        default:false
    }
    
    
},
{timestamps:true}
) 

module.exports = mongoose.model('Post',postModel)
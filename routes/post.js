const postRouter = require('express').Router()
const postImage = require('../middleware/postimage');
const Auth = require('../middleware/Auth');
const {
    createPost,
    createLikedPost,
    createCommentPost
    
} = require('../controllers/post')

postRouter.post('/createPost', postImage.upload, createPost)
postRouter.post('/createLikedPost', Auth, createLikedPost)
postRouter.post('/createCommentPost', Auth, createCommentPost)
module.exports = postRouter
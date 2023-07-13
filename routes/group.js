const groupRouter = require('express').Router()
const groupImage = require('../middleware/coverimage');
const Auth = require('../middleware/Auth');
const {
    createGroup,    
    getAllPost
} = require('../controllers/group')

groupRouter.post('/createGroup', groupImage.upload,Auth, createGroup)
groupRouter.get('/getAllPost/:id', getAllPost)
module.exports = groupRouter

const UserRouter = require('express').Router()
const UserImage = require('../Middleware/UserImage');
const Auth = require('../middleware/Auth');
const {
    createUser,
    LoginUser,
    Profile,
    OtpCheck
} = require('../controllers/user')

UserRouter.post('/createUsers', UserImage.upload , createUser)

UserRouter.post('/login',   LoginUser)
UserRouter.post('/profile', Auth , Profile)
UserRouter.post('/OTP/verification', OtpCheck);


module.exports = UserRouter
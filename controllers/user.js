const userModel = require('../models/user')
const CryptoJS = require("crypto-js");
const Login_Token_Authentication = require('../middleware/loginjwt')
const sendEmail = require('../middleware/Email');


const createUser = async (req,res,next) => {
try{

    
    const filename = req.file.path;
    
    const random = Math.floor(Math.random() * 1000);
    const files = `${filename}`.replace("public","")
    
        const newUser = new userModel({
            username: req.body.username,
            address: req.body.address,
            email: req.body.email,
            password:  CryptoJS.AES.encrypt(req.body.password, process.env.Secret_password ).toString(),
            phone: req.body.phone,
            avator: `${files}`?.replace(/\\/g, "/"),
            otp:`${random}`
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
}

const LoginUser = async (req,res,next) => {
    
    const type_email = req.body.email
    const type_password = req.body.password
    
    try{

        const data = await userModel.findOne({ email : type_email });
        
        const show_password = CryptoJS.AES.decrypt(data.password,  process.env.Secret_password);
        const original_password = show_password.toString(CryptoJS.enc.Utf8);
        type_email == data.email && type_password == original_password  ?
        res.send( {message:"token generated", status:201 ,data :  Login_Token_Authentication(data , '1h') })   :
        res.send( {message:"token not found",status:404} )
    }
    catch(err){
        res.send({
            message:"server Error",
            status:500
        })
    }

    
}

const OtpCheck = async (req,res,next) => {
    const {otp,email} = req.body;
    console.log(otp)

    if(otp&&email){

        const data = await userModel.findOne({email:email})
        console.log(data)
        if(data.otp === otp){
            res.send({
                message:"OTP Success",
                status:200
            })
        }
    }
    else{
        return res.status(401).json({error: "Authentication Error"});
    }


   
}



const Profile = async (req,res,next) => {
    const Id = req.id
    try{
        
        const data = await userModel
                            .findOne({ _id : Id })
                            .select('_id username address email phone avator');
        
        res.send({
            message:"Data found",
            status:200,
            data : data
        })
    }catch(err){
        res.send({
            message:"Data not found",
            status:404
        }) 
    }
}


module.exports= { 
    createUser,
    LoginUser,
    Profile,
    OtpCheck

}
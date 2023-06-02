const jwt = require('jsonwebtoken');
const User = require("../models/user")


const Authenticate = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
        const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token});
           if(!rootUser){throw new Error('User not Found')}
           req.token = token;
           req.rootUser=rootUser;
           req.userID = rootUser._id;

           next();

    }catch(err){
        res.status(401).send({succes:false,message:"Unauthorized:No token provided"});
        console.log(err)
    }
}

module.exports = Authenticate;
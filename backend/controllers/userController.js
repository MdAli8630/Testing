const userModel= require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const create_signup = async(req,res)=>{
    const {name,email,password,address} = req.body;

    try{

        const existing_user =await userModel.findOne({email:email});
         if(existing_user){
            return res.status(422).json({success: false,message:"Email already exist"})
         }

        const hashPassword =await bcrypt.hash(password,10)
      const data = new userModel({name,email,password:hashPassword,address});
       await data.save()
       res.status(201).json({success:true,message:"User Signup SuccessFully",data:data})


    }catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "Something went Wrong!" })
    }
}


const create_login = async (req,res)=>{
    const {email,password} = req.body;

    try{
        const existUser = await userModel.findOne({email:email})
          if(!existUser){
            return res.status(422).json({success:false,message:"Invalid Email"})
          }

          const matchPassword = await bcrypt.compare(password,existUser.password)

            const token =await existUser.generateAuthToken();
            console.log(token)
            res.cookie("jwtoken",token, {
                expire: new Date(Date.now() + 25892000000),
                httpOnly:true
            });

          if(!matchPassword){
             return res.status(422).json({success:false,message:"Invalid Password"})
          }

          res.status(201).json({success:true,message:"User Login Successfully",data:existUser})

    }
    catch(error){
        console.log(error)
        res.status(500).json({success: false, message:"Something went wrong"})
    }
}

const fetch_all_user = async (req,res)=>{
    try{
        const  data = await userModel.find({});
         res.status(201).json({success:true, data:data})
    }
    catch(error){
        console.log(error)
        res.status(500).json({success: false, message:"Something went wrong"})
    }
}

const fetch_signle_user = async (req,res)=>{
    try{
        const  data = await userModel.findOne({_id:req.params.id});
         res.status(201).json({success:true, data:data})
    }
    catch(error){
        console.log(error)
        res.status(500).json({success: false, message:"Something went wrong"})
    }
}

const update_user = async (req,res) =>{
    const {name,email,password,address} = req.body;
    try{

        const hashPassword = await bcrypt.hash(password,10)
        const update_data = await userModel.findByIdAndUpdate({_id:req.params.id},{
            $set:{
                name:name,
                email:email,
                password:hashPassword,
                address:address
            }
        })

        res.status(201).json({success:true,message:"User has been updated Successfully"})

    }
    catch(error){
        console.log(error)
        res.status(500).json({success: false, message:"Something went wrong"})
    }
}



const delete_user = async (req,res)=>{
    try{
        const  data = await userModel.findByIdAndDelete({_id:req.params.id});
        res.status(201).json({success:true,message:"User has been Deleet Successfully"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({success: false, message:"Something went wrong"})
    }
}





module.exports={create_signup,create_login,fetch_all_user,update_user,delete_user,fetch_signle_user}
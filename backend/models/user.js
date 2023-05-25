const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        default: null
    },
    email:{
        type:String,
        default: null
    },
    password:{
        type:String,
        default: null
    },
    address:{
        type:String,
        default:null
    },
    tokens:[
        {
             token:{
                type:String,
                required:true
             }
        }
    ]
},
{
    timestamps:true
}
)

//const secretKey = process.env.SECRET_KEY;

UserSchema.methods.generateAuthToken = async function (){
    try{

        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token})
          await this.save();
          return token;
    }catch(err){
        console.log(err)
    }
}



const User = mongoose.model("User",UserSchema)
module.exports=User
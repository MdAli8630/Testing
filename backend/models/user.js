const mongoose = require('mongoose');

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
    }
},
{
    timestamps:true
}
)

const User = mongoose.model("User",UserSchema)
module.exports=User
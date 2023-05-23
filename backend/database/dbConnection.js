const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/crud")
.then((res)=>{
    console.log("Database is Connected")
}).catch((err)=>{
    console.log(err)
})

module.exports=mongoose;
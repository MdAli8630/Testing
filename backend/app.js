const express = require('express');
require('dotenv').config();
const cors = require("cors");
const bodyParser = require("body-parser");
const UserRouter = require('./routes/userRoute');
const cookieParser = require('cookie-parser');
const { ConnectionStates } = require('mongoose');
require("./database/dbConnection")

const app = express();


const PORT = process.env.PORT || 8080

app.use(cookieParser())

// app.use(cors({
//     origin: '*'
//   }));
  app.use(cors({
    origin:["http://localhost:3000"],
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    credentials:true,
  }));


  app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json({ limit: '50mb' }))

app.use(express.json())

app.get("/contact",(req,res)=>{
  res.cookie("Test","ali")
    res.send("Hello World")
});


app.use("/user",UserRouter)

app.listen(PORT,()=>{
    console.log("Server is listening.....")
})
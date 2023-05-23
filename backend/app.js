const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const UserRouter = require('./routes/userRoute');
require("./database/dbConnection")

const app = express();


const PORT = process.env.PORT || 8080

app.use(cors({
    origin: '*'
  }));
  app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
  }));


  app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json({ limit: '50mb' }))

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Hello World")
});


app.use("/user",UserRouter)

app.listen(PORT,()=>{
    console.log("Server is listening.....")
})
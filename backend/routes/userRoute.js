const express = require("express");
const { create_signup, create_login, update_user, fetch_all_user, delete_user, fetch_signle_user } = require("../controllers/userController");
const Authenticate = require('../middleware/authenticate')
const UserRouter = express.Router();

UserRouter.post('/signup',create_signup);
UserRouter.post('/login',create_login);
UserRouter.get('/fetch-user',Authenticate,fetch_all_user);
UserRouter.get('/fetch-signle-user/:id',fetch_signle_user);
UserRouter.put('/update-user/:id',update_user);
UserRouter.delete('/delete-user/:id',delete_user);



module.exports=UserRouter;

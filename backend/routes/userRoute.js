const express = require("express");
const { create_signup, create_login, update_user, fetch_all_user, delete_user } = require("../controllers/userController");

const UserRouter = express.Router();

UserRouter.post('/signup',create_signup);
UserRouter.post('/login',create_login);
UserRouter.get('/fetch-user',fetch_all_user);
UserRouter.put('/update-user/:id',update_user);
UserRouter.delete('/delete-user/:id',delete_user);

module.exports=UserRouter;

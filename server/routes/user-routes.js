//Here we are going to add all the routes that have to do something with posts, any action
//we dont see the purpose of having controller and routes differently but as the code gets complex you will feel its need.

import express from 'express';
//not a default import, its a function
import {
  getAllUser,
  login,
  signup,
  isLoggedIn,
  logout,
  RefreshToken
} from "../controllers/user-controller.js";

const router = express.Router();

//we should not write our logic here as it can make the page long and messy
router.get('/', getAllUser);
router.post("/signup", signup);
router.post('/login', login);
router.post('/newaccesstoken', RefreshToken)
router.get('/isloggedin', isLoggedIn);
router.get('/logout', logout);
export default router;
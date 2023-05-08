//First file of controller.
//here we are going to create all the handlers for our routes, meaning all logic of routes/posts is here

import User from "../models/user.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import JWT_SECRET_KEY from "dotenv/config.js";
import JWT_REFRESH_KEY from "dotenv/config.js";
let refreshArr = [];
//finding something inside a model takes time hence function is asynchronous
export const getAllUser = async (req,res)=>{
    let users;
    try {
        //retrieve all the post that we have currently in our database
        users = await User.find();
        // console.log(users);
        //function returning posts
    } catch (error) {
        return console.log(error);
    }
    if(!users){
        return res.status(404).json({message: "No user found"});
    }
    return res.status(200).json({users});
};


export const signup = async(req, res, next)=>{
    const {name, email, password} = req.body;
    let existingUser;
    try{
        existingUser=await User.findOne({email});
    }catch(error){
        return console.log(error);
    }
    if(existingUser){
        res.status(400).json({message: "user already exists ! "});
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password:hashedPassword,
        Memorys:[],
    });
    try{
      await user.save();
    }catch(error){
       return console.log(error);
    }
    return res.status(201).json({user});
};



export const login= async(req, res,next)=>{
    const {email, password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        return console.log(error);
    }
    if (!existingUser) {
        return res.status(400).json({ message: "No user registered with this email ! " });
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect Password"});
    }
    const accessToken = jwt.sign({ id:existingUser._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "20s"
    });
    // console.log("token : ");
    // console.log(existingUser);
    // console.log("This is the problem: "+token);
    
    const refreshToken = jwt.sign({ id: existingUser._id }, process.env.JWT_REFRESH_KEY);
    refreshArr.push(refreshToken);

    return res
      .cookie("refreshToken", refreshToken, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 30*60*24),
        httpOnly: true,
        sameSite: "strict",
        secure:"true"
      
        // secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ message: "Login Success", accessToken, refreshToken}); //to fetch blogs of user int frontend who is currently logged in 
} 


export const RefreshToken = async (req,res) =>{
  //receiving refresh token
  const refreshToken = req.body.token;
  if (!refreshToken) {
    return res.json({ message: "Not authenticated, Login in with valid creditentials" });
  }

  if (!refreshArr.includes(refreshToken)) {
    return res.json({ message: "Refresh token not found, login again" });
  }


  jwt.verify(refreshToken, JWT_REFRESH_KEY, (err, user) => {
    if (err) {
      //means invalid user trying to access
      return res.status(400).json({ message: "Invalid Refresh Token" });
    }
    const accessToken = jwt.sign({id:user.id}, process.env.JWT_SECRET_KEY, {
      expiresIn: "20s",
    });

    return res.json({message:"New Access Token generated", accessToken });
  });
}



export const logout = (req, res) =>{
  // console.log(res);
  res.cookie("refreshToken", "", {
    path:"/",
    expires: new Date(0),
    httpOnly:true,
    sameSite:"lax"
  }).send();

}



export const isLoggedIn = async (req, res) => {
  const token = req.cookies.refreshToken;
  console.log(req);
  if (!token) {
    return res.json(false);
  }
  return jwt.verify(token, process.env.JWT_REFRESH_KEY, (err) => {
    if (err) {
      return res.json(false);
    }
    return res.json(true);
  });
};
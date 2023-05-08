import memories from "../models/memories";
import User from "../models/user";
import mongoose from "mongoose";

export const getAllMemories = async (req,res,next)=>{
    let m_cards;
    try {
        m_cards = await memories.find().populate('creator');
        console.log(m_cards);
    }catch(err){
        console.log(err);
    }
    if(!m_cards){
        return res.status(404).json({message:"No memory card found"});
    }
    return res.status(200).json({m_cards});
}

export const addMemory = async (req,res,next)=>{
    const {tittle, description, image, creator}= req.body;

    //checking if user is authorized to create memories
    let existingCreator;
    try {
        existingCreator = await User.findById(creator);
    } catch (error) {
        console.log(error);
    }
    if(!existingCreator){
        return res.status(400).json({message:"Unable to find user by this id"});
    }


    const memory = new memories({
        tittle,description, image, creator
    })
    try {
        // await memory.save(); //Instead of directly saving the memory, We have to associate memory to the user who is logged i
        const session = await mongoose.startSession();
        session.startTransaction();
        await memory.save({session});
        existingCreator.Memorys.push(memory);
        await existingCreator.save({session});
        await session.commitTransaction();
    } catch (error) {
        return console.log(error);
    }
    return res.status(200).json({memory});
}

export const updateMemory = async (req,res,next)=>{
    //we can grab the id from req.params and params contains all the variable which we defined in parameters
    const {tittle, description} = req.body;
    const memoryid = req.params.id;
    console.log(req);

    let memory;
    try {
        memory = await memories.findByIdAndUpdate(memoryid, {
            tittle,
            description
        })
    } catch (error) {
        console.log(error);
    }
    console.log(memory);
    if(!memory){
        return res.status(500).json({message:"Unable to update the memory"});
    }
    return res.status(200).json({memory});
}

export const getMemoryById = async(req, res, next)=>{
    const memoryid = req.params.id;
    let memory;
    try {
        memory = await memories.findById(memoryid);
    } catch (error) {
       console.log(error); 
    }
    // console.log(memory);
    if(!memory){
        return res.status(404).json({message:"No Memories found"});
    }
    return res.status(200).json({memory});
}


export const deleteMemory = async(req, res, next)=>{
    let memoryid = req.params.id;
    let memory;
    try {
        memory = await memories.findByIdAndRemove(memoryid).populate('creator');
        // console.log(memory.creator);
        await memory.creator.Memorys.pull(memory);
        await memory.creator.save();
    } catch (error) {
        console.log(error);
    }
    console.log(memory);
    if(!memory){
        return res.status(500).json({message: "unable to delete this memory"});
    }

    //memory is deleted from the memories collection but we need to remove it from user array as well
    return res.status(200).json({message: "Successful deletion"})
}


export const getUserById = async (req,res,next)=>{
    const userId = req.params.id;
    console.log(userId);
    console.log("userid");
    let userMemories;
    try {
        userMemories = await User.findById(userId).populate('Memorys');
    } catch (error) {
        console.log(error);
    }
    if(!userMemories){
        return res.status(404).json({message:" No Memories found here"});
    }
    return res.status(200).json({user:userMemories});
}

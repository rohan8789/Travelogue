import express from "express";
import { addMemory, deleteMemory, getAllMemories, getMemoryById, getUserById, updateMemory } from "../controllers/memories-controller";
import verifyToken from "../utils/verifyToken";
// import { RefreshToken } from "../controllers/user-controller";
const memoriesRouter = express.Router();

memoriesRouter.get("/", verifyToken, getAllMemories);
memoriesRouter.post('/add', verifyToken, addMemory);
//put is to update the user
memoriesRouter.put("/update/:id", verifyToken, updateMemory);
memoriesRouter.get("/:id", verifyToken, getMemoryById);
memoriesRouter.delete('/:id', verifyToken, deleteMemory);
memoriesRouter.get('/user/:id', verifyToken, getUserById);
export default memoriesRouter;



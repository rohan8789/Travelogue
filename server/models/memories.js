import mongoose from "mongoose";

const Schema = mongoose.Schema;

const memoriesSchema = new Schema({
  tittle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  creator: {
    //relate user with memory, each memory will contain each single user
    type: mongoose.Types.ObjectId,
    ref:"User",
    required: true,
  },
});

export default mongoose.model("memories", memoriesSchema);
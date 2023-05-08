import mongoose  from "mongoose";

//A Mongoose Schema defines the structure and property of the document in the MongoDB collection. This Schema is a way to define expected properties and values along with the constraints and indexes.

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  //relate user with memory, each memory will contain each single user
  Memorys: [{ type: mongoose.Types.ObjectId, ref: "memories", required: true }],
});

//Turning schema into model


//We are exporting a mongoose model from the postMessage file and later we will run command such as crud 
export default mongoose.model("User", userSchema);
 
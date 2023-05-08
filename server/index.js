import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/user-routes.js";
import memoriesRouter from "./routes/memories-routes.js";
import cookieParser from "cookie-parser";
import JWT_SECRET_KEY from "dotenv";
import passport from "passport";
import Google from "passport-google-oauth20";
//config Express App
const app = express();
app.use(cookieParser());

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));
app.use(cors({credentials:true, origin:"http://localhost:3000"}));
app.use(express.json());
//every route or action starts here
app.use("/api/user", router);
app.use("/api/memories", memoriesRouter);


app.use(express.json({ limit: "100mb", extended: true }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// route for checking API is running or not
app.get("/", (req, res) => {
  res.send("API is running");
});




// MongoDB connection URL
const CONNECTION_URL = `mongodb+srv://rohansingh99:8789471640@cluster0.f5282oy.mongodb.net/memories?retryWrites=true&w=majority`;

//config PORT
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

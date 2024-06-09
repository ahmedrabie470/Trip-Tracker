// Set up global error handling for Uncaught exception
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
});

import express from "express";
import { connection } from "./dataBases/dbConnection.js";
import { globalError } from "./src/middleware/glopalErrorHandling.js";
import userRouter from "./src/controllers/userController/user.router.js";
import tripRouter from "./src/controllers/tripController/trip.router.js";
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config()
connection.sync();
const app = express();
//connect front-end with the back-end
app.use(
  cors({
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);

const port = 3000;
app.use(express.json());
//static folder for images
app.use('/uploads',express.static('uploads'))
app.use( userRouter);
app.use( tripRouter);

// Set up globalError middleware handling for handled all errors
app.use(globalError);

// Set up global error handling for handled Rejection
process.on("unhandledRejection", (err) => {
  console.log("error", err);
});
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

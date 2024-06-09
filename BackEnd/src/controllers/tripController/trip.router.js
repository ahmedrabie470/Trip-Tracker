import express from "express";
import {
  addStaticTrip,
  addTrip,
  deleteTrip,
  getAllStaticTrips,
  getAllUserTrips,
  getSingleTrip,
  getTripsByCountry,
  updateTrip,
} from "./trip.controller.js";
import { validation } from "../../middleware/validation.js";
import { tripSchema } from "./trip.validation.js";
import { auth } from "../../middleware/auth.js";
import { fileUpload } from "../../fileUpload/fileUpload.js";

const tripRouter = express.Router();

tripRouter.post("/addStaticTrip", auth, fileUpload("img"), addStaticTrip);
tripRouter.post("/addTrip", auth , addTrip);
tripRouter.get("/allTrips/:id", auth, getAllUserTrips);
tripRouter.get("/allStaticTrips", getAllStaticTrips);
tripRouter.get("/singleTrip/:id", auth, getSingleTrip);
tripRouter.get("/tripCountry/:destination", auth, getTripsByCountry);
tripRouter.put("/updateTrip/:id", auth, updateTrip);
tripRouter.delete("/deleteTrip/:id", auth, deleteTrip);

export default tripRouter;

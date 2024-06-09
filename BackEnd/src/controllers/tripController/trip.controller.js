import { staticTripModel } from "../../../dataBases/models/trip/staticTrip.models.js";
import { tripModel } from "../../../dataBases/models/trip/trip.models.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utilits/AppError.js";

// Create a new trip

export const addTrip = catchError(async (req, res, next) => {
  const receivedId = req.user.userId;
  req.body.receivedId = receivedId;
  const trip = await tripModel.create(req.body);
  if (trip) return res.json({ message: "success", trip });
  next(
    new AppError("Error verifying token. You must be logged in.", 409),
  );
});

// Get all User trips


export const getAllUserTrips = catchError(async (req, res, next) => {
  const allTrips = await tripModel.findAll({ where: { receivedId: req.params.id } });
  if (allTrips.length > 0) return res.json({ message: "success", allTrips });
  return next(new AppError("No Trips Founded", 404));
});








// Create a new static trip
export const addStaticTrip = catchError(async (req, res) => {
  const filename = req.file.filename;
  req.body.img = filename;
  let trip = await staticTripModel.create(req.body);
  if (trip) return res.json({ message: "success", trip });
  next(
    new AppError("Error verifying token. You must be logged in.", 409),
    ("Invalid image format. Please upload images only.", 404)
  );
});

// function to modify the 'img' field after find
const modifyImgField = (trips) => {
  trips.forEach((trip) => {
    trip.img = process.env.BASE_URL+`/uploads/${trip.img}`;
  });
  return trips;
};



// Get Get All Static Trips
export const getAllStaticTrips = catchError(async (req, res, next) => {
  const allTrips = await staticTripModel.findAll();
  modifyImgField(allTrips);
  if (allTrips.length > 0) return res.json({ message: "success", allTrips });
  console.log(allTrips);
  return next(new AppError("No Trips Founded", 404));
});



export const getTripsByCountry = catchError(async (req, res, next) => {
  const { destination } = req.params;
  const trips = await staticTripModel.findAll({ where: { destination } });
  modifyImgField(trips);
  if (trips.length<=0) next(new AppError("no trip found", 404));
  res.json({ message: "success", trips });
});

// Get a single trip by ID
export const getSingleTrip = catchError(async (req, res, next) => {
  const { id } = req.params;
  const trip = await staticTripModel.findByPk(id);
  trip.img = process.env.BASE_URL+`/uploads/${trip.img}`;
  if (!trip) return next(new AppError("This Trip not found", 404));
  res.json({ message: "success", trip });
});



// Delete a trip by ID
export const deleteTrip = catchError(async (req, res, next) => {
  const { id } = req.params;
  const deleted = await tripModel.destroy({ where: { id } });
  if (deleted) res.json({ message: "Deleted" });
  return next(new AppError("This Trip not found", 404));
});


// Delete a Static trip by ID
export const deleteStaticTrip = catchError(async (req, res, next) => {
  const { id } = req.params;
  const deleted = await staticTripModel.destroy({ where: { id } });
  if (deleted) res.json({ message: "Deleted" });
  return next(new AppError("This Trip not found", 404));
});


// Update a trip by ID
export const updateTrip = catchError(
  ("/trips/:id",
  async (req, res, next) => {
    const { id } = req.params;
    const [updated] = await tripModel.update(req.body, { where: { id } });
    if (updated) {
      const updatedTrip = await tripModel.findByPk(id);
      res.json({message:"success" , updatedTrip});
    } else {
      return next(new AppError("This Trip not found", 404));
    }
  })
);



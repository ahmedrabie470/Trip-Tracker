import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import mainImg from "../../Assets/images/pexels-sinileunen-5870352.jpg";

export default function Profile() {
  const [trips, setTrips] = useState([]);
  const userToken = useSelector((state) => state.token.userToken);
  const decodedToken = useSelector((state) => state.token.decodedToken);
  let [search, setSearch] = useState("");
  
  let navigate = useNavigate();
  function handleOnUpdate(id) {
    navigate(`/updateTrip/${id}`);
    }
    // Function Get All User Trips And
    
    const receivedId =  decodedToken?.userId
    async function getAllUserTrips() {
    try {
      let { data } = await axios.get(`http://localhost:3000/allTrips/${receivedId}`, {
        headers: { token: `${userToken}` },
      });
      setTrips(data.allTrips);
    } catch (err) {
      console.log("no trips found");
    }
  }

  // Function To Delete User Trips And
  async function deleteTrip(id) {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/deleteTrip/${id}`,
        {
          headers: { token: `${userToken}` },
        }
      );
      if (data.message === "Deleted") {
        // Remove the deleted trips from the trips array
        const updatedTrips = trips.filter((trips) => trips.id !== id);
        setTrips(updatedTrips);
        console.log("Trip deleted successfully.", updatedTrips);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (decodedToken) {
      getAllUserTrips();
    }
  }, [decodedToken]);

  return (
    <>
    
      <div className="container d-flex animate__animated animate__fadeIn  me-5 mt-5 justify-content-center ">
        
        <div className="row">
        <h3>Explore travel guides and itineraries</h3>
            <div className="d-flex align-items-center">
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className="form-control w-25 "
                placeholder="Search for a destination"
              />
              <i className="fa fa-search mx-2"></i>
            </div>
          {trips.length == 0 ? (
            <div className="text-center mt-5">
              <h1 className="primary">No Trips Found</h1>
              <i className="spinner-grow  mx-2 primary text-center fs-1 mt-5"></i>
              <i className="spinner-grow mx-2 shadowBg text-center fs-1 mt-5"></i>
              <i className="spinner-grow  mx-2 secondary text-center fs-1 mt-5"></i>
            </div>
          ) : (
            trips
              .filter((trip) => {
                return search.toLowerCase() === ""
                  ? trip
                  : trip?.destination
                      .toLowerCase()
                      .includes(search.toLowerCase());
              })
              .map((trip, key) => (
                <div
                  className="col-md-4 mt-4 mb-3 gx-4 text-decoration-none text-dark"
                  to={`/tripsDetails/${trip.id}`}
                  key={trip.id}
                >
                  <div className="card  w-100  h-100  ">
                    <img
                      src={mainImg}
                      className="card-img-top"
                      alt={trip.origin}
                    />
                    <div className="card-body ">
                      <h5 className="card-title">From : {trip.origin}</h5>
                      <h5 className="card-text">To : {trip.destination}</h5>
                      <h6>Status : {trip.status}</h6>
                      <h6>Start Data : {trip.startDate.split("T")[0]} </h6>
                      <h6>End Data : {trip.endDate.split("T")[0]} </h6>
                    </div>
                    <div className=" mx-3 d-flex justify-content-center align-items-center">
                      <button
                        onClick={() => {
                          deleteTrip(trip?.id);
                        }}
                        className=" w-50 me-3 btn btn-dark "
                      >
                        {" "}
                        Delete: <i className="fa-solid fa-trash"></i>
                      </button>
                      <button
                        onClick={() => {
                          handleOnUpdate(trip?.id);
                        }}
                        className="w-50 me-3 btn btn-dark "
                      >
                        Update : <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </>
  );
}

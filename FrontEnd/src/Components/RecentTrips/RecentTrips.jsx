import React, { useEffect, useState } from "react";
import axios from "axios";
import {  useDispatch, useSelector } from "react-redux";
import { decodeToken } from "../../Redux/userTokenSlice";
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";

export default function RecentTrips() {
  const dispatch = useDispatch();
  const [trip, setTrip] = useState([]);
  const userToken = useSelector(state => state.token.userToken);
  const decodedToken = useSelector(state => state.token.decodedToken);
  let [search, setSearch] = useState("");
  useEffect(() => {
    // Dispatch the action to decode the token
     dispatch(decodeToken(userToken));
  }, [dispatch, userToken]);
  const userName =  decodedToken?.name
  const [clickedLink, setClickedLink] = useState(null);


  // Function to handle click on a link
  const handleLinkClick = (link) => {
    setClickedLink(link);
  };
  function  addTrip  (tripInfo) {
    toast('Trip Added Successfully ')
   };


  // Function Get All Static Trips And Category for Trip
  async function getAllStaticTrips(destination = "") {
    try {
      if (destination === "") {
        let { data } = await axios.get("http://localhost:3000/allStaticTrips", {
          headers: { token: `${userToken}`},
        });

        setTrip(data.allTrips);
        
      } else {
        try {
          handleLinkClick()
          const { data } = await axios(
            `http://localhost:3000/tripCountry/${destination}`,{
          headers: { token: `${userToken}`},

            }
          );
          setTrip(data?.trips);
        } catch (err) {
          console.log("No Trips Found ");
        }
      }
    } catch (err) {
      console.log("Error verifying token you must be logged in");
    }
  }
  useEffect(() => {
    getAllStaticTrips("");
  }, []);
  
  return (
    <>
      <div className="container animate__animated animate__fadeIn">
        <div className="row d-flex text-center justify-content-center align-items-center">
          <div className="w-50 my-3">
            <h1>
              Hello <span className="primary">{userName}</span>
            </h1>
            <h3>Explore travel guides and itineraries</h3>
            <div className="d-flex align-items-center">
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className="form-control w-100 "
                placeholder="Search for a destination"
              />
              <i className="fa fa-search mx-2"></i>
            </div>
            <p className="mt-2 text-muted">
              {" "}
              Or browse our most popular destinations:
            </p>
            <div className="stroke    rounded-2 ">
              <div className="d-flex justify-content-center align-items-center navbar navbar-expand-lg p-4">
                <Link
                  onClick={() => {
                    getAllStaticTrips("");
                    handleLinkClick(6);
                  }}
                  className={
                    clickedLink === 6
                      ? "page secondary text-white nav-link active rounded-5 px-3 py-2"
                      : "page bg-white mx-2 nav-link active rounded-5 px-3 py-2"
                  }
                >
                  All Trips
                </Link>
                <Link
                  onClick={() => {
                    getAllStaticTrips("Los Angeles");
                    handleLinkClick(1);
                  }}
                  className={
                    clickedLink === 1
                      ? "page secondary text-white nav-link active rounded-5 px-3 py-2"
                      : "page bg-white mx-2 nav-link active rounded-5 px-3 py-2"
                  }
                >
                  Los Angeles
                </Link>
                <Link
                  onClick={() => {
                    getAllStaticTrips("italy");
                    handleLinkClick(2);
                  }}
                  className={
                    clickedLink === 2
                      ? "page secondary text-white nav-link active rounded-5 px-3 py-2"
                      : "page bg-white mx-2 nav-link active rounded-5 px-3 py-2"
                  }
                >
                  Italy
                </Link>
                <Link
                  onClick={() => {
                    getAllStaticTrips("Paris");
                    handleLinkClick(3);
                  }}
                  className={
                    clickedLink === 3
                      ? "page secondary text-white nav-link active rounded-5 px-3 py-2"
                      : "page bg-white mx-2 nav-link active rounded-5 px-3 py-2"
                  }
                >
                  Paris
                </Link>
                <Link
                  onClick={() => {
                    getAllStaticTrips("Germany");
                    handleLinkClick(4);
                  }}
                  className={
                    clickedLink === 4
                      ? "page secondary text-white nav-link active rounded-5 px-3 py-2"
                      : "page bg-white mx-2 nav-link active rounded-5 px-3 py-2"
                  }
                >
                  Germany
                </Link>
                <Link
                  onClick={() => {
                    getAllStaticTrips("japan");
                    handleLinkClick(5);
                  }}
                  className={
                    clickedLink === 5
                      ? "page secondary text-white nav-link active rounded-5 px-3 py-2"
                      : "page bg-white mx-2 nav-link active rounded-5 px-3 py-2"
                  }
                >
                  Japan
                </Link>
              </div>
            </div>

            <div className="mt-5">
              <p>Select From This Trips Or Add Your Customization Trip</p>
              <Link
                to={"/addTrip"}
                className="btn btn-dark secondary border-0 mt-0 "
              >
                From Here {">>"}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container d-flex animate__animated animate__fadeIn  me-5 ">
        <div className="row">
          {trip.length == 0 ? (
            <div className="text-center mt-5">
              <h1 className="primary">No Trips Found</h1>
              <i className="spinner-grow  mx-2 primary text-center fs-1 mt-5"></i>
              <i className="spinner-grow mx-2 shadowBg text-center fs-1 mt-5"></i>
              <i className="spinner-grow  mx-2 secondary text-center fs-1 mt-5"></i>
            </div>
          ) : (
            trip
              .filter((trip) => {
                return search.toLowerCase() === ""
                  ? trip
                  : trip?.destination
                      .toLowerCase()
                      .includes(search.toLowerCase());
              })
              .map((trip, key) => (
                <div
                  className="col-md-3  mb-3 gx-4 text-decoration-none text-dark"
                  to={`/tripsDetails/${trip.id}`}
                  key={trip.id}
                >
                  <div className="card  w-100  h-100  ">
                    <img
                      src={trip.img}
                      className="card-img-top"
                      alt={trip.origin}
                      width={40}
                      height={220}
                    />
                    <Link to={`/tripsDetails/${trip.id}`} className="card-body ">
                      <h5 className="card-title">From : {trip.origin}</h5>
                      <h5 className="card-text">To : {trip.destination}</h5>
                      <h6>Status : {trip.status}</h6>
                      <h6>Start Data : {trip.startDate.split("T")[0]} </h6>
                      <h6>End Data : {trip.endDate.split("T")[0]} </h6>

                    </Link>
                      <button onClick={()=>{addTrip(trip)}} className="btn btn-dark secondary border-0 w-50 ">
                        Add This Trip
                       <Toaster/>
                      </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>    </>
  );
}

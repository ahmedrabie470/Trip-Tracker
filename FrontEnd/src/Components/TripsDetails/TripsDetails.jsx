import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function TripDetails() {
  const [tripDetails, setTripDetails] = useState(null);
  const { id } = useParams();
  let {userToken} = useSelector((state) => state?.token )
  async function getTripDetails() {
    try {
      
      const { data } = await axios.get(
        `http://localhost:3000/singleTrip/${id}`,{
          headers: {
             token: `${userToken}` ,
             "Content-Type": "application/json",  
          },
        }
      );
      setTripDetails(data?.trip);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getTripDetails();
  }, []);
  
  return (
    <>
  <h1 className="text-center primary">All Your Trips</h1>
      <div className="container animate__animated animate__fadeIn  shadowBg1  p-3 rounded-4">
        <div className="row  d-flex justify-content-center align-items-center">
          {tripDetails ? (
            <div className="col-md-4   ">
              <img className="w-100 mt-2 rounded-4" src={tripDetails?.img} alt="" />
            </div>
          ) : (
            <div className='text-center'>
              <h1 className="primary">No Trip Found </h1>
                  <i className="spinner-grow  mx-2 primary text-center fs-1 mt-5">
                  </i>
                    <i className="spinner-grow mx-2 shadowBg text-center fs-1 mt-5">
                    </i>
                      <i className="spinner-grow  mx-2 secondary text-center fs-1 mt-5">
                      </i>
                  </div>
          )}
{tripDetails ?
<div className="col-md-8   align-items-center ">
            <div className=" p-2 rounded-4  d-flex justify-content-between align-items-center">
              <div className="w-100">
                <h3 >
                  From :{" "}
                  <span className=" primary">
                    {tripDetails?.origin}
                  </span>
                </h3>
                <h4 className="mt-4  mb-3">
                Destination :{" "}
                  <span className="primary">
                    {tripDetails?.destination}
                  </span>
                </h4>
                <div ><span className="primary">Start Date :</span>  {tripDetails.startDate.split("T")[0]}</div>
              {" "}
              <div> <span className="primary">End Date : </span> {tripDetails.endDate.split("T")[0]}</div>
              </div>
            </div>
          </div>:''}
          
        </div>
      </div>    </>
  );
}

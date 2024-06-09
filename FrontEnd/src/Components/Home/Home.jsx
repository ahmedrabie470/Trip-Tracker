import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="home">
        <div className="layer text-center d-flex animate__animated  animate__fadeIn justify-content-center align-items-center">
          <div className="row d-flex justify-content-center align-items-center ">
            <div className="">
              <div>
                <h1 className="text-light ">Enjoy your trip now</h1>
              </div>
              <Link
                to="/recentTrips"
                className="btn btn-dark  secondary mt-2 border-0 text-light"
              >
                Explore Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

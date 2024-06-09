import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { decodeToken, updateToken } from "../../Redux/userTokenSlice";

export default function Navbar() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const userToken = useSelector((state) => state.token.userToken);

  useEffect(() => {
    // Dispatch the action to decode the token
    dispatch(decodeToken(userToken));
  }, [dispatch, userToken]);

  const usePathName = () => {
    const location = useLocation();
    return location.pathname;
  };

  const currentPath = usePathName();

  function Logout() {
    dispatch(updateToken(""));
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg p-0 ">
        <div className="container ">
          <Link className="navbar-brand primary fs-1 fw-bold" to="/home">
            TripTracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userToken ? (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <button
                    onClick={() => {
                      Logout();
                    }}
                    className="nav-link active carousel-pointer"
                    aria-current="page"
                  >
                    Logout
                  </button>
                </li>
              
                <li>
                  <Link
                    className={
                      currentPath === "/recentTrips"
                        ? "nav-link active  secondary  rounded-5 px-4"
                        : "nav-link"
                    }
                    aria-current="page"
                    to="/recentTrips"
                  >
                    All Trips
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      currentPath === "/profile"
                        ? "nav-link active  secondary ms-3 rounded-5 px-4"
                        : "nav-link ms-3"
                    }
                    aria-current="page"
                    to="/profile"
                  >
                    <i className="fa-regular fa-user"></i>
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={
                      currentPath === "/login"
                        ? "nav-link active  secondary rounded-5 px-4"
                        : "nav-link"
                    }
                    aria-current="page"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      currentPath === "/register"
                        ? "nav-link active  secondary rounded-5 px-4"
                        : "nav-link"
                    }
                    aria-current="page"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

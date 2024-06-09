import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import React from "react";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Layout from "./Components/Layout/Layout";
import { globalStore } from "./Redux/store";
import { Provider } from "react-redux";
import Guard from "./Components/Guard/Guard";
import Profile from "./Components/Profile/Profile";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./Components/Home/Home";
import TripDetails from "./Components/TripsDetails/TripsDetails";
import AddTrip from "./Components/AddTrip/AddTrip";
import RecentTrips from "./Components/RecentTrips/RecentTrips";
import UpdateTrip from "./Components/Profile/UpdateTrip";

export default function App() {
  let routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: "/login", element: <Login /> },
        { path: "/profile", element: <Guard><Profile/></Guard> },
        { path: "/recentTrips", element: <Guard><RecentTrips /></Guard> },
        { path: "/home", element: <Guard><Home /></Guard> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/addTrip", element:<Guard><AddTrip/></Guard>  },
        { path: "/updateTrip/:id", element:<Guard><UpdateTrip/></Guard>},
        { path: "/tripsDetails/:id", element:<Guard><TripDetails/></Guard>  },
    ],
    },
  ]);
const queryClient = new QueryClient();
  return (
      <QueryClientProvider client={queryClient }>
    <Provider store={globalStore}>

    <RouterProvider router={routers}>
    </RouterProvider>
    </Provider>
      </QueryClientProvider>
  );
}

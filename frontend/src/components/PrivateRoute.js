
// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { isLoggedIn } from '../authHelper';

// const PrivateRoute = ({ children }) => {
//   const isAuthenticated = isLoggedIn(); // Use isLoggedIn to check for a valid token
//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;





// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { isLoggedIn } from '../authHelper';

// const PrivateRoute = ({ children }) => {
//   const isAuthenticated = isLoggedIn(); // Check if user is logged in
//   console.log("PrivateRoute - isAuthenticated:", isAuthenticated); // Debugging: Check authentication status

//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;




import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../authHelper";

const PrivateRoute = () => {
  const isAuthenticated = isLoggedIn(); // Check if user is logged in
  console.log("PrivateRoute - isAuthenticated:", isAuthenticated); // Debugging: Check authentication status

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Login from "./Login";
// import Register from "./pages/Register";
// import Profile from "./pages/Profile";
// import EditProfile from "./pages/EditProfile";
// import Dashboard from "./Dashboard";
// import Workout from "./pages/Workout";
// import PrivateRoute from "./PrivateRoute";
// import UserManagement from "./pages/UserManagement";
// import AdminDashboard from "./pages/Admin/AdminDashboard";
// import AdminLogin from "./pages/Admin/AdminLogin";
// import "./index.css";  
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles.css';

// function App() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/admin/login" element={<AdminLogin />} />
//         {/* <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} /> */}
//         <Route path="/register" element={<Register />} />

//         {/* Protected Routes */}
//         <Route element={<PrivateRoute />}>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/edit-profile" element={<EditProfile />} />
//           <Route path="/workout" element={<Workout />} />
//           <Route path="/user-management" element={<UserManagement />} />
//         </Route>
//       </Routes>
//     </>
//   );
// }

// export default App;



// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Profile from "./pages/Profile";
// import EditProfile from "./pages/EditProfile";
// import Dashboard from "./pages/Dashboard";
// import Workout from "./pages/Workout";
// import PrivateRoute from "./components/PrivateRoute";
// import UserManagement from "./pages/UserManagement";
// import AdminDashboard from "./pages/Admin/AdminDashboard";
// import AdminLogin from "./pages/Admin/AdminLogin";
// import "./index.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./styles.css";

// function App() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         {/* Root Route - Redirect to Login */}
//         <Route path="/" element={<Navigate to="/login" replace />} />

//         {/* Public Routes */}
//         <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/admin/login" element={<AdminLogin />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />

//         {/* Protected Routes */}
//         <Route element={<PrivateRoute />}>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/edit-profile" element={<EditProfile />} />
//           <Route path="/workout" element={<Workout />} />
//           <Route path="/user-management" element={<UserManagement />} />
//         </Route>

//         {/* 404 Fallback */}
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </>
//   );
// }

// export default App;






import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Trainers from "./pages/Trainers";
import Workouts from "./pages/Workouts";
import Time from "./pages/Time";
import PrivateRoute from "./components/PrivateRoute";
import AdminPrivateRoute from "./components/AdminPrivateRoute"; // Add this for admin routes
import Layout from "./components/Layout";
import "./styles.css";

function App() {
  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes for Regular Users */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/workout" element={<Workouts />} />
          <Route path="/time" element={<Time />} />
        </Route>

        {/* Protected Routes for Admin */}
        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
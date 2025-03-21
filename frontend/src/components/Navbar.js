// import { Link } from "react-router-dom";

// const Navbar = () => {
//     return (
//         <nav>
//             <ul>
//                 <li><Link to="/login">Login</Link></li>
//                 <li><Link to="/register">Register</Link></li>
//                 <li><Link to="/dashboard">Dashboard</Link></li>
//             </ul>
//         </nav>
//     );
// };

// export default Navbar;


// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <div className="navbar">
//       <Link to="/">Login</Link>
//       <Link to="/register">Register</Link>
//       <Link to="/dashboard">Dashboard</Link>
//     </div>
//   );
// }

// export default Navbar;



import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar"; 

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1565c0" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Fitness Tracker
        </Typography>
        <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
        <Button color="inherit" component={Link} to="/login">Login</Button>
        <Button color="inherit" component={Link} to="/register">Register</Button>
      </Toolbar>
    </AppBar>
  );
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear Token
    window.location.href = "/login"; // Redirect to Login
  };
  <button onClick={handleLogout}>Logout</button>

};

export default Navbar;

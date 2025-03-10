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

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}

export default Navbar;

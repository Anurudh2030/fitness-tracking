// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const token = localStorage.getItem("token"); // Get token from localStorage
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get("http://localhost:5001/api/users", {
//           headers: {
//             Authorization: `Bearer ${token}`, // Send token in header
//           },
//         });
//         setUsers(res.data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, [token]);

//   // Define handleDeleteUser function
//   const handleDeleteUser = async (userId) => {
//     try {
//       await axios.delete(`http://localhost:5001/api/users/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setUsers(users.filter((user) => user.id !== userId)); // Remove user from state
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Remove token on logout
//     navigate("/login"); // Redirect to login page
//   };

//   return (
//     <div className="admin-dashboard-container">
//       <div className="admin-dashboard-header">
//         <h1>Admin Dashboard</h1>
//         <button onClick={handleLogout}>Logout</button>
//       </div>

//       <div className="admin-dashboard-grid">
//         {/* Manage Users Section */}
//         <div className="admin-dashboard-card">
//           <h2>Manage Users</h2>
//           {users.length > 0 ? (
//             users.map((user) => (
//               <div key={user.id} className="user-item">
//                 <p>{user.name}</p>
//                 <button onClick={() => navigate(`/edit-user/${user.id}`)}>Edit</button>
//                 <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
//               </div>
//             ))
//           ) : (
//             <p>No users found.</p>
//           )}
//           <button onClick={() => navigate("/add-user")}>Add New User</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;






import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; // Import the CSS file

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token"); // Get token from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/users", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in header
          },
        });
        console.log("API Response:", res.data); // Log the response
        setUsers(res.data); // Update the state with the fetched users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [token]);

  const handleDeleteUser = async (userId) => {
    console.log("Deleting user with ID:", userId); // Log the user ID
    if (!userId) {
      console.error("User ID is undefined!"); // Log an error if userId is undefined
      return;
    }

    try {
      await axios.delete(`http://localhost:5001/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user.id !== userId)); // Remove user from state
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token on logout
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="admin-dashboard-grid">
        {/* Manage Users Section */}
        <div className="admin-dashboard-card">
          <h2>Manage Users</h2>
          {users.length > 0 ? (
            users.map((user) => {
              console.log("User ID:", user.id); // Log the user ID
              return (
                <div key={user.id} className="user-item">
                  <p>{user.name}</p>
                  <div>
                    <button onClick={() => navigate(`/edit-user/${user.id}`)}>Edit</button>
                    <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No users found.</p>
          )}
          <button onClick={() => navigate("/add-user")}>Add New User</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
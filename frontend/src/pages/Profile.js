// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Profile = () => {
//   const [user, setUser] = useState({});
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const token = localStorage.getItem("token"); // Get token from local storage

//   useEffect(() => {
//     axios
//       .get("http://localhost:5001/api/users/profile", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setUser(res.data);
//         setName(res.data.name);
//         setEmail(res.data.email);
//       })
//       .catch((err) => console.error("Error fetching profile:", err));
//   }, [token]);

//   const updateProfile = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.put(
//         "http://localhost:5001/api/users/profile",
//         { name, email },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setMessage("Profile updated successfully!");
//     } catch (error) {
//       setMessage("Error updating profile");
//       console.error("Profile update error:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Update Profile</h2>
//       {message && <p>{message}</p>}
//       <form onSubmit={updateProfile}>
//         <div>
//           <label>Name:</label>
//           <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </div>
//         <button type="submit">Update Profile</button>
//       </form>
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");

  const updateProfile = async (userData) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Retrieved Token:", token); // Debugging
  
      if (!token) {
        throw new Error("No authentication token found.");
      }
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
  
      const { data } = await axios.put("http://localhost:5001/api/users/profile", userData, config);
      console.log("Profile updated successfully:", data);
  
      return data; // Return data for further use
    } catch (error) {
      console.error("Profile update error:", error.response ? error.response.data.message : error.message);
    }
  };
  

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Authentication required. Please log in.");
        return;
      }

      try {
        const { data } = await axios.get("http://localhost:5001/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(data);
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data || err.message);
        setMessage("Failed to load profile data.");
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {message && <p>{message}</p>}
      {user && (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}

      <button onClick={() => navigate("/edit-profile")}>Edit Profile</button>
    </div>
  );
};

export default Profile;


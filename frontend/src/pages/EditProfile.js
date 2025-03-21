// import React, { useState, useEffect } from "react";

// const EditProfile = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: "",
//     });

//     useEffect(() => {
//         // Pre-fill with existing user data
//         const fetchUserData = async () => {
//             const token = localStorage.getItem("authToken");
//             const response = await fetch("http://localhost:5001/api/users/profile", {
//                 headers: { "Authorization": `Bearer ${token}` },
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 setFormData({ name: data.name, email: data.email, password: "" });
//             }
//         };
//         fetchUserData();
//     }, []);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const token = localStorage.getItem("authToken");
//         const response = await fetch("http://localhost:5001/api/users/update-profile", {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`,
//             },
//             body: JSON.stringify(formData),
//         });
//         const data = await response.json();
//         if (response.ok) {
//             alert("Profile Updated Successfully! ✅");
//         } else {
//             alert(`Error: ${data.message}`);
//         }
//     };

//     return (
//         <div>
//             <h2>Edit Profile</h2>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Name" />
//                 <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" />
//                 <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter New Password" />
//                 <button type="submit">Update Profile</button>
//             </form>
//         </div>
//     );
// };

// export default EditProfile;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser({ name: storedUser.name, email: storedUser.email, password: "" });
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized! Please log in again.");
        navigate("/login");
        return;
      }

      const { data } = await axios.put(
        "http://localhost:5001/api/users/profile",
        { name: user.name, email: user.email, password: user.password || undefined },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Profile updated successfully!");
      localStorage.setItem("user", JSON.stringify({ name: data.name, email: data.email }));
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      alert("Profile update failed. Try again.");
    }
  };

  return (
    <div className="container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={user.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={user.email} onChange={handleChange} required />

        <label>Password (Leave blank to keep current):</label>
        <input type="password" name="password" value={user.password} onChange={handleChange} />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;




import React, { useState, useEffect } from "react";

const EditProfile = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        // Pre-fill with existing user data
        const fetchUserData = async () => {
            const token = localStorage.getItem("authToken");
            const response = await fetch("http://localhost:5001/api/users/profile", {
                headers: { "Authorization": `Bearer ${token}` },
            });
            const data = await response.json();
            if (response.ok) {
                setFormData({ name: data.name, email: data.email, password: "" });
            }
        };
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:5001/api/users/update-profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
            alert("Profile Updated Successfully! ✅");
        } else {
            alert(`Error: ${data.message}`);
        }
    };

    return (
        <div>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Name" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter New Password" />
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default EditProfile;

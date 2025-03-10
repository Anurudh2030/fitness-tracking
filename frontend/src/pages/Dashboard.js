import React, { useEffect, useState } from "react";

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("authToken"); // Get token from storage
                const response = await fetch("http://localhost:5001/api/users/profile", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setUser(data);
                } else {
                    console.error("Error fetching user data:", data.message);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            {user ? (
                <div>
                    <h2>Welcome, {user.name} 👋</h2>
                    <p>Email: {user.email}</p>
                    <p>Workouts Logged: {user.workouts.length}</p>
                    <button>Edit Profile</button>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default Dashboard;

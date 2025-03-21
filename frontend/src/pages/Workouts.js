import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Workouts.css"; // Import the CSS file

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const token = localStorage.getItem("token"); // Get token from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/workouts", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in header
          },
        });
        console.log("API Response:", res.data); // Log the response
        setWorkouts(res.data); // Update the state with the fetched workouts
      } catch (error) {
        console.error("Error fetching workouts:", error);
        if (error.response) {
          console.error("Response Data:", error.response.data); // Log the response data
          console.error("Response Status:", error.response.status); // Log the response status
        }
      }
    };

    fetchWorkouts();
  }, [token]);

  const handleDeleteWorkout = async (workoutId) => {
    console.log("Deleting workout with ID:", workoutId); // Log the workout ID
    if (!workoutId) {
      console.error("Workout ID is undefined!"); // Log an error if workoutId is undefined
      return;
    }

    try {
      await axios.delete(`http://localhost:5001/api/workouts/${workoutId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWorkouts(workouts.filter((workout) => workout.id !== workoutId)); // Remove workout from state
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  return (
    <div className="workouts-container">
      <div className="workouts-header">
        <h1>Workouts</h1>
        <div className="workouts-actions">
          <button onClick={() => navigate("/add-workout")}>Add Workout</button>
        </div>
      </div>

      <div className="workouts-list">
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <div key={workout.id} className="workout-card">
              <h2>{workout.title}</h2>
              <p>
                <strong>Exercises:</strong> {workout.exercises.join(", ")}
              </p>
              <p>
                <strong>Duration:</strong> {workout.duration} minutes
              </p>
              <p>
                <strong>Calories Burned:</strong> {workout.caloriesBurned}
              </p>
              <div className="workout-actions">
                <button onClick={() => navigate(`/edit-workout/${workout.id}`)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteWorkout(workout.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No workouts found.</p>
        )}
      </div>
    </div>
  );
};

export default Workouts;
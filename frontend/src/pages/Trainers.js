import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Trainers.css"; // Import the CSS file

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const token = localStorage.getItem("token"); // Get token from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/trainers", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in header
          },
        });
        console.log("API Response:", res.data); // Log the response
        setTrainers(res.data); // Update the state with the fetched trainers
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };

    fetchTrainers();
  }, [token]);

  const handleDeleteTrainer = async (trainerId) => {
    console.log("Deleting trainer with ID:", trainerId); // Log the trainer ID
    if (!trainerId) {
      console.error("Trainer ID is undefined!"); // Log an error if trainerId is undefined
      return;
    }

    try {
      await axios.delete(`http://localhost:5001/api/trainers/${trainerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTrainers(trainers.filter((trainer) => trainer.id !== trainerId)); // Remove trainer from state
    } catch (error) {
      console.error("Error deleting trainer:", error);
    }
  };

  return (
    <div className="trainers-container">
      <div className="trainers-header">
        <h1>Trainers</h1>
        <div className="trainers-actions">
          <button onClick={() => navigate("/add-trainer")}>Add Trainer</button>
        </div>
      </div>

      <div className="trainers-list">
        {trainers.length > 0 ? (
          trainers.map((trainer) => (
            <div key={trainer.id} className="trainer-card">
              <h2>{trainer.name}</h2>
              <p>
                <strong>Specialization:</strong> {trainer.specialization}
              </p>
              <p>
                <strong>Experience:</strong> {trainer.experience} years
              </p>
              <p>
                <strong>Location:</strong> {trainer.location}
              </p>
              <div className="trainer-actions">
                <button onClick={() => navigate(`/edit-trainer/${trainer.id}`)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteTrainer(trainer.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No trainers found.</p>
        )}
      </div>
    </div>
  );
};

export default Trainers;
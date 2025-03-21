// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const WorkoutPage = () => {
//   const [workouts, setWorkouts] = useState([]);

//   useEffect(() => {
//     const fetchWorkouts = async () => {
//       try {
//         const { data } = await axios.get("/api/workouts");
//         setWorkouts(data);
//       } catch (error) {
//         console.error("Error fetching workouts:", error);
//       }
//     };

//     fetchWorkouts();
//   }, []);

//   return (
//     <div>
//       <h2>Workout List</h2>
//       {workouts.length > 0 ? (
//         <ul>
//           {workouts.map((workout) => (
//             <li key={workout._id}>{workout.name}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No workouts available.</p>
//       )}
//     </div>
//   );
// };

// export default WorkoutPage;


import React, { useEffect, useState } from "react";
import axios from "axios";

const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5001/api/workouts"); // Ensure correct API URL
        console.log("Fetched workouts:", data);
        setWorkouts(data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div>
    <h2>Workout List</h2>
    {workouts.length > 0 ? (
      <ul>
        {workouts.map((workout) => (
          // Ensure that workout has a title
          <li key={workout._id}>{workout.title}</li> 
        ))}
      </ul>
    ) : (
      <p>No workouts available.</p>
    )}
  </div>
  
  );
};

export default WorkoutPage;

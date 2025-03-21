
// import React from "react";
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
// import { useNavigate } from "react-router-dom";
// import { getUserData, logout } from "../authHelper";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const user = getUserData();
//   console.log("User Data:", user); 
//   if (!user) {
//     console.log("No user found, redirecting to login...");
//     navigate("/login");
//     return null;
//   }

//   const data = [
//     { day: "Mon", value: 3 },
//     { day: "Tue", value: 4 },
//     { day: "Wed", value: 2 },
//     { day: "Thu", value: 5 },
//     { day: "Fri", value: 4 },
//     { day: "Sat", value: 6 },
//     { day: "Sun", value: 3 },
//   ];

//   return (
//     <div className="min-h-screen bg-blue-100 p-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-blue-700">Fitness Tracker</h1>
//         <button 
//           onClick={() => { logout(); navigate("/login"); }} 
//           className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded"
//         >
//           Logout
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {/* Card 1 - replaced shadcn Card with div */}
//         <div className="bg-white shadow-md rounded-lg p-4">
//           <div className="p-2">
//             <h2 className="text-xl font-semibold text-gray-700">Total Workout Time</h2>
//             <p className="text-2xl text-blue-600 font-bold">56m</p>
//           </div>
//         </div>

//         {/* Card 2 - replaced shadcn Card with div */}
//         <div className="bg-white shadow-md rounded-lg p-4">
//           <div className="p-2">
//             <h2 className="text-xl font-semibold text-gray-700">Calories Burned</h2>
//             <p className="text-2xl text-blue-600 font-bold">1345 kcal</p>
//           </div>
//         </div>

//         {/* Card 3 - replaced shadcn Card with div */}
//         <div className="bg-white shadow-md rounded-lg p-4">
//           <div className="p-2">
//             <h2 className="text-xl font-semibold text-gray-700">Total Distance</h2>
//             <p className="text-2xl text-blue-600 font-bold">15 km</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white shadow-md p-6 mt-6 rounded-lg">
//         <h2 className="text-xl font-semibold text-gray-700">Activity Tracking</h2>
//         <ResponsiveContainer width="100%" height={250}>
//           <LineChart data={data}>
//             <XAxis dataKey="day" />
//             <YAxis />
//             <Tooltip />
//             <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




// import React from "react";
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
// import { useNavigate } from "react-router-dom";
// import { getUserData, logout } from "../authHelper";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const user = getUserData();

//   console.log("User Data in Dashboard:", user); // Debugging: Check user data

//   if (!user) {
//     console.log("No user found, redirecting to login..."); // Debugging: Check redirection
//     navigate("/login");
//     return null;
//   }

//   const data = [
//     { day: "Mon", value: 3 },
//     { day: "Tue", value: 4 },
//     { day: "Wed", value: 2 },
//     { day: "Thu", value: 5 },
//     { day: "Fri", value: 4 },
//     { day: "Sat", value: 6 },
//     { day: "Sun", value: 3 },
//   ];

//   return (
//     <div className="min-h-screen bg-blue-100 p-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-blue-700">Fitness Tracker</h1>
//         <button 
//           onClick={() => { logout(); navigate("/login"); }} 
//           className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded"
//         >
//           Logout
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {/* Card 1 - Total Workout Time */}
//         <div className="bg-white shadow-md rounded-lg p-4">
//           <div className="p-2">
//             <h2 className="text-xl font-semibold text-gray-700">Total Workout Time</h2>
//             <p className="text-2xl text-blue-600 font-bold">56m</p>
//           </div>
//         </div>

//         {/* Card 2 - Calories Burned */}
//         <div className="bg-white shadow-md rounded-lg p-4">
//           <div className="p-2">
//             <h2 className="text-xl font-semibold text-gray-700">Calories Burned</h2>
//             <p className="text-2xl text-blue-600 font-bold">1345 kcal</p>
//           </div>
//         </div>

//         {/* Card 3 - Total Distance */}
//         <div className="bg-white shadow-md rounded-lg p-4">
//           <div className="p-2">
//             <h2 className="text-xl font-semibold text-gray-700">Total Distance</h2>
//             <p className="text-2xl text-blue-600 font-bold">15 km</p>
//           </div>
//         </div>
//       </div>

//       {/* Activity Tracking Chart */}
//       <div className="bg-white shadow-md p-6 mt-6 rounded-lg">
//         <h2 className="text-xl font-semibold text-gray-700">Activity Tracking</h2>
//         <ResponsiveContainer width="100%" height={250}>
//           <LineChart data={data}>
//             <XAxis dataKey="day" />
//             <YAxis />
//             <Tooltip />
//             <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;





import React from "react";
import { useNavigate } from "react-router-dom";
import { getUserData, logout } from "../authHelper";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = getUserData();

  console.log("User Data in Dashboard:", user); // Debugging: Check user data

  if (!user) {
    console.log("No user found, redirecting to login..."); // Debugging: Check redirection
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Fitness Tracker</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="dashboard-grid">
        {/* Card 1 - Total Workout Time */}
        <div className="dashboard-card">
          <h2>Total Workout Time</h2>
          <p>56m</p>
        </div>

        {/* Card 2 - Calories Burned */}
        <div className="dashboard-card">
          <h2>Calories Burned</h2>
          <p>1345 kcal</p>
        </div>

        {/* Card 3 - Total Distance */}
        <div className="dashboard-card">
          <h2>Total Distance</h2>
          <p>15 km</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
// // Save user data (including token) in localStorage
// export const setUserData = (data) => {
//   localStorage.setItem("user", JSON.stringify(data));
// };

// // Get user data from localStorage
// export const getUserData = () => {
//   const user = localStorage.getItem("user");
//   console.log("User from localStorage:", user); // Debugging: Check user data
//   return user ? JSON.parse(user) : null;
// };

// // Check if user is logged in
// export const isLoggedIn = () => {
//   const user = getUserData();
//   return !!user && !!user.token; // Ensure a boolean is returned
// };

// // Logout function
// export const logout = () => {
//   localStorage.removeItem("user");
// };  






// Save user data (including token) in localStorage
export const setUserData = (data) => {
  localStorage.setItem("user", JSON.stringify(data));
};

// Get user data from localStorage
export const getUserData = () => {
  const user = localStorage.getItem("user");
  console.log("User from localStorage:", user); // Debugging: Check user data
  return user ? JSON.parse(user) : null;
};

// Check if user is logged in
export const isLoggedIn = () => {
  const user = getUserData();
  return !!user && !!user.token; // Ensure a boolean is returned
};

// Logout function
export const logout = () => {
  localStorage.removeItem("user");
};
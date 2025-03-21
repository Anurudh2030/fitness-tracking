// import axios from 'axios';

// const API = axios.create({ baseURL: 'http://localhost:5001/api' });

// // Trainer API calls
// export const fetchTrainers = () => API.get('/trainers');
// export const addTrainer = (trainerData) => API.post('/trainers', trainerData);
// export const updateTrainer = (id, trainerData) => API.put(`/trainers/${id}`, trainerData);
// export const deleteTrainer = (id) => API.delete(`/trainers/${id}`);

// // User Authentication API calls
// export const loginUser = (userData) => API.post('/auth/login', userData);
// export const registerUser = (userData) => API.post('/auth/register', userData);



import axios from "axios";

// Base API URL
const API = axios.create({ baseURL: "http://localhost:5000" }); // Adjust port if needed

// Interceptor to send token with every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


import { loginUser } from "../api";

const handleLogin = async () => {
  try {
    const { data } = await loginUser({ email, password });
    localStorage.setItem("token", data.token);
    console.log("Login successful:", data);
  } catch (error) {
    console.error("Login error:", error.response?.data?.message);
  }
};

// User APIs
export const loginUser = (formData) => API.post("/auth/login", formData);
export const registerUser = (formData) => API.post("/auth/register", formData);
export const getUserProfile = () => API.get("/user/profile");

// Trainer APIs
export const fetchTrainers = () => API.get("/trainers");
export const fetchTrainerById = (id) => API.get(`/trainers/${id}`);
export const bookAppointment = (trainerId, data) =>
  API.post(`/trainers/${trainerId}/book`, data);

// Workout & Nutrition APIs
export const logWorkout = (data) => API.post("/workouts/log", data);
export const getWorkouts = () => API.get("/workouts");

export const logNutrition = (data) => API.post("/nutrition/log", data);
export const getNutritionLogs = () => API.get("/nutrition");

// Export API
export default API;

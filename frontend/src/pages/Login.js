// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate(); // Initialize navigation

//   const handleLogin = async (e) => {
//     e.preventDefault(); // Prevent page reload

//     try {
//       const response = await fetch("http://localhost:5001/api/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error("Invalid email or password");
//       }

//       const data = await response.json();
//       localStorage.setItem("user", JSON.stringify(data)); // Store user data
//       navigate("/dashboard"); // Redirect on success
//     } catch (error) {
//       alert(error.message); // Show error message
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>  {/* ✅ Use handleLogin, not handleSubmit */}
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         required
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         required
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;




// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:5001/api/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error("Invalid email or password");
//       }

//       const data = await response.json();
//       localStorage.setItem("user", JSON.stringify({ name: data.name, email: data.email }));
//       localStorage.setItem("token", data.token); // ✅ Store token

//       navigate("/dashboard"); // Redirect on success
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         required
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         required
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { setUserData, isLoggedIn } from './authHelper';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Redirect to dashboard if already logged in
//     if (isLoggedIn()) {
//       navigate('/dashboard');
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     try {
//       const response = await axios.post('/api/users/login', { email, password });
      
//       // Save user data with token
//       setUserData(response.data);
      
//       // Log to check if token is received
//       console.log('Login successful, token received:', response.data.token);
      
//       // Redirect to dashboard
//       navigate('/dashboard');
//     } catch (error) {
//       setError(error.response?.data?.message || 'Login failed');
//       console.error('Login error:', error);
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       {error && <div className="error-message">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Email</label>
//           <input 
//             type="email" 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//             required 
//           />
//         </div>
//         <div className="form-group">
//           <label>Password</label>
//           <input 
//             type="password" 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//             required 
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;




import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const res = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Login Response:", data);

      if (data.token) {
        localStorage.setItem("user", JSON.stringify(data)); // Store user data
        localStorage.setItem("token", data.token); // Store token
        if (data.role === "admin") {
          navigate("/admin"); // Redirect to admin dashboard
        } else {
          navigate("/dashboard"); // Redirect to user dashboard
        }
      } else {
        setError("Login failed! Check your credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Connection error. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username" // Add autocomplete
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password" // Add autocomplete
        />
        <button type="submit">Login</button>
      </form>
      <div className="mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="auth-link">
          Register now
        </Link>
      </div>
    </div>
  );
};

export default Login;
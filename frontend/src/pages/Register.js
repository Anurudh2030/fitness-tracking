import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5001/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("Registration successful! Redirecting to login...");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                setError(data.message || "Failed to register");
            }
        } catch (error) {
            setError("Failed to connect to server");
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            <div className="footer">
                Already have an account? <a href="/login">Sign in.</a>
            </div>
        </div>
    );
};

export default Register;


// import React, { useState } from "react";
// import "../styles/Register.css"; // Add this line

// const Register = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: "",
//     });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(formData); // Debugging: See form data in console
//     };

//     return (
//         <div className="register-container">
//             <div className="register-box">
//                 <h2>Register your account</h2>
//                 <form className="register-form" onSubmit={handleSubmit}>
//                     <input
//                         type="text"
//                         name="name"
//                         placeholder="Enter your full name..."
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                     />
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Enter your email address..."
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                     />
//                     <input
//                         type="password"
//                         name="password"
//                         placeholder="Enter your password..."
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                     />
//                     <button type="submit">Sign up</button>
//                 </form>
//             </div>

//             {/* Footer */}
//             <div className="footer">
//                 Already have an account? <a href="/login">Sign in.</a>
//             </div>
//         </div>
//     );
// };

// export default Register;

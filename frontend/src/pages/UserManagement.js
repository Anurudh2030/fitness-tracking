import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", role: "User" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return alert("Please fill all fields");
    setUsers([...users, { ...formData, id: Date.now() }]);
    setFormData({ name: "", email: "", role: "User" });
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2>User Management</h2>

      {/* Form to Add User */}
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="row">
          <div className="col-md-4">
            <input type="text" name="name" className="form-control" placeholder="Name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <input type="email" name="email" className="form-control" placeholder="Email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <select name="role" className="form-control" value={formData.role} onChange={handleChange}>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="col-md-1">
            <button type="submit" className="btn btn-primary w-100">Add</button>
          </div>
        </div>
      </form>

      {/* User List Table */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan="4" className="text-center">No users added yet</td></tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;

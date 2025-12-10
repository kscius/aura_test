import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getUsers, updateProfile } from "../api/client";
import type { User, UpdateProfileData } from "../types";
import { ApiError } from "../api/client";

export const Dashboard: React.FC = () => {
  const { user, logout, updateUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editFormData, setEditFormData] = useState({
    email: user?.email || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Load users list when component mounts
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditFormData({
      email: user?.email || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
    });
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setErrors({});
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!editFormData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(editFormData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!editFormData.firstName) {
      newErrors.firstName = "First name is required";
    }

    if (!editFormData.lastName) {
      newErrors.lastName = "Last name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!validate()) return;

    // Check if there were changes
    const hasChanges =
      editFormData.email !== user?.email ||
      editFormData.firstName !== user?.firstName ||
      editFormData.lastName !== user?.lastName;

    if (!hasChanges) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);

    try {
      const updateData: UpdateProfileData = {};
      if (editFormData.email !== user?.email) updateData.email = editFormData.email;
      if (editFormData.firstName !== user?.firstName)
        updateData.firstName = editFormData.firstName;
      if (editFormData.lastName !== user?.lastName)
        updateData.lastName = editFormData.lastName;

      const response = await updateProfile(updateData);
      updateUser(response.data);
      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
      
      // Reload users list to reflect changes
      loadUsers();
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <div>
            <h1>AURA Dashboard</h1>
            <p>Welcome back, {user?.firstName}!</p>
          </div>
          <button 
            onClick={logout} 
            className="btn btn-secondary"
            style={{ background: "rgba(255,255,255,0.2)", color: "white", border: "2px solid white" }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Card del perfil del usuario */}
        <div className="card">
          <h2>My Profile</h2>

          {successMessage && (
            <div style={{ 
              padding: "12px", 
              background: "#d4edda", 
              borderRadius: "8px", 
              marginBottom: "16px",
              color: "#155724"
            }}>
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div style={{ 
              padding: "12px", 
              background: "#fee", 
              borderRadius: "8px", 
              marginBottom: "16px",
              color: "#c33"
            }}>
              {errorMessage}
            </div>
          )}

          {!isEditing ? (
            <div>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>First Name:</strong> {user?.firstName}</p>
              <p><strong>Last Name:</strong> {user?.lastName}</p>
              <p><strong>Member since:</strong> {user && formatDate(user.createdAt)}</p>
              
              <button 
                onClick={handleEditClick} 
                className="btn btn-primary"
                style={{ marginTop: "16px", width: "auto" }}
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSaveProfile}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={editFormData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? "error" : ""}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={editFormData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? "error" : ""}
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSaving}
                  style={{ width: "auto" }}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
                <button 
                  type="button" 
                  onClick={handleCancelEdit} 
                  className="btn btn-secondary"
                  style={{ width: "auto" }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Card de lista de usuarios */}
        <div className="card">
          <h2>All Users</h2>

          {isLoadingUsers ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.firstName} {u.lastName}</td>
                    <td>{u.email}</td>
                    <td>{formatDate(u.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};


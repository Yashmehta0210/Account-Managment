import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState({});
  const [newPassword, setNewPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility

  useEffect(() => {
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find((user) => user.email === loggedInEmail);
    if (currentUser) {
      setUser({ ...currentUser, originalEmail: currentUser.email });
    }
  }, []);

  const updateUserInLocalStorage = (updatedUser) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(u => u.email === updatedUser.originalEmail ? updatedUser : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserInLocalStorage(user);
    alert('Profile updated successfully');
    setIsEditing(false);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (newPassword) {
      const updatedUser = { ...user, password: newPassword };
      updateUserInLocalStorage(updatedUser);
      setUser(updatedUser);
      setNewPassword('');
      setIsPasswordEditing(false);
      alert('Password updated successfully');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card" style={{ width: '100%', maxWidth: '600px' }}>
        <div className="card-header">
          <h2>Profile</h2>
        </div>
        <div className="card-body">
          {isPasswordEditing ? (
            <form onSubmit={handleUpdatePassword}>
              <div className="mb-3 position-relative">
                <label className="form-label">New Password</label>
                <input
                  type={showPassword ? 'text' : 'password'} 
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <i 
                className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} `} 
                style={{position:'absolute', right: '10px',
                  top: 50,
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',}} 
                onClick={() => setShowPassword(!showPassword)}
              ></i> 
              </div>
              <button type="submit" className="btn btn-primary">Update Password</button>
              <button type="button" className="btn btn-secondary ms-3" onClick={() => setIsPasswordEditing(false)}>Cancel</button>
            </form>
          ) : (
            <form onSubmit={isEditing ? handleSaveProfile : (e) => e.preventDefault()}>
              <div className="mb-3">
                <label className="form-label fw-bold">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={user.name || ''}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{user.name}</p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={user.email || ''}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{user.email}</p>
                )}
              </div>
              {isEditing ? (
                <>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                  <button type="button" className="btn btn-secondary ms-3" onClick={() => setIsEditing(false)}>Cancel</button>
                  <button type="button" className="btn btn-warning ms-3" onClick={() => setIsPasswordEditing(true)}>Change Password</button>
                </>
              ) : (
                <button type="button" className="btn btn-primary mt-3" onClick={() => setIsEditing(true)}>Edit Profile</button>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

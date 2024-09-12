import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '', confirmPassword: '' });
 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    users.push(user);
    
    // Save the updated users array to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    navigate('/');
  };
  


  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Register</h2>
       
        <form onSubmit={handleRegister}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Name</label>
            <input 
              type="text" 
              style={styles.input} 
              name="name" 
              value={user.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input 
              type="email" 
              style={styles.input} 
              name="email" 
              value={user.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              style={styles.input} 
              name="password" 
              value={user.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input 
              type="password" 
              style={styles.input} 
              name="confirmPassword" 
              value={user.confirmPassword} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button 
            type="submit" 
            style={styles.button}
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
          >
            Register
          </button>
        </form>
        <p style={{ ...styles.textCenter, marginTop: '15px' }}>
          Already have an account? <a href="/" style={styles.link} onMouseEnter={(e) => e.target.style.textDecoration = styles.linkHover.textDecoration} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>Login</a>
        </p>
      </div>
    </div>
  );
}

export default Registration;
 
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '0 20px',
    },
    formContainer: {
      background: '#ffffff',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '500px',
      width: '100%',
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '2rem',
      color: '#333',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontSize: '1rem',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
      fontSize: '1rem',
    },
    button: {
      width: '100%',
      padding: '10px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#007bff',
      color: '#fff',
      fontSize: '1.1rem',
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    link: {
      color: '#007bff',
      textDecoration: 'none',
    },
    linkHover: {
      textDecoration: 'underline',
    },
    textCenter: {
      textAlign: 'center',
    },
    error: {
      color: 'red',
      fontSize: '0.875rem',
      marginBottom: '10px',
      textAlign: 'center',
    },
  };
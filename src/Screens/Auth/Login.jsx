import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
  
    // Retrieve the users array from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    if (!Array.isArray(users)) {
      alert('No user data available');
      return;
    }
  
    // Find the user based on email and password
    const user = users.find(
      (user) =>
        user.email.trim() === credentials.email.trim() &&
        user.password === credentials.password
    );
  
    if (user) {
      localStorage.setItem('loggedInEmail', user.email); // Store email in localStorage
      localStorage.setItem('loggedIn', 'true');
      navigate('/dashboard');
    } else {
      alert('Invalid email or password');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input 
              type="email" 
              style={styles.input} 
              name="email" 
              value={credentials.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                style={styles.input} 
                name="password" 
                value={credentials.password} 
                onChange={handleChange} 
                required 
              />
             <i 
                className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} 
                style={styles.toggleVisibility} 
                onClick={togglePasswordVisibility}
              ></i> 
            </div>
          </div>
          <button 
            type="submit" 
            style={styles.button}
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
          >
            Login
          </button>
        </form>
        <p style={{ ...styles.textCenter, marginTop: '15px' }}>
          Don't have an account? <a href="/register" style={styles.link} onMouseEnter={(e) => e.target.style.textDecoration = styles.linkHover.textDecoration} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;

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
  toggleVisibility: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
  },
};
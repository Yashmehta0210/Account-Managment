import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    localStorage.setItem("loggedIn", "false");
    navigate("/");
  };

 

  return (
    <nav style={styles.navbar}>
        <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <a
            style={{ ...styles.navLink, ...styles.activeNavLink }}
            aria-current="page"
            href="/dashboard"
          >
            Dashboard
          </a>
        </li>
        <li style={styles.navItem}>
          <a style={styles.navLink} href="/profile">
            Profile
          </a>
        </li>
      </ul>
      </div>
      <button style={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Header;

 const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#e3f2fd",
      padding: "10px 20px",
    },
    brand: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      textDecoration: "none",
      color: "#000",
    },
    navList: {
      listStyle: "none",
      display: "flex",
      margin: "0",
      padding: "0",
    },
    navItem: {
      marginLeft: "15px",
    },
    navLink: {
      textDecoration: "none",
      color: "#000",
      fontSize: "1rem",
    },
    activeNavLink: {
      fontWeight: "bold",
    },
    logoutButton: {
      border: "none",
      backgroundColor: "#0080ff",
      color: "#fff",
      padding: "5px 10px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1rem",
      marginLeft: "15px",
    },
  };
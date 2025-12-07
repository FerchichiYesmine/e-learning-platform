import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Assure-toi que le logo existe

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", borderBottom: "1px solid #ccc" }}>
      <div className="logo-header" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src={logo} alt="Logo" className="logo" style={{ height: "50px" }} />
        <span className="platform-name">Learn Tounsi - Interface Admin</span>
      </div>

      <div className="header-right" style={{ display: "flex", gap: "15px" }}>
        <button onClick={() => navigate("/")}>Gestion de cours</button>
        <button onClick={() => navigate("/users")}>Liste utilisateurs</button>
        <button onClick={() => navigate("/stats")}>Statistiques</button>
        <button onClick={() => navigate("/account")}>Compte</button>
      </div>
    </header>
  );
};

export default Navbar;

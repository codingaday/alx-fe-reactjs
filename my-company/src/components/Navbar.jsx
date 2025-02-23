import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        padding: "20px",
        backgroundColor: "#4CAF50",
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Link
        style={{ margin: "0 15px", color: "#fff", textDecoration: "none" }}
        to="/"
      >
        Home
      </Link>
      <Link
        style={{ margin: "0 15px", color: "#fff", textDecoration: "none" }}
        to="/about"
      >
        About
      </Link>
      <Link
        style={{ margin: "0 15px", color: "#fff", textDecoration: "none" }}
        to="/services"
      >
        Services
      </Link>
      <Link
        style={{ margin: "0 15px", color: "#fff", textDecoration: "none" }}
        to="/contact"
      >
        Contact
      </Link>
    </nav>
  );
}

export default Navbar;

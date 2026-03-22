import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ backgroundColor: "#007bff", padding: "10px" }}>
      <Link to="/home" style={{ color: "white", marginRight: "20px" }}>Home</Link>
      <Link to="/register" style={{ color: "white" }}>Register</Link>
    </nav>
  );
}

export default Navbar;
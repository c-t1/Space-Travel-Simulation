import { Link } from "react-router-dom";

function Header() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/spacecrafts">Spacecrafts</Link>
      <Link to="/planets">Planets</Link>
    </nav>
  );
}

export default Header;
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">MyStore</Link>
    </nav>
  );
};

export default Navbar;

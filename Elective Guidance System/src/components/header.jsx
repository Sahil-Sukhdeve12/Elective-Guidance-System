
import logo from "../images_centre/logo.png";
import { Link } from "react-router-dom";
import { doSignOut } from '../firebase/auth';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

const Header = ({ isAdmin }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await doSignOut();
      navigate('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
      <header>
          <img src={logo} alt="logo" className="img-fluid" style={{ height: '50px' }} />
        </header>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isAdmin && (
              <li className="nav-item" >
                <Link className="nav-link" to="/domain">Domain</Link>
              </li>
            )}
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>
            )}
          </ul>
          <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default Header;
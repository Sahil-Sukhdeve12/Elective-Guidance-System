import logo from "../images_centre/logo.png";
import { Link } from "react-router-dom";
import { doSignOut } from '../firebase/auth';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import PropTypes from 'prop-types';
import { useEffect,useState } from "react";  

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  const handleLogout = async () => {
    try {
      await doSignOut();
      localStorage.removeItem('isAdmin');
      setIsAdmin(false);
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
            {/* {isAdmin && (
              <li className="nav-item" >
                <Link className="nav-link" to="/domain">Domain</Link>
              </li>
            )} */}
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/category">Category</Link>
              </li>
            )}
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>
            )}
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
            )}

          </ul>
          <button className="btn btn-outline-danger" onClick={handleLogout} style={{ width: '80px' }}>
            Logout</button>
        </div>
      </div>
    </div>
  );
};

// Header.propTypes = {
//   isAdmin: PropTypes.bool.isRequired,
//   handleLogout: PropTypes.func.isRequired,
//   logo: PropTypes.string.isRequired,
// };

export default Header;
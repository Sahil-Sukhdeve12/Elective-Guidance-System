// import { useState } from 'react';
import logo from "../utils/logo.png";
import { doSignOut } from '../firebase/auth';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate=useNavigate();

  // const handleButtonClick = () => {
  //   setIsLoggedIn(!isLoggedIn);
  // };

  const handleLogout = async () => {
    try {
      await doSignOut();
      navigate('/'); // Redirect to home page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="container-fluid bg-light py-2">
      <div className="d-flex justify-content-between align-items-center">
        <header>
          <img src={logo} alt="logo" className="img-fluid" style={{ height: '50px' }} />
        </header>
        <button className="btn btn-primary" onClick={handleLogout} style={{width:"80px",marginRight:"10px"}}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
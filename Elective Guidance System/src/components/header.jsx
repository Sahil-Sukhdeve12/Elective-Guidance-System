import { useState } from 'react';
import logo from "../utils/logo.png";
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleButtonClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="container-fluid bg-light py-2">
      <div className="d-flex justify-content-between align-items-center">
        <header>
          <img src={logo} alt="logo" className="img-fluid" style={{ height: '50px' }} />
        </header>
        <button className="btn btn-primary" onClick={handleButtonClick} style={{width:"80px",marginRight:"10px"}}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </div>
    </div>
  );
}

export default Header;
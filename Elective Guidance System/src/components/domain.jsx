import { useState } from 'react';
// import Header from "./header";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/domain.css'; // Import the CSS file for custom styles

const Domain = () => {
  const [selectedDomain, setSelectedDomain] = useState('');

  const handleDomainChange = (event) => {
    setSelectedDomain(event.target.value);
  };

  return (
    <div>

    {/* <Header /> */}
    <div className="domain-container">
      
      <h1 className="text-center mb-4 no-margin domain-title">Enter which domain you want to select?</h1>
      <form className="text-center">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="domain"
            id="dataMining"
            value="data mining & information retrieval"
            checked={selectedDomain === 'data mining & information retrieval'}
            onChange={handleDomainChange}
          />
          <label className="form-check-label" htmlFor="dataMining">
            Data Mining & Information Retrieval
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="domain"
            id="intelligentSystem"
            value="Intelligent system"
            checked={selectedDomain === 'Intelligent system'}
            onChange={handleDomainChange}
          />
          <label className="form-check-label" htmlFor="intelligentSystem">
            Intelligent System
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="domain"
            id="security"
            value="Security"
            checked={selectedDomain === 'Security'}
            onChange={handleDomainChange}
          />
          <label className="form-check-label" htmlFor="security">
            Security
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="domain"
            id="hpc"
            value="High Performance Computing"
            checked={selectedDomain === 'High Performance Computing'}
            onChange={handleDomainChange}
          />
          <label className="form-check-label" htmlFor="hpc">
            High Performance Computing
          </label>
        </div>
        <Link to="/subject">
          <button type="button" className="btn btn-primary mt-4">Next</button>
        </Link>
      </form>
    </div>
    </div>
  );
};

export default Domain;
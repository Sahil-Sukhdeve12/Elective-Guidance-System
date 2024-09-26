import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from "./header";
import 'bootstrap/dist/css/bootstrap.min.css';
import './domain.css'; // Import the CSS file for custom styles

const Domain = () => {
  const [selectedDomain, setSelectedDomain] = useState('');
  const [domains, setDomains] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchDomains();
  }, []);

  const fetchDomains = async () => {
    const response = await fetch('http://localhost:5000/api/domains');
    const data = await response.json();
    setDomains(data);
  };

  const handleDomainChange = (event) => {
    setSelectedDomain(event.target.value);
  };

  const handleNext = () => {
    history.push(`/subject?domain=${selectedDomain}`);
  };

  return (
    <div className="domain-container">
      <Header />
      <h1 className="text-center mb-4">Enter which domain you want to select?</h1>
      <form className="text-center">
        {domains.map((domain) => (
          <div className="form-check" key={domain.id}>
            <input
              className="form-check-input"
              type="radio"
              name="domain"
              id={domain.id}
              value={domain.name}
              checked={selectedDomain === domain.name}
              onChange={handleDomainChange}
            />
            <label className="form-check-label" htmlFor={domain.id}>
              {domain.name}
            </label>
          </div>
        ))}
        <button type="button" className="btn btn-primary mt-4" onClick={handleNext}>Next</button>
      </form>
    </div>
  );
};

export default Domain;
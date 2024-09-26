import  { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from "./header";
import 'bootstrap/dist/css/bootstrap.min.css';

const Subject = () => {
  const [subjects, setSubjects] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const domain = query.get('domain');

    fetch(`http://localhost:5000/api/subjects?domain=${domain}`)
      .then(response => response.json())
      .then(data => setSubjects(data))
      .catch(error => console.error('Error fetching subjects:', error));
  }, [location.search]);

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Subjects</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject.id}>
                <td>{subject.id}</td>
                <td>{subject.name}</td>
                <td>{subject.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subject;
import { useState } from 'react';


const UserForm = ({ onSubmit }) => {
  const [domain, setDomain] = useState('');
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ domain, semester, subject });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Domain:</label>
        <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} required />
      </div>
      <div>
        <label>Semester:</label>
        <input type="text" value={semester} onChange={(e) => setSemester(e.target.value)} required />
      </div>
      <div>
        <label>Subject:</label>
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
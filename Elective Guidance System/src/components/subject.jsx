// import { useState } from 'react';
import Header from "./header";
import 'bootstrap/dist/css/bootstrap.min.css';
// Import the CSS file for custom styles

const Subject = () => {
//   const [selectedSubject, setSelectedSubject] = useState('');

  const subjects = [
    { id: 1, code: 'UAIL311', name: 'Social Network Analysis', semester: '5th', credits: 3 },
    { id: 2, code: 'UAIL321', name: 'Information Retrieval', semester: '6th', credits: 3 },
    { id: 3, code: 'UAIL431', name: 'Data Mining', semester: '7th', credits: 3 },
    {id:4,code:'UAIL441',name:'Reinforcement Learning',semester:'7th',credits:3},{
        id:5,code:'UAIL451',name:'Recommendation System',semester:'7th',credits:3
    },{id:6,code:'UAIP451',name:'Recommendation System',semester:'7th',credits:1},{
        id:7,code:'UAIL461',name:'No SQL Database System',semester:'7th',credits:3
    },{id:8,code:'UAIP461',name:'No SQL Database System',semester:'7th',credits:1}
    // Add more subjects as needed
  ];

//   const handleSubjectChange = (event) => {
//     setSelectedSubject(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     alert(`Selected Subject: ${selectedSubject}`);
//   };

  return (
    <div>
      <Header />
      <h1 className="text-center mb-3">Available Electives in particular semester</h1>
      <div className="container mt-5">
        <form className="text-center">
          <table className="table table-bordered">
            <thead>
              <tr>
                
                <th>Elective Code</th>
                <th>Elective Name</th>
                <th>Semester</th>
                <th>Credits</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.id}>
                  
                  <td>{subject.code}</td>
                  <td>{subject.name}</td>
                  <td>{subject.semester}</td>
                  <td>{subject.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <button type="submit" className="btn btn-primary mt-4">Submit</button> */}
        </form>
      </div>
    </div>
  );
};

export default Subject;
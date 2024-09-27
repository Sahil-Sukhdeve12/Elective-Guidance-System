// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Admin = () => {
//   const [electives, setElectives] = useState([]);
//   const [tracks, setTracks] = useState([]);
//   const [newElective, setNewElective] = useState({ name: '', description: '' });
//   const [newTrack, setNewTrack] = useState({ name: '', description: '' });

//   useEffect(() => {
//     fetchElectives();
//     fetchTracks();
//   }, []);

//   const fetchElectives = async () => {
//     const response = await axios.get('http://localhost:5000/api/electives');
//     setElectives(response.data);
//   };

//   const fetchTracks = async () => {
//     const response = await axios.get('http://localhost:5000/api/tracks');
//     setTracks(response.data);
//   };

//   const handleAddElective = async () => {
//     await axios.post('http://localhost:5000/api/electives', newElective);
//     fetchElectives();
//     setNewElective({ name: '', description: '' });
//   };

//   const handleAddTrack = async () => {
//     await axios.post('http://localhost:5000/api/tracks', newTrack);
//     fetchTracks();
//     setNewTrack({ name: '', description: '' });
//   };

//   const handleDeleteElective = async (id) => {
//     await axios.delete(`http://localhost:5000/api/electives/${id}`);
//     fetchElectives();
//   };

//   const handleDeleteTrack = async (id) => {
//     await axios.delete(`http://localhost:5000/api/tracks/${id}`);
//     fetchTracks();
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-4">Admin Page</h1>

//       <h2>Electives</h2>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {electives.map((elective) => (
//             <tr key={elective.id}>
//               <td>{elective.id}</td>
//               <td>{elective.name}</td>
//               <td>{elective.description}</td>
//               <td>
//                 <button className="btn btn-danger" onClick={() => handleDeleteElective(elective.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h2>Add New Elective</h2>
//       <div className="mb-3">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Name"
//           value={newElective.name}
//           onChange={(e) => setNewElective({ ...newElective, name: e.target.value })}
//         />
//       </div>
//       <div className="mb-3">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Description"
//           value={newElective.description}
//           onChange={(e) => setNewElective({ ...newElective, description: e.target.value })}
//         />
//       </div>
//       <button className="btn btn-primary" onClick={handleAddElective}>Add Elective</button>

//       <h2 className="mt-5">Tracks</h2>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tracks.map((track) => (
//             <tr key={track.id}>
//               <td>{track.id}</td>
//               <td>{track.name}</td>
//               <td>{track.description}</td>
//               <td>
//                 <button className="btn btn-danger" onClick={() => handleDeleteTrack(track.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h2>Add New Track</h2>
//       <div className="mb-3">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Name"
//           value={newTrack.name}
//           onChange={(e) => setNewTrack({ ...newTrack, name: e.target.value })}
//         />
//       </div>
//       <div className="mb-3">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Description"
//           value={newTrack.description}
//           onChange={(e) => setNewTrack({ ...newTrack, description: e.target.value })}
//         />
//       </div>
//       <button className="btn btn-primary" onClick={handleAddTrack}>Add Track</button>
//     </div>
//   );
// };

// export default Admin;

const Admin=()=>{
    return(
        <div>
            <h1>Hello</h1>
        </div>
    )
}

export default Admin;
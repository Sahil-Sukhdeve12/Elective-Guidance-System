import { useState, useEffect } from 'react';
import './styling/admin.css'; // Import your CSS styling

const Admin = () => {
    const [activeSection, setActiveSection] = useState(''); // Keeps track of the current section
    const [editMode, setEditMode] = useState(false);
    // Department States
    const [departmentName, setDepartmentName] = useState('');
    const [departments, setDepartments] = useState([]);

    // Category States
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);

    // Track States
    const [trackName, setTrackName] = useState('');
    const [trackCategoryId, setTrackCategoryId] = useState('');
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [tracks, setTracks] = useState([]);

    // Elective States
    const [electiveName, setElectiveName] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [credits, setCredits] = useState('');
    const [semester, setSemester] = useState('');
    const [electiveTrackId, setElectiveTrackId] = useState('');
    const [electives, setElectives] = useState([]);

    // Fetching all entities
    useEffect(() => {
        fetchDepartments();
        fetchCategories();
        fetchTracks();
        fetchElectives();
    }, []);

    const handleSectionClick = (section) => {
        console.log('Clicked section:', section); // Debugging
        setActiveSection(section);
    };

    const handleEditClick = () => {
        // Your logic for handling edit
        setEditMode((prevMode) => !prevMode);
        console.log("Edit button clicked");
    };

    // Toggle between sections
    const renderSection = () => {
        switch (activeSection) {
            case 'Department':
                return renderDepartments();
            case 'Category':
                return renderCategories();
            case 'Track':
                return renderTracks();
            case 'Elective':
                return renderElectives();
            default:
                return null;
        }
    };

    // ------------------- CRUD Operations for Departments -------------------
    const fetchDepartments = async () => {
        const response = await fetch('http://localhost:5000/departments');
        const data = await response.json();
        setDepartments(data);
    };

    const createDepartment = async () => {
        await fetch('http://localhost:5000/departments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ department_name: departmentName }),
        });
        setDepartmentName(''); // Reset input
        fetchDepartments(); // Refresh the list
    };

    const updateDepartment = async (id) => {
        const newName = prompt('New Department Name:');
        await fetch(`http://localhost:5000/departments/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ department_name: newName }),
        });
        fetchDepartments();
    };

    const deleteDepartment = async (id) => {
        await fetch(`http://localhost:5000/departments/${id}`, { method: 'DELETE' });
        fetchDepartments();
    };

    const renderDepartments = () => (
        <div className="crud-container">
            <input
                type="text"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                placeholder="Department Name"
            />
            <button className="crud-btn" onClick={createDepartment}>Create Department</button>
            <ul>
                {departments.map(dep => (
                    <li key={dep.department_id}>
                        {dep.department_name}
                        <button onClick={() => updateDepartment(dep.department_id)}>Update</button>
                        <button onClick={() => deleteDepartment(dep.department_id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );

    // ------------------- CRUD Operations for Categories -------------------
    const fetchCategories = async () => {
        const response = await fetch('http://localhost:5000/categories');
        const data = await response.json();
        setCategories(data);
    };

    const createCategory = async () => {
        await fetch('http://localhost:5000/domain_Category', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category_name: categoryName }),
        });
        setCategoryName(''); // Reset input
        fetchCategories();
    };

    const updateCategory = async (id) => {
        const newName = prompt('New Category Name:');
        await fetch(`http://localhost:5000/domain_Category/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category_name: newName }),
        });
        fetchCategories();
    };

    const deleteCategory = async (id) => {
        await fetch(`http://localhost:5000/domain_Category/${id}`, { method: 'DELETE' });
        fetchCategories();
    };

    const renderCategories = () => (
        <div className="crud-container">
            <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Category Name"
            />
            <button className="crud-btn" onClick={createCategory}>Create Category</button>
            <ul>
                {categories.map(cat => (
                    <li key={cat.category_id}>
                        {cat.category_name}
                        <button onClick={() => updateCategory(cat.category_id)}>Update</button>
                        <button onClick={() => deleteCategory(cat.category_id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );

    // ------------------- CRUD Operations for Tracks -------------------
    const fetchTracks = async () => {
        const response = await fetch('http://localhost:5000/tracks');
        const data = await response.json();
        setTracks(data);
    };

    const createTrack = async () => {
        const response = await fetch('http://localhost:5000/tracks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Track_Name: trackName, category_id: trackCategoryId }),
        });
        const newTrack = await response.json();

        // Create entries in track_department for selected departments
        await Promise.all(
            selectedDepartments.map(department_id =>
                fetch('http://localhost:5000/track_department', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ track_id: newTrack.Track_id, department_id }),
                })
            )
        );
        setTrackName(''); // Reset input
        fetchTracks(); // Refresh the list
    };

    const updateTrack = async (id) => {
        const newName = prompt('New Track Name:');
        const newCategoryId = prompt('New Category ID:');
        await fetch(`http://localhost:5000/tracks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Track_Name: newName, category_id: newCategoryId }),
        });
        fetchTracks();
    };

    const deleteTrack = async (id) => {
        await fetch(`http://localhost:5000/tracks/${id}`, { method: 'DELETE' });
        fetchTracks();
    };

    const renderTracks = () => (
        <div className="crud-container">
            <input
                type="text"
                value={trackName}
                onChange={(e) => setTrackName(e.target.value)}
                placeholder="Track Name"
            />
            <select value={trackCategoryId} onChange={(e) => setTrackCategoryId(e.target.value)}>
                <option value="">Select Category</option>
                {categories.map(cat => (
                    <option key={cat.category_id} value={cat.category_id}>
                        {cat.category_name}
                    </option>
                ))}
            </select>
            <select multiple value={selectedDepartments} onChange={(e) => setSelectedDepartments(Array.from(e.target.selectedOptions, option => option.value))}>
                {departments.map(dep => (
                    <option key={dep.department_id} value={dep.department_id}>
                        {dep.department_name}
                    </option>
                ))}
            </select>
            <button className="crud-btn" onClick={createTrack}>Create Track</button>
            <ul>
                {tracks.map(track => (
                    <li key={track.Track_id}>
                        {track.Track_Name}
                        <button onClick={() => updateTrack(track.Track_id)}>Update</button>
                        <button onClick={() => deleteTrack(track.Track_id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );

    // ------------------- CRUD Operations for Electives -------------------
    const fetchElectives = async () => {
        const response = await fetch('http://localhost:5000/electives?track_id=1'); // Replace with actual track ID
        const data = await response.json();
        setElectives(data);
    };

    const createElective = async () => {
        await fetch('http://localhost:5000/electives', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Elective_Name: electiveName,
                Course_Code: courseCode,
                Credits: credits,
                Semester: semester,
                Track_id: electiveTrackId,
            }),
        });
        setElectiveName(''); // Reset input
        fetchElectives(); // Refresh the list
    };

    const updateElective = async (id) => {
        const newName = prompt('New Elective Name:');
        const newCourseCode = prompt('New Course Code:');
        const newCredits = prompt('New Credits:');
        const newSemester = prompt('New Semester:');
        await fetch(`http://localhost:5000/electives/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Elective_Name: newName, Course_Code: newCourseCode, Credits: newCredits, Semester: newSemester }),
        });
        fetchElectives();
    };

    const deleteElective = async (id) => {
        await fetch(`http://localhost:5000/electives/${id}`, { method: 'DELETE' });
        fetchElectives();
    };

    const renderElectives = () => (
        <div className="crud-container">
            <input
                type="text"
                value={electiveName}
                onChange={(e) => setElectiveName(e.target.value)}
                placeholder="Elective Name"
            />
            <input
                type="text"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                placeholder="Course Code"
            />
            <input
                type="number"
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
                placeholder="Credits"
            />
            <input
                type="text"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                placeholder="Semester"
            />
            <select value={electiveTrackId} onChange={(e) => setElectiveTrackId(e.target.value)}>
                <option value="">Select Track</option>
                {tracks.map(track => (
                    <option key={track.Track_id} value={track.Track_id}>
                        {track.Track_Name}
                    </option>
                ))}
            </select>
            <button className="crud-btn" onClick={createElective}>Create Elective</button>
            <ul>
                {electives.map(elective => (
                    <li key={elective.Elective_id}>
                        {elective.Elective_Name}
                        <button onClick={() => updateElective(elective.Elective_id)}>Update</button>
                        <button onClick={() => deleteElective(elective.Elective_id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="admin-container">
            {/* Header Section */}
            <div className="admin-header">
                <h1>Admin Panel</h1>
            </div>

            {/* Stats Section */}
            <div className="admin-stats">
                <h2>Statistics Overview</h2>
                {/* Add your stats content here */}
            </div>
            {/* Footer Download Button */}
            <div className="admin-footer">
                <button className="btn-download">Download Data</button>
            </div>
            {/* Options Container */}
            <div className="option-container">
                <div className="container-1">
                    <div className="filter-section">
                        <h3>Filter Options</h3>
                        {/* Add filter options/components here */}
                    </div>
                    <div className="student-data">
                        <h3>Student Data</h3>
                        {/* Add student data table/component here */}
                    </div>
                </div>

                {/* Edit Options Container */}
                <div className="edit-options">
                    <button className="btn-primary" onClick={handleEditClick}>
                        {editMode ? 'Cancel' : 'Edit Data'}
                    </button>

                    {editMode && (
                        <>
                            <button className="btn-secondary" onClick={() => handleSectionClick('Departments')}>Manage Departments</button>
                            <button className="btn-secondary" onClick={() => handleSectionClick('Category')}>Manage Categories</button>
                            <button className="btn-secondary" onClick={() => handleSectionClick('Track')}>Manage Tracks</button>
                            <button className="btn-secondary" onClick={() => handleSectionClick('Elective')}>Manage Electives</button>
                            {renderSection()}
                            {/* CRUD Container 
                            <div className="crud-container">
                                <button className="crud-btn">Add</button>
                                <button className="crud-btn">Update</button>
                                <button className="crud-btn">Delete</button>
                            </div>
                            */}
                        </>
                    )}
                </div>
            </div>


        </div>
    );
};

export default Admin;
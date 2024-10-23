import React, { useState, useEffect } from 'react';
import './styling/admin.css'; // Import your CSS styling

const Admin = () => {
    const [showEditOptions, setShowEditOptions] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    // States for Departments
    const [departmentName, setDepartmentName] = useState('');
    const [departments, setDepartments] = useState([]);

    // States for Categories
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);

    // States for Tracks
    const [trackName, setTrackName] = useState('');
    const [trackCategoryId, setTrackCategoryId] = useState('');
    const [selectedDepartments, setSelectedDepartments] = useState([]); // For multiselect
    const [tracks, setTracks] = useState([]);

    // States for Electives
    const [electiveName, setElectiveName] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [credits, setCredits] = useState('');
    const [semester, setSemester] = useState('');
    const [electiveTrackId, setElectiveTrackId] = useState('');
    const [electives, setElectives] = useState([]);

    // Fetch all entities
    useEffect(() => {
        fetchDepartments();
        fetchCategories();
        fetchTracks();
        fetchElectives();
        toggleEditOptions();
    }, []);

    const toggleEditOptions = () => {
        setShowEditOptions(prev => !prev);
    };

    const handleSectionClick = (section) => {
        setActiveSection(section);
    };
    

    // CRUD Operations for Departments
    const fetchDepartments = async () => {
        const response = await fetch('/departments');
        const data = await response.json();
        setDepartments(data);
    };

    const createDepartment = async () => {
        await fetch('/departments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ department_name: departmentName })
        });
        fetchDepartments();
    };

    const updateDepartment = async (id) => {
        const newName = prompt('New Department Name:');
        await fetch(`/departments/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ department_name: newName })
        });
        fetchDepartments();
    };

    const deleteDepartment = async (id) => {
        await fetch(`/departments/${id}`, { method: 'DELETE' });
        fetchDepartments();
    };

    // CRUD Operations for Categories
    const fetchCategories = async () => {
        const response = await fetch('/domain_Category');
        const data = await response.json();
        setCategories(data);
    };

    const createCategory = async () => {
        await fetch('/domain_Category', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category_name: categoryName })
        });
        fetchCategories();
    };

    const updateCategory = async (id) => {
        const newName = prompt('New Category Name:');
        await fetch(`/domain_Category/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category_name: newName })
        });
        fetchCategories();
    };

    const deleteCategory = async (id) => {
        await fetch(`/domain_Category/${id}`, { method: 'DELETE' });
        fetchCategories();
    };

    // CRUD Operations for Tracks
    const fetchTracks = async () => {
        const response = await fetch('/tracks');
        const data = await response.json();
        setTracks(data);
    };

    const createTrack = async () => {
        const response = await fetch('/tracks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Track_Name: trackName, category_id: trackCategoryId })
        });
        const newTrack = await response.json();
        
        // Create entries in track_department for selected departments
        await Promise.all(
            selectedDepartments.map(department_id => 
                fetch('/track_department', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ track_id: newTrack.Track_id, department_id })
                })
            )
        );
        
        fetchTracks();
    };

    const updateTrack = async (id) => {
        const newName = prompt('New Track Name:');
        const newCategoryId = prompt('New Category ID:');
        await fetch(`/tracks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Track_Name: newName, category_id: newCategoryId })
        });
        fetchTracks();
    };

    const deleteTrack = async (id) => {
        await fetch(`/tracks/${id}`, { method: 'DELETE' });
        fetchTracks();
    };

    // CRUD Operations for Electives
    const fetchElectives = async () => {
        const response = await fetch('/electives');
        const data = await response.json();
        setElectives(data);
    };

    const createElective = async () => {
        await fetch('/electives', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Elective_Name: electiveName,
                Course_Code: courseCode,
                Credits: credits,
                Semester: semester,
                Track_id: electiveTrackId
            })
        });
        fetchElectives();
    };

    const updateElective = async (courseCode) => {
        const newName = prompt('New Elective Name:');
        const newCredits = prompt('New Credits:');
        await fetch(`/electives/${courseCode}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Elective_Name: newName, Credits: newCredits })
        });
        fetchElectives();
    };

    const deleteElective = async (courseCode) => {
        await fetch(`/electives/${courseCode}`, { method: 'DELETE' });
        fetchElectives();
    };

    // Multiselect dropdown handler for departments
    const handleDepartmentSelect = (event) => {
        const value = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedDepartments(value);
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <div className="admin-stats"></div>
                <div className="option-container">
                    <div className="container-1">
                        <div className="data-filter">Filters</div>
                        <div className="student-data">Student Data</div>
                    </div>
                    <div className="buttons">
                        <button className="btn-primary" onClick={toggleEditOptions}>Edit Data</button>
                        {showEditOptions && (
                            <div className="edit-options">
                                {/* Department Section */}
                                <button onClick={() => handleSectionClick('Department')} className="btn-secondary">Edit Departments</button>
                                {activeSection === 'Department' && (
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
                                )}

                                {/* Category Section */}
                                <button onClick={() => handleSectionClick('Category')} className="btn-secondary">Edit Categories</button>
                                {activeSection === 'Category' && (
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
                                )}

                                {/* Track Section */}
                                <button onClick={() => handleSectionClick('Track')} className="btn-secondary">Edit Tracks</button>
                                {activeSection === 'Track' && (
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
                                                <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                                            ))}
                                        </select>
                                        <select multiple={true} value={selectedDepartments} onChange={handleDepartmentSelect}>
                                            <option value="">Select Departments</option>
                                            {departments.map(dep => (
                                                <option key={dep.department_id} value={dep.department_id}>{dep.department_name}</option>
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
                                )}

                                {/* Elective Section */}
                                <button onClick={() => handleSectionClick('Elective')} className="btn-secondary">Edit Electives</button>
                                {activeSection === 'Elective' && (
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
                                            type="text"
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
                                        <input
                                            type="text"
                                            value={electiveTrackId}
                                            onChange={(e) => setElectiveTrackId(e.target.value)}
                                            placeholder="Track ID"
                                        />
                                        <button className="crud-btn" onClick={createElective}>Create Elective</button>
                                        <ul>
                                            {electives.map(elective => (
                                                <li key={elective.Course_Code}>
                                                    {elective.Elective_Name}
                                                    <button onClick={() => updateElective(elective.Course_Code)}>Update</button>
                                                    <button onClick={() => deleteElective(elective.Course_Code)}>Delete</button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="admin-footer">
                            <button className="btn-download">Download Data</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;

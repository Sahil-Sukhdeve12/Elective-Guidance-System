import React, { useState, useEffect } from 'react';
import { fetchUserData } from '../firebase/firestoreService';
import './styling/admin.css';
import GraphComponent from './GraphComponent';
import EditModal from './edit';  // Import EditModal
import FilterSection from './FilterSection';
import UserTable from './UserTable';
import axios from 'axios';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filters, setFilters] = useState({
        degree: '',
        collegeName: '',
        department: '',
        section: '',
        sem: '',
        classRollNoRange: { min: '', max: '' },
    });

    const [uniqueDegrees, setUniqueDegrees] = useState([]);
    const [uniqueCollegeNames, setUniqueCollegeNames] = useState([]);
    const [uniqueDepartments, setUniqueDepartments] = useState([]);
    const [uniqueSections, setUniqueSections] = useState([]);
    const [uniqueSemesters, setUniqueSemesters] = useState([]);
    const [Statistics, setStatistics] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [departments, setDepartments] = useState([]);
    const [tracks, setTracks] = useState([]);
    useEffect(() => {
        loadData();
        loadDepartments();
        loadTracks();
    }, []);

    const loadDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/departments');
            setDepartments(response.data);
        } catch (error) {
            console.error('Failed to load departments', error);
        }
    };

    const loadTracks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/tracks');
            setTracks(response.data);
        } catch (error) {
            console.error('Failed to load tracks', error);
        }
    };

    const loadData = async () => {
        const userData = await fetchUserData();
        setUsers(userData);
        setFilteredUsers(userData);
        setStatistics(calculateStatistics(userData));

        setUniqueDegrees(getUniqueValues(userData, 'degree'));
        setUniqueCollegeNames(getUniqueValues(userData, 'collegeName'));
        setUniqueDepartments(getUniqueValues(userData, 'department'));
        setUniqueSections(getUniqueValues(userData, 'section'));
        setUniqueSemesters(getUniqueValues(userData, 'sem'));
    };

    const getUniqueValues = (data, key) => {
        const uniqueValues = [...new Set(data.map(user => user[key]))];
        return uniqueValues.filter(value => value);
    };

    const calculateStatistics = (users) => {
        const totalUsers = users.length || 0;
        const semesterCounts = {};
        const degreeCounts = {};
        const departmentCounts = {};
        const sectionCounts = {};
        const collegeCounts = {};

        users.forEach(user => {
            semesterCounts[user.sem] = (semesterCounts[user.sem] || 0) + 1;
            degreeCounts[user.degree] = (degreeCounts[user.degree] || 0) + 1;
            departmentCounts[user.department] = (departmentCounts[user.department] || 0) + 1;
            sectionCounts[user.section] = (sectionCounts[user.section] || 0) + 1;
            collegeCounts[user.collegeName] = (collegeCounts[user.collegeName] || 0) + 1;
        });

        return {
            totalUsers,
            semesterCounts,
            degreeCounts,
            departmentCounts,
            sectionCounts,
            collegeCounts,
        };
    };

    const applyFilters = () => {
        let filtered = users;

        if (filters.degree) filtered = filtered.filter(user => user.degree.toLowerCase().includes(filters.degree.toLowerCase()));
        if (filters.collegeName) filtered = filtered.filter(user => user.collegeName.toLowerCase().includes(filters.collegeName.toLowerCase()));
        if (filters.department) filtered = filtered.filter(user => user.department.toLowerCase().includes(filters.department.toLowerCase()));
        if (filters.sem) filtered = filtered.filter(user => user.sem.toLowerCase().includes(filters.sem.toLowerCase()));
        if (filters.section) filtered = filtered.filter(user => user.section.toLowerCase().includes(filters.section.toLowerCase()));
        if (filters.classRollNoRange.min) filtered = filtered.filter(user => user.classRollNo >= filters.classRollNoRange.min);
        if (filters.classRollNoRange.max) filtered = filtered.filter(user => user.classRollNo <= filters.classRollNoRange.max);

        setFilteredUsers(filtered);
    };

    const downloadCSV = (data) => {
        const csvRows = [];
        const headers = ["Name", "Enrollment No", "Semester", "Degree", "College Name", "Department", "Section", "Class Roll No", "Email"];
        csvRows.push(headers.join(','));

        data.forEach(user => {
            const row = [
                user.name, user.enrollmentNo, user.sem, user.degree, user.collegeName,
                user.department, user.section, user.classRollNo, user.email
            ];
            csvRows.push(row.join(','));
        });

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'filtered_users.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleEditClick = () => {
        setModalType('edit');
        setIsModalOpen(true); // Open the modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    const handleSaveData = () => {
        setIsModalOpen(false); // Save and close the modal
    };

    const getDepartmentName = (departmentId) => {
        const department = departments.find(dep => dep.department_id === departmentId);
        return department ? department.department_name : 'Unknown';
    };

    const getTrackName = (trackId) => {
        const track = tracks.find(track => track.track_id === trackId);
        return track ? track.Track_Name : 'Unknown';
    };

    return (
        <div className="admin-body">
            <div className="admin-container">
                {/*<div className="admin-stats">
                    <h2>Statistics</h2>
                    {Statistics ? <GraphComponent statistics={Statistics} /> : <div>Loading statistics...</div>}
                </div>
                */}
                <div className="option-container">
                    <div className="container-1">
                        <FilterSection
                            filters={filters}
                            setFilters={setFilters}
                            uniqueDegrees={uniqueDegrees}
                            uniqueCollegeNames={uniqueCollegeNames}
                            uniqueDepartments={uniqueDepartments}
                            uniqueSemesters={uniqueSemesters}
                            uniqueSections={uniqueSections}
                            applyFilters={applyFilters}
                        />
                        <UserTable filteredUsers={filteredUsers} getDepartmentName={getDepartmentName} getTrackName={getTrackName} />
                    </div>

                    <button onClick={() => downloadCSV(filteredUsers)}>Download CSV</button>
                    <button onClick={handleEditClick}>Edit Data</button>

                    {/* Conditionally render EditModal based on isModalOpen */}
                    <EditModal
                        isOpen={isModalOpen}   // Pass isOpen as a prop
                        onClose={handleCloseModal} // Pass onClose to handle closing
                        onSave={handleSaveData}    // Handle save and close logic
                        modalType={modalType}     // Pass modalType to decide which form to show
                        setModalType={setModalType} // Optionally set modalType dynamically
                    />
                </div>
            </div>
        </div>
    );
};

export default Admin;

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
        department: '',
        section: '',
        semester: '',
        classRollNoRange: { min: '', max: '' },
        openElectiveTrack: '',  // New filter for open elective track
        humanitiesElectiveTrack: '', // New filter for humanities elective track
        departmentElectiveTrack: '', // New filter for department elective track
        openElective: '', // New filter for open electives
        humanitiesElective: '', // New filter for humanities electives
        departmentElective: '' // New filter for department electives
    });

    const [uniqueDepartments, setUniqueDepartments] = useState([]);
    const [uniqueSections, setUniqueSections] = useState([]);
    const [uniqueSemesters, setUniqueSemesters] = useState([]);
    const [uniqueTracks, setUniqueTracks] = useState([]); // New state for unique tracks
    const [uniqueElectives, setUniqueElectives] = useState([]); // New state for unique electives
    const [Statistics, setStatistics] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [departments, setDepartments] = useState([]);
    const [electives, setElectives] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openElectivesResults, setOpenElectivesResults] = useState([]); // State to hold the results
    const [humanitiesElectivesResults, setHumanitiesElectivesResults] = useState([]); // State to hold the results
    const [departmentElectivesResults, setDepartmentElectivesResults] = useState([]); // State to hold the results

    useEffect(() => {
        loadData();
        loadDepartments();
        loadTracks();
        loadElectives();
    }, []);



    const loadDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/departments');
            setDepartments(response.data);
        } catch (error) {
            console.error('Failed to load departments', error);
        }
    };

    const loadElectives = async () => {
        try {
            const response = await axios.get('http://localhost:5000/allelectives');
            setElectives(response.data);
        } catch (error) {
            console.error('Failed to load electives', error);
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



    //console.log("open", users.name, users.open)
    //console.log(users)

    //console.log(openElectives);
    const loadData = async () => {
        const userData = await fetchUserData();
        setUsers(userData);
        console.log("User Data:", userData);
        setFilteredUsers(userData);
        setStatistics(calculateStatistics(userData));

        setUniqueDepartments(getUniqueValues(userData, 'department'));
        setUniqueSections(getUniqueValues(userData, 'section'));
        setUniqueSemesters(getUniqueValues(userData, 'semester'));
        setUniqueTracks(getUniqueValues(userData, 'open'));  // Assuming `open` corresponds to the track field
        setUniqueElectives(getUniqueElectives(userData));  // Create function to get unique electives
        setLoading(false);
    };

    //console.log("Userssafda:", uniqueTracks);

    if (loading) {
        return <div>Loading...</div>;
    }

    const getUniqueValues = (data, key) => {
        const uniqueValues = [...new Set(data.map(user => user[key]))];
        return uniqueValues.filter(value => value);
    };

    const getUniqueElectives = (data) => {
        const electives = data.flatMap(user => {
            return [
                ...user.openElectives || [],
                ...user.humanitiesElectives || [],
                ...user.departmentElectives || []
            ];
        });
        const uniqueElectiveNames = [...new Set(electives.map(e => e.Elective_Name))];
        return uniqueElectiveNames;
    };

    const calculateStatistics = (users) => {
        const totalUsers = users.length || 0;
        const semesterCounts = {};
        const departmentCounts = {};
        const sectionCounts = {};

        users.forEach(user => {
            semesterCounts[user.semester] = (semesterCounts[user.semester] || 0) + 1;
            departmentCounts[user.department] = (departmentCounts[user.department] || 0) + 1;
            sectionCounts[user.section] = (sectionCounts[user.section] || 0) + 1;
        });

        return {
            totalUsers,
            semesterCounts,
            departmentCounts,
            sectionCounts,
        };
    };




    const applyFilters = () => {
        let filtered = users;

        //console.log("Filters:", filters);
        //console.log("Users:", users);

        // Department filter
        if (filters.department) {
            // Ensure both filters.department and user.department are of the same type (e.g., both numbers)
            filtered = filtered.filter(user => {
                const departmentId = user.department;  // Assuming this is a number
                const filterDepartment = parseInt(filters.department, 10);  // Convert filter value to number

                // Log to see what's happening
                console.log(`Filtering by department: ${filterDepartment} === ${departmentId}`, departmentId === filterDepartment);

                return departmentId === filterDepartment; // Compare as numbers
            });
            console.log('Filtered after department:', filtered);  // Log the filtered users after applying department filter
        }


        // Filter by semester (assuming it's a number, no need for toLowerCase)
        if (filters.semester) {
            filtered = filtered.filter(user => user.semester === Number(filters.semester)); // Convert filter to number and compare
        }

        // Filter by section (no need for toLowerCase, case sensitivity is ignored)
        if (filters.section) {
            filtered = filtered.filter(user => user.section === filters.section); // Directly compare section
        }

        // Filter by class roll number range (ensure it's numeric)
        if (filters.classRollNoRange.min) {
            filtered = filtered.filter(user => user.classRollNo >= filters.classRollNoRange.min);
        }
        if (filters.classRollNoRange.max) {
            filtered = filtered.filter(user => user.classRollNo <= filters.classRollNoRange.max);
        }

        // Elective track filters (open, humanities, department)
        if (filters.open) {
            filtered = filtered.filter(user => getTrackName(user.open) === filters.open);
        }
        if (filters.humanities) {
            filtered = filtered.filter(user => getTrackName(user.humanities) === filters.humanities);
        }
        if (filters.department) {
            filtered = filtered.filter(user => getTrackName(user.department) === filters.department);
        }

        console.log('filtered:', filtered);
        setFilteredUsers(filtered);
    };

    const clearFilters = () => {
        setFilters({
            department: '',
            section: '',
            semester: '',
            classRollNoRange: { min: '', max: '' },
            openElectiveTrack: '',
            humanitiesElectiveTrack: '',
            departmentElectiveTrack: '',
            openElective: '',
            humanitiesElective: '',
            departmentElective: ''
        });
        setFilteredUsers(users);  // Reset to show all users
    };


    const downloadCSV = (data) => {
        const csvRows = [];
        const headers = ["Name", "Enrollment No", "Semester", "Department", "Section", "Class Roll No", "Open Track", "Open Elective", "Humanities", "Humanities Elective", "Department Track", "Department Elective"];
        csvRows.push(headers.join(',')); // Push headers
    
        data.forEach(user => {
            // Get the open electives for this user from openElectivesResults
            const userOElectives = openElectivesResults.find(result => result.userId === user.id);
            const userHElectives = humanitiesElectivesResults.find(result => result.userId === user.id);
            const userDElectives = departmentElectivesResults.find(result => result.userId === user.id);
            // If openElectives for this user exist, map the elective names (or other details) to a string
            const openElectiveNames = userOElectives 
                ? userOElectives.openElectives.map(elective => elective.Elective_Name).join('; ')  // Join with semicolon for multiple electives
                : ''; // If no open electives found, leave it as empty
    
            const humanitiesElectiveNames = userHElectives 
                ? userHElectives.humanitiesElectives.map(elective => elective.Elective_Name).join('; ')
                : '';

            const departmentElectiveNames = userDElectives
                ? userDElectives.departmentElectives.map(elective => elective.Elective_Name).join('; ')
                : '';
            
            console.log('useridd', user.id);
            // Prepare the row data
            const row = [
                user.name,
                user.enrollment_no,
                user.semester,
                getDepartmentName(user.department),
                user.section,
                user.class_roll_no,
                getTrackName(user.open),
                openElectiveNames, // Add the open electives here
                getTrackName(user.humanities), // Placeholder for "Humanities" (add the actual value as needed)
                humanitiesElectiveNames, // Placeholder for "Humanities Elective" (add the actual value as needed)
                getTrackName(user.department_electives), // Placeholder for "Department Track" (add the actual value as needed)
                departmentElectiveNames  // Placeholder for "Department Elective" (add the actual value as needed)
            ];
            
            console.log("Row:", row); // Log for debugging
            csvRows.push(row.join(',')); // Add the row to CSV rows
        });
    
        const csvString = csvRows.join('\n');  // Join rows with newline to create CSV string
        const blob = new Blob([csvString], { type: 'text/csv' }); // Create Blob for CSV file
        const url = URL.createObjectURL(blob); // Create URL for Blob
    
        const link = document.createElement('a'); // Create download link
        link.setAttribute('href', url);
        link.setAttribute('download', 'filtered_users.csv'); // Specify download filename
        document.body.appendChild(link);  // Append link to DOM
        link.click(); // Trigger download
        document.body.removeChild(link);  // Remove link from DOM after click
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
        const track = tracks.find(track => track.Track_id === trackId);
        return track ? track.Track_Name : 'Unknown';
    };


    const fetchUserElectives = async (electives, trackId, semester) => {
        try {
            // Ensure both semester and Track_id are compared properly
            const filteredElectives = electives.filter(elective =>
                elective.Track_id === trackId && elective.Semester === semester // Both should already be strings
            );

            console.log('filteredElectives:', filteredElectives); // Log the filtered electives for debugging
            return filteredElectives;
        } catch (error) {
            console.error('Error fetching electives:', error);
            return []; // Return an empty array if there's an error
        }
    };

    // Fetch open electives for all filtered users
    useEffect(() => {
        fetchDepartmentElectivesForUsers();
        fetchHumanitiesElectivesForUsers();
        fetchOpenElectivesForUsers();  // Call the async function to fetch electives for all users
    }, [filteredUsers, electives]); // Dependencies to trigger when filteredUsers or electives change

    const fetchOpenElectivesForUsers = async () => {
        // Ensure that there are filtered users and electives available
        if (filteredUsers.length > 0 && electives.length > 0) {
            const results = []; // Initialize an empty array to store the open electives for each user

            // Loop through each filtered user to fetch their electives
            for (const user of filteredUsers) {
                // Ensure the user has both 'semester' and 'open' fields
                if (user.semester && user.open !== undefined) {
                    const trackId = user.open;  // Track ID of the user
                    const semester = user.semester;  // Semester of the user

                    // Log user details for debugging
                    console.log("User:", user.name, "trackId:", trackId, "semester:", semester);

                    // Fetch electives for the current user
                    const openElectives = await fetchUserElectives(electives, trackId, semester);

                    // Store the result for this user in the array
                    results.push({
                        userId: user.id,  // Assuming 'id' is a unique identifier for the user
                        name: user.name,
                        openElectives: openElectives
                    });
                } else {
                    // If the user doesn't have 'semester' or 'open', log a message and skip them
                    console.log(`Skipping user ${user.name} due to missing 'semester' or 'open' field`);
                }
            }

            // After processing all users, update the state with the results
            console.log("All users' open electives:", results);
            setOpenElectivesResults(results); // Set the state with the results
        }
    };

    const fetchHumanitiesElectivesForUsers = async () => {
        if (filteredUsers.length > 0 && electives.length > 0) {
            const results = [];

            for (const user of filteredUsers) {
                if (user.semester && user.humanities !== undefined) {
                    const trackId = user.humanities;
                    const semester = user.semester;

                    console.log("User:", user.name, "trackId:", trackId, "semester:", semester);

                    const humanitiesElectives = await fetchUserElectives(electives, trackId, semester);

                    results.push({
                        userId: user.id,
                        name: user.name,
                        humanitiesElectives: humanitiesElectives
                    });
                } else {
                    console.log(`Skipping user ${user.name} due to missing 'semester' or 'humanities' field`);
                }
            }

            console.log("All users' humanities electives:", results);
            setHumanitiesElectivesResults(results);
        }
    };

    const fetchDepartmentElectivesForUsers = async () => {
        if (filteredUsers.length > 0 && electives.length > 0) {
            const results = [];

            for (const user of filteredUsers) {
                if (user.semester && user.department_electives !== undefined) {
                    const trackId = user.department_electives;
                    const semester = user.semester;

                    console.log("User:", user.name, "trackId:", trackId, "semester:", semester);

                    const departmentElectives = await fetchUserElectives(electives, trackId, semester);

                    results.push({
                        userId: user.id,
                        name: user.name,
                        departmentElectives: departmentElectives
                    });
                } else {
                    console.log(`Skipping user ${user.name} due to missing 'semester' or 'department' field`);
                }
            }

            console.log("All users' department electives:", results);
            setDepartmentElectivesResults(results);
        }
    };
    console.log("departmentElectiveResults", departmentElectivesResults);    

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
                            clearFilters={clearFilters}
                            getDepartmentName={getDepartmentName}
                            uniqueDepartments={uniqueDepartments}
                            uniqueSemesters={uniqueSemesters}
                            uniqueSections={uniqueSections}
                            applyFilters={applyFilters}
                            tracks={uniqueTracks}
                            //electives={electives}
                        />
                        <UserTable
                            filteredUsers={filteredUsers}
                            getDepartmentName={getDepartmentName}
                            getTrackName={getTrackName}
                            openElectivesResults={openElectivesResults}
                            humanitiesElectivesResults={humanitiesElectivesResults}
                            departmentElectivesResults={departmentElectivesResults}
                        />
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

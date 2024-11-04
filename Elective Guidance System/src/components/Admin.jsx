import { useState, useEffect } from 'react';
import { fetchUserData } from '../firebase/firestoreService';
import './styling/admin.css'; // Import your CSS styling
import GraphComponent from './GraphComponent';

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

    // Unique value states
    const [uniqueDegrees, setUniqueDegrees] = useState([]);
    const [uniqueCollegeNames, setUniqueCollegeNames] = useState([]);
    const [uniqueDepartments, setUniqueDepartments] = useState([]);
    const [uniqueSections, setUniqueSections] = useState([]);
    const [uniqueSemesters, setUniqueSemesters] = useState([]);

    const [Statistics, setStatistics] = useState(null);

    // Fetching all entities
    useEffect(() => {
        loadData();
    }, []);

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

    const loadData = async () => {
        const userData = await fetchUserData();
        console.log(userData); // Log user data
        setUsers(userData);
        setFilteredUsers(userData);
        setStatistics(calculateStatistics(userData));

        // Set unique values
        setUniqueDegrees(getUniqueValues(userData, 'degree'));
        setUniqueCollegeNames(getUniqueValues(userData, 'collegeName'));
        setUniqueDepartments(getUniqueValues(userData, 'department'));
        setUniqueSections(getUniqueValues(userData, 'section'));
        setUniqueSemesters(getUniqueValues(userData, 'sem'));
    };

    const getUniqueValues = (data, key) => {
        const uniqueValues = [...new Set(data.map(user => user[key]))];
        return uniqueValues.filter(value => value); // Filter out any undefined values
    };

    const applyFilters = () => {
        let filtered = users;

        // Apply filters
        if (filters.degree) {
            filtered = filtered.filter(user => user.degree.toLowerCase().includes(filters.degree.toLowerCase()));
        }
        if (filters.collegeName) {
            filtered = filtered.filter(user => user.collegeName.toLowerCase().includes(filters.collegeName.toLowerCase()));
        }
        if (filters.department) {
            filtered = filtered.filter(user => user.department.toLowerCase().includes(filters.department.toLowerCase()));
        }
        if (filters.section) {
            filtered = filtered.filter(user => user.section.toLowerCase().includes(filters.section.toLowerCase()));
        }
        if (filters.sem) {
            filtered = filtered.filter(user => user.sem.toLowerCase().includes(filters.sem.toLowerCase()));
        }
        if (filters.classRollNoRange.min) {
            filtered = filtered.filter(user => user.classRollNo >= filters.classRollNoRange.min);
        }
        if (filters.classRollNoRange.max) {
            filtered = filtered.filter(user => user.classRollNo <= filters.classRollNoRange.max);
        }

        setFilteredUsers(filtered);
    };

    const downloadCSV = (data) => {
        const csvRows = [];
        // Get the headers
        const headers = [
            "Name",
            "Enrollment No",
            "Semester",
            "Degree",
            "College Name",
            "Department",
            "Section",
            "Class Roll No",
            "Email"
        ];
        csvRows.push(headers.join(','));

        // Format the data into rows
        data.forEach(user => {
            const row = [
                user.name,
                user.enrollmentNo,
                user.sem,
                user.degree,
                user.collegeName,
                user.department,
                user.section,
                user.classRollNo,
                user.email
            ];
            csvRows.push(row.join(','));
        });

        // Create a Blob from the CSV string
        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        // Create a link to download the file
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'filtered_users.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <div className="admin-body">
            <div className="admin-container">
                {/* Stats Section */}
                <div className="admin-stats">
                    <h2>Statistics</h2>
                    {Statistics ? (
                        <GraphComponent statistics={Statistics} />
                    ) : (
                        <div>Loading statistics...</div>
                    )}
                </div>
                {/* Options Container */}
                <div className="option-container">
                    <div className="container-1">
                        <div className="filter-section">
                            <label>
                                Degree:
                                <select
                                    value={filters.degree}
                                    onChange={(e) => setFilters({ ...filters, degree: e.target.value })}
                                >
                                    <option value="">All</option>
                                    {uniqueDegrees.map((degree, index) => (
                                        <option key={index} value={degree}>{degree}</option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                College Name:
                                <select
                                    value={filters.collegeName}
                                    onChange={(e) => setFilters({ ...filters, collegeName: e.target.value })}
                                >
                                    <option value="">All</option>
                                    {uniqueCollegeNames.map((college, index) => (
                                        <option key={index} value={college}>{college}</option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Department:
                                <select
                                    value={filters.department}
                                    onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                                >
                                    <option value="">All</option>
                                    {uniqueDepartments.map((department, index) => (
                                        <option key={index} value={department}>{department}</option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Section:
                                <select
                                    value={filters.section}
                                    onChange={(e) => setFilters({ ...filters, section: e.target.value })}
                                >
                                    <option value="">All</option>
                                    {uniqueSections.map((section, index) => (
                                        <option key={index} value={section}>{section}</option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Semester:
                                <select
                                    value={filters.sem}
                                    onChange={(e) => setFilters({ ...filters, sem: e.target.value })}
                                >
                                    <option value="">All</option>
                                    {uniqueSemesters.map((semester, index) => (
                                        <option key={index} value={semester}>{semester}</option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Class Roll No Range:
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={filters.classRollNoRange.min}
                                    onChange={(e) => setFilters({ ...filters, classRollNoRange: { ...filters.classRollNoRange, min: e.target.value } })}
                                />
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={filters.classRollNoRange.max}
                                    onChange={(e) => setFilters({ ...filters, classRollNoRange: { ...filters.classRollNoRange, max: e.target.value } })}
                                />
                            </label>

                            <button onClick={applyFilters}>Apply Filters</button>
                        </div>

                        <div className="student-data">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Enrollment No</th>
                                        <th>Semester</th>
                                        <th>Degree</th>
                                        <th>College Name</th>
                                        <th>Department</th>
                                        <th>Section</th>
                                        <th>Class Roll No</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan="9" style={{ textAlign: "center" }}>No users found</td>
                                        </tr>
                                    ) : (
                                        filteredUsers.map((user, index) => (
                                            <tr key={index}>
                                                <td>{user.name}</td>
                                                <td>{user.enrollmentNo}</td>
                                                <td>{user.sem}</td>
                                                <td>{user.degree}</td>
                                                <td>{user.collegeName}</td>
                                                <td>{user.department}</td>
                                                <td>{user.section}</td>
                                                <td>{user.classRollNo}</td>
                                                <td>{user.email}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <button onClick={() => downloadCSV(filteredUsers)}>Download CSV</button>
                    <button onClick={() => {}}>Edit Electives</button>
                </div>
            </div>
           
        </div>
    );
};

export default Admin;
import React from 'react';

const UserTable = ({ filteredUsers, getDepartmentName, getTrackName, openElectivesResults, humanitiesElectivesResults, DepartmentElectivesResults }) => {
    // If no users, display message
    if (!filteredUsers || filteredUsers.length === 0) {
        return (
            <div className="student-data">
                <p>No users found</p>
            </div>
        );
    }

    // Get the unique set of column names across all users
    const allColumnNames = new Set();
    filteredUsers.forEach(user => {
        Object.keys(user).forEach(key => {
            allColumnNames.add(key);
        });
    });

    const columnNames = Array.from(allColumnNames);
    
    // Manually specify the desired column order
    const preferredColumnsOrder = [
        'name', 'enrollment_no', 'department', 'semester', 'section', 'classRollNo'
    ];

    // Filter out unwanted columns (id, password, degree, college_name, email, etc.)
    const filteredColumns = columnNames.filter(
        column => column !== 'id' && column !== 'password' && column !== 'degree' && column !== 'college_name' && column !== 'email'
    );

    // Now, reorder the columns
    const finalColumns = [
        ...preferredColumnsOrder.filter(column => filteredColumns.includes(column)),  // Preferred columns first
        ...filteredColumns.filter(column => !preferredColumnsOrder.includes(column)) // Then the rest
    ];

    // Function to get electives for a user from results
    const getElectivesForUser = (userId, electivesResults) => {
        const electives = electivesResults.find(result => result.userId === userId);
        return electives ? electives.openElectives : [];  // Return open electives (or empty array if not found)
    };

    // Render the table
    return (
        <div className="student-data">
            <table>
                <thead>
                    <tr>
                        {finalColumns.map((column) => {
                            // Dynamically render column headers
                            if (column === 'open') {
                                return <th key={column}>Open Electives</th>;
                            } else if (column === 'humanities') {
                                return <th key={column}>Humanities Electives</th>;
                            } else if (column === 'department') {
                                return <th key={column}>Department</th>;
                            } else if (column === 'sem') {
                                return <th key={column}>Semester</th>;
                            } else if (column === 'section') {
                                return <th key={column}>Section</th>;
                            } else if (column === 'classRollNo') {
                                return <th key={column}>Class Roll No</th>;
                            } else {
                                return <th key={column}>{column.charAt(0).toUpperCase() + column.slice(1)}</th>;
                            }
                        })}
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={index}>
                            {finalColumns.map((column) => {
                                try {
                                    // Dynamically render the values for each user
                                    if (column === 'open') {
                                        const trackName = getTrackName(user.open);
                                        const electives = getElectivesForUser(user.id, openElectivesResults);
                                        const electiveNames = electives.map(e => e.Elective_Name).join('; ') || 'N/A';
                                        return <td key={column}>{electiveNames} ({trackName})</td>;
                                    } else if (column === 'humanities') {
                                        const trackName = getTrackName(user.humanities);
                                        const electives = getElectivesForUser(user.id, humanitiesElectivesResults);
                                        const electiveNames = electives.map(e => e.Elective_Name).join('; ') || 'N/A';
                                        return <td key={column}>{electiveNames} ({trackName})</td>;
                                    } else if (column === 'department') {
                                        const departmentName = getDepartmentName(user.department);
                                        return <td key={column}>{departmentName}</td>;
                                    } else if (column === 'departmentElectives') {
                                        const electives = getElectivesForUser(user.id, DepartmentElectivesResults);
                                        const electiveNames = electives.map(e => e.Elective_Name).join('; ') || 'N/A';
                                        return <td key={column}>{electiveNames}</td>;
                                    } else {
                                        return <td key={column}>{user[column]}</td>;
                                    }
                                } catch (error) {
                                    console.error(`Error rendering column ${column} for user ${user.name}:`, error);
                                    return <td key={column}>Error</td>;
                                }
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;

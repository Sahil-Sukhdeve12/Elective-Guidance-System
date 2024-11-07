import React from 'react';

const UserTable = ({ filteredUsers, getDepartmentName, getTrackName }) => {
    // Log the incoming filteredUsers
    console.log('Rendering UserTable with filteredUsers:', filteredUsers);

    if (!filteredUsers || filteredUsers.length === 0) {
        console.log('No users found or filteredUsers is empty');
        return (
            <div className="student-data">
                <p>No users found</p>
            </div>
        );
    }

    // Get the keys of the first user to dynamically generate the columns
    // Create a Set to capture all possible keys across users
    const allColumnNames = new Set();

    filteredUsers.forEach(user => {
        Object.keys(user).forEach(key => {
            allColumnNames.add(key);
        });
    });

    // Convert the Set to an array and log the dynamic column names
    const columnNames = Array.from(allColumnNames);
    console.log('Dynamically generated column names:', columnNames);

    // Optional: Filter out specific columns (like 'id' or 'password')
    const filteredColumns = columnNames.filter(column => column !== 'id' && column !== 'password');
    console.log('Filtered column names (excluding id/password):', filteredColumns);

    return (
        <div className="student-data">
            <table>
                <thead>
                    <tr>
                        {filteredColumns.map((column) => {
                            // Dynamically render the column headers, applying special cases for fields
                            console.log(`Rendering column: ${column}`);
                            if (column === 'open') {
                                return <th key={column}>Open</th>;
                            } else if (column === 'humanities') {
                                return <th key={column}>Humanities</th>;
                            } else if (column === 'department') {
                                return <th key={column}>Department</th>;
                            } else if (column === 'sem') {
                                return <th key={column}>Semester</th>;
                            } else if (column === 'degree') {
                                return <th key={column}>Degree</th>;
                            } else if (column === 'collegeName') {
                                return <th key={column}>College Name</th>;
                            } else if (column === 'section') {
                                return <th key={column}>Section</th>;
                            } else if (column === 'classRollNo') {
                                return <th key={column}>Class Roll No</th>;
                            } else if (column === 'email') {
                                return <th key={column}>Email</th>;
                            } else {
                                // Default case: use the field name as the column name
                                return <th key={column}>{column.charAt(0).toUpperCase() + column.slice(1)}</th>;
                            }
                        })}
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={index}>
                            {filteredColumns.map((column) => {
                                try {
                                    // Dynamically render the values of each user
                                    if (column === 'open') {
                                        const trackName = getTrackName(user.open);
                                        console.log(`Rendering 'open' for user ${user.name}: ${trackName}`);
                                        return <td key={column}>{trackName}</td>;
                                    } else if (column === 'humanities') {
                                        const humanitiesTrackName = getTrackName(user.humanities);
                                        console.log(`Rendering 'humanities' for user ${user.name}: ${humanitiesTrackName}`);
                                        return <td key={column}>{humanitiesTrackName}</td>;
                                    } else if (column === 'department') {
                                        const departmentName = getDepartmentName(user.department);
                                        console.log(`Rendering 'department' for user ${user.name}: ${departmentName}`);
                                        return <td key={column}>{departmentName}</td>;
                                    } else {
                                        console.log(`Rendering ${column} for user ${user.name}: ${user[column]}`);
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

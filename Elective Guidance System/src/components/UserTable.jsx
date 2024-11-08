import React from 'react';

const UserTable = ({
    filteredUsers, 
    getDepartmentName, 
    getTrackName, 
    openElectivesResults = [], 
    humanitiesElectivesResults = [], 
    departmentElectivesResults = []
}) => {
    // If no users, display a message
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
        Object.keys(user).forEach(key => allColumnNames.add(key));
    });

    const columnNames = Array.from(allColumnNames);

    // Manually specify the desired column order
    const preferredColumnsOrder = [
        'name', 'enrollment_no', 'department', 'semester', 'section', 'class_roll_no', 
        'open', 'humanities', 'department_electives'
    ];

    // Filter out unwanted columns
    const filteredColumns = columnNames.filter(
        column => !['id', 'password', 'degree', 'college_name', 'email'].includes(column)
    );

    // Reorder columns, giving priority to the preferred ones
    const finalColumns = [
        ...preferredColumnsOrder.filter(column => filteredColumns.includes(column)),
        ...filteredColumns.filter(column => !preferredColumnsOrder.includes(column))
    ];

    // Function to get electives for a user from results
    const getElectivesForUser = (userId, electivesResults) => {
        if (!electivesResults) return [];
        const electives = electivesResults.find(result => result.userId === userId);
        return electives ? electives.openElectives || [] : [];
    };

    const getHElectivesForUser = (userId, electivesResults) => {
        if (!electivesResults) return [];
        const electives = electivesResults.find(result => result.userId === userId);
        console.log("H Electives for user:", electives);
        return electives ? electives.humanitiesElectives || [] : [];
    };

    const getDElectivesForUser = (userId, electivesResults) => {
        console.log('All Department Electives Results:', electivesResults);
        
        const electives = electivesResults.find(result => result.userId === userId);
        console.log("Electives for user:", electives);    
        return electives ? electives.departmentElectives || [] : [];
    };
    
    // Render the table
    return (
        <div className="student-data">
            <table>
                <thead>
                    <tr>
                        {finalColumns.map(column => {
                            // Dynamically render column headers
                            switch (column) {
                                case 'open':
                                    return <th key={column}>Open Electives</th>;
                                case 'humanities':
                                    return <th key={column}>Humanities Electives</th>;
                                case 'department_electives':
                                    return <th key={column}>Department Electives</th>;
                                case 'department':
                                    return <th key={column}>Department</th>;
                                case 'semester':
                                    return <th key={column}>Semester</th>;
                                case 'section':
                                    return <th key={column}>Section</th>;
                                case 'class_roll_no':
                                    return <th key={column}>Class Roll No</th>;
                                default:
                                    return <th key={column}>{column.charAt(0).toUpperCase() + column.slice(1)}</th>;
                            }
                        })}
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={index}>
                            {finalColumns.map(column => {
                                try {
                                    // Dynamically render the values for each user
                                    switch (column) {
                                        case 'open':
                                            const openElectives = getElectivesForUser(user.id, openElectivesResults);
                                            const openElectiveNames = openElectives.length ? openElectives.map(e => e.Elective_Name).join('; ') : 'N/A';
                                            const openTrackName = getTrackName(user.open);
                                            return <td key={column}>{openElectiveNames} ({openTrackName})</td>;

                                        case 'humanities':
                                            const humanitiesElectives = getHElectivesForUser(user.id, humanitiesElectivesResults);
                                            console.log('Humanities Electives:', humanitiesElectives);
                                            const humanitiesElectiveNames = humanitiesElectives.length ? humanitiesElectives.map(e => e.Elective_Name).join('; ') : 'N/A';
                                            const humanitiesTrackName = getTrackName(user.humanities);
                                            return <td key={column}>{humanitiesElectiveNames} ({humanitiesTrackName})</td>;

                                        case 'department':
                                            const departmentName = getDepartmentName(user.department);
                                            return <td key={column}>{departmentName}</td>;

                                        case 'department_electives':
                                            const departmentElectives = getDElectivesForUser(user.id, departmentElectivesResults);
                                            
                                            // Debugging log to help with tracking the department electives data
                                            console.log('departmentElectives for user:', user.name, departmentElectives);
                                            
                                            const departmentElectiveNames = departmentElectives.length ? departmentElectives.map(e => e.Elective_Name).join('; ') : 'N/A';
                                            const departmentTrackName = getTrackName(user.department_electives);
                                            return <td key={column}>{departmentElectiveNames} ({departmentTrackName})</td>;

                                        default:
                                            return <td key={column}>{user[column] || 'N/A'}</td>;
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

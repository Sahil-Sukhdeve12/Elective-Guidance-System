import React from 'react';

const UserTable = ({ filteredUsers, getDepartmentName }) => {
    return (
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
                        <tr><td colSpan="9" style={{ textAlign: 'center' }}>No users found</td></tr>
                    ) : (
                        filteredUsers.map((user, index) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.enrollmentNo}</td>
                                <td>{user.sem}</td>
                                <td>{user.degree}</td>
                                <td>{user.collegeName}</td>
                                <td>{getDepartmentName(user.department)}</td>
                                <td>{user.section}</td>
                                <td>{user.classRollNo}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;

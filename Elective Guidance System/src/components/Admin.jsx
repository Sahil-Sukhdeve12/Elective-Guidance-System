import React, { useState } from 'react';
import './styling/admin.css'; // Import your CSS

const Admin = () => {
    const [showEditOptions, setShowEditOptions] = useState(false);
    const [activeSection, setActiveSection] = useState(''); // Track the current open section (Category, Tracks, or Electives)

    const toggleEditOptions = () => {
        setShowEditOptions(!showEditOptions);
    };

    const handleSectionClick = (section) => {
        setActiveSection(activeSection === section ? '' : section); // Toggle section
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <button className="btn-primary" onClick={toggleEditOptions}>Edit Data</button>
                {showEditOptions && (
                    <div className="edit-options">
                        <button onClick={() => handleSectionClick('Category')} className="btn-secondary">Edit Category</button>
                        {activeSection === 'Category' && (
                            <div className="crud-container">
                                <button className="crud-btn">Create Category</button>
                                <button className="crud-btn">Read Categories</button>
                                <button className="crud-btn">Update Category</button>
                                <button className="crud-btn">Delete Category</button>
                            </div>
                        )}

                        <button onClick={() => handleSectionClick('Tracks')} className="btn-secondary">Edit Tracks</button>
                        {activeSection === 'Tracks' && (
                            <div className="crud-container">
                                <button className="crud-btn">Create Track</button>
                                <button className="crud-btn">Read Tracks</button>
                                <button className="crud-btn">Update Track</button>
                                <button className="crud-btn">Delete Track</button>
                            </div>
                        )}

                        <button onClick={() => handleSectionClick('Electives')} className="btn-secondary">Edit Electives</button>
                        {activeSection === 'Electives' && (
                            <div className="crud-container">
                                <button className="crud-btn">Create Elective</button>
                                <button className="crud-btn">Read Electives</button>
                                <button className="crud-btn">Update Elective</button>
                                <button className="crud-btn">Delete Elective</button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="admin-footer">
                <button className="btn-download">Download Data</button>
            </div>
        </div>
    );
};

export default Admin;

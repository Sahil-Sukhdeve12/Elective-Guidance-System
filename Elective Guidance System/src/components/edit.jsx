import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls
import "./styling/edit.css"; // Import the CSS file for styling

const EditModal = ({ isOpen, onClose, onSave, modalType, setModalType }) => {
    if (!isOpen) return null;  // Don't render modal if it's closed

    const [actionType, setActionType] = useState(""); // Track Add/Update/Delete actions
    const [departments, setDepartments] = useState([]); // Store fetched departments
    const [categories, setCategories] = useState([]); // Store fetched categories
    const [tracks, setTracks] = useState([]); // Store fetched tracks
    const [electives, setElectives] = useState([]); // Store fetched electives
    const [formData, setFormData] = useState({
        selectedDepartments: [],
        category_id: "",
        Track_Name: "",
        department_name: "",
        category_name: ""
    }); // Form data for Track

    // Handle clicking on Edit button (Department, Category, Track, Elective)
    const handleEditButtonClick = (type) => {
        setModalType(type);  // Set the modal type based on which Edit button was clicked
        setActionType(""); // Reset action type when switching between Edit options
    };

    // Handle clicking Add/Update/Delete
    const handleActionClick = (action) => {
        setActionType(action);  // Set the action type based on the selected action
    };

    useEffect(() => {
        // Reset form data when switching modal types
        if (modalType === "Department") {
            setFormData({
                ...formData,
                department_name: "",
                selectedDepartments: [],
                selectedDepartmentToUpdate: "",
            });
        } else if (modalType === "Category") {
            setFormData({
                ...formData,
                category_name: "",
                selectedCategoryToUpdate: "",
            });
        }
    }, [modalType]); // Reset form when modalType changes


    // Fetch departments and categories from the backend
    useEffect(() => {
        const fetchDepartmentsAndCategories = async () => {
            try {
                const [departmentsResponse, categoriesResponse] = await Promise.all([
                    axios.get('http://localhost:5000/departments'),
                    axios.get('http://localhost:5000/categories')
                ]);

                setDepartments(departmentsResponse.data); // Set the fetched departments
                setCategories(categoriesResponse.data); // Set the fetched categories
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDepartmentsAndCategories();
    }, []); // Empty dependency array means this runs once on mount

    // Fetch tracks for dropdown and electives for a specific track
    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/tracks');
                setTracks(response.data);
            } catch (error) {
                console.error('Error fetching tracks:', error);
            }
        };
        fetchTracks();
    }, []);

    useEffect(() => {
        if (formData.Track_id) {
            const fetchElectives = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/electives/track/${formData.Track_id}`);
                    setElectives(response.data);
                } catch (error) {
                    console.error('Error fetching electives:', error);
                }
            };
            fetchElectives();
        }
    }, [formData.Track_id]);

    // Handle input changes in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle the multi-select input change for departments
    const handleDepartmentSelect = (e) => {
        const options = e.target.options;
        const selectedValues = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedValues.push(options[i].value);
            }
        }
        setFormData({
            ...formData,
            selectedDepartments: selectedValues,
        });
    };

    // Add Department or Category
    const handleAddDepartment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/departments', {
                department_name: formData.department_name
            });
            alert('Department added successfully!');
            setDepartments([...departments, response.data]);
            setFormData({ ...formData, department_name: "" }); // Reset department input field
        } catch (error) {
            console.error('Error adding department:', error);
            alert('Error adding department');
        }
    };

    const handleAddCategory = async () => {
        try {
            const response = await axios.post('http://localhost:5000/categories', {
                category_name: formData.category_name
            });
            alert('Category added successfully!');
            setCategories([...categories, response.data]);
            setFormData({ ...formData, category_name: "" }); // Reset category input field
        } catch (error) {
            console.error('Error adding category:', error);
            alert('Error adding category');
        }
    };

    // Handle updating a department
    const handleUpdateDepartment = async () => {
        try {
            const departmentId = formData.selectedDepartmentToUpdate;
            const response = await axios.put(`http://localhost:5000/departments/${departmentId}`, {
                department_name: formData.department_name
            });
            alert('Department updated successfully!');
            setDepartments(departments.map(department => department.department_id === departmentId ? { ...department, department_name: formData.department_name } : department));
            setFormData({ ...formData, department_name: "" }); // Reset form
        } catch (error) {
            console.error('Error updating department:', error);
            alert('Error updating department');
        }
    };

    // Handle updating a category
    const handleUpdateCategory = async () => {
        try {
            const categoryId = formData.selectedCategoryToUpdate;
            const response = await axios.put(`http://localhost:5000/categories/${categoryId}`, {
                category_name: formData.category_name
            });
            alert('Category updated successfully!');
            setCategories(categories.map(category => category.category_id === categoryId ? { ...category, category_name: formData.category_name } : category));
            setFormData({ ...formData, category_name: "" }); // Reset form
        } catch (error) {
            console.error('Error updating category:', error);
            alert('Error updating category');
        }
    };

    // Handle deleting a department
    const handleDeleteDepartment = async () => {
        try {
            const departmentId = formData.selectedDepartmentToUpdate;
            await axios.delete(`http://localhost:5000/departments/${departmentId}`);
            alert('Department deleted successfully!');
            setDepartments(departments.filter(department => department.department_id !== departmentId));
            setFormData({ ...formData, selectedDepartmentToUpdate: "" }); // Reset form
        } catch (error) {
            console.error('Error deleting department:', error);
            alert('Error deleting department');
        }
    };

    // Handle deleting a category
    const handleDeleteCategory = async () => {
        try {
            const categoryId = formData.selectedCategoryToUpdate;
            await axios.delete(`http://localhost:5000/categories/${categoryId}`);
            alert('Category deleted successfully!');
            setCategories(categories.filter(category => category.category_id !== categoryId));
            setFormData({ ...formData, selectedCategoryToUpdate: "" }); // Reset form
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Error deleting category');
        }
    };

    const handleAddTrack = async () => {
        try {
            const data = {
                Track_Name: formData.Track_Name,
                category_id: formData.category_id,
                selectedDepartments: formData.selectedDepartments, // List of selected department IDs
            };

            console.log("Sending data:", data);

            // Send the request to the backend to create the track
            const response = await axios.post('http://localhost:5000/tracks', data);
            const trackId = response.data.track_id; // Assuming the backend returns the track_id

            // Now associate departments with the newly created track
            for (const departmentId of formData.selectedDepartments) {
                await axios.post('http://localhost:5000/track_department', {
                    track_id: trackId,  // Use the track_id returned from the backend
                    department_id: departmentId
                });
            }

            onSave();
            onClose();
        } catch (error) {
            console.error('Error adding track and departments:', error);
            alert('Error adding track and departments');
        }
    };

    const handleAddElective = async () => {
        const data = {
            Elective_Name: formData.Elective_Name,
            Course_Code: formData.Course_Code,
            Credits: formData.Credits,
            Semester: formData.Semester,
            Track_id: formData.Track_id,
        };

        try {
            await axios.post('http://localhost:5000/electives', data);
            alert('Elective added successfully');
            setFormData({ ...formData, Elective_Name: "", Course_Code: "", Credits: "", Semester: "" });
            onSave();
        } catch (error) {
            console.error('Error adding elective:', error);
            alert('Error adding elective');
        }
    };

    const handleUpdateElective = async () => {
        const data = {
            Elective_Name: formData.Elective_Name,
            Course_Code: formData.Course_Code,
            Credits: formData.Credits,
            Semester: formData.Semester,
            Track_id: formData.Track_id,
        };

        try {
            await axios.put(`http://localhost:5000/electives/${formData.selectedElectiveToUpdate}`, data);
            alert('Elective updated successfully');
            onSave();
        } catch (error) {
            console.error('Error updating elective:', error);
            alert('Error updating elective');
        }
    };

    const handleDeleteElective = async () => {
        try {
            await axios.delete(`http://localhost:5000/electives/${formData.selectedElectiveToUpdate}`);
            alert('Elective deleted successfully');
            onSave();
        } catch (error) {
            console.error('Error deleting elective:', error);
            alert('Error deleting elective');
        }
    };

    return (
        <div className="overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Edit Data</h2>
                </div>

                {/* Step 1: Edit Option Buttons (Department, Category, Track, Elective) */}
                <div className="button-container">
                    <button onClick={() => handleEditButtonClick("Department")}>Edit Department</button>
                    <button onClick={() => handleEditButtonClick("Category")}>Edit Category</button>
                    <button onClick={() => handleEditButtonClick("Track")}>Edit Track</button>
                    <button onClick={() => handleEditButtonClick("Elective")}>Edit Elective</button>
                </div>

                {/* Step 2: Show Action Buttons (Add, Update, Delete) when an Edit button is clicked */}
                {modalType && !actionType && (
                    <div className="action-container">
                        <button onClick={() => handleActionClick("Add")}>Add</button>
                        <button onClick={() => handleActionClick("Update")}>Update</button>
                        <button onClick={() => handleActionClick("Delete")}>Delete</button>
                    </div>
                )}

                {/* Step 3: Render input fields based on selected Edit and Action */}
                {modalType === "Department" && actionType && (
                    <form>
                        {/* Add Department Form */}
                        {actionType === "Add" && (
                            <>
                                <label>
                                    Department Name:
                                    <input
                                        type="text"
                                        name="department_name"
                                        value={formData.department_name}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <button type="button" onClick={handleAddDepartment}>Add Department</button>
                            </>
                        )}

                        {/* Update/Delete Department Form */}
                        {actionType === "Update" && (
                            <>
                                <label>
                                    Select Department to Update:
                                    <select
                                        name="selectedDepartmentToUpdate"
                                        value={formData.selectedDepartmentToUpdate}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select a department</option>
                                        {departments.map(department => (
                                            <option key={department.department_id} value={department.department_id}>
                                                {department.department_name}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label>
                                    New Department Name:
                                    <input
                                        type="text"
                                        name="department_name"
                                        value={formData.department_name}
                                        onChange={handleInputChange}
                                    />
                                </label>

                                <button type="button" onClick={handleUpdateDepartment}>Update Department</button>
                            </>
                        )}

                        {actionType === "Delete" && (
                            <>
                                <label>
                                    Select Department to Delete:
                                    <select
                                        name="selectedDepartmentToUpdate"
                                        value={formData.selectedDepartmentToUpdate}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select a department</option>
                                        {departments.map(department => (
                                            <option key={department.department_id} value={department.department_id}>
                                                {department.department_name}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <button type="button" onClick={handleDeleteDepartment}>Delete Department</button>
                            </>
                        )}
                    </form>
                )}

                {modalType === "Category" && actionType && (
                    <form>
                        {/* Add Category Form */}
                        {actionType === "Add" && (
                            <>
                                <label>
                                    Category Name:
                                    <input
                                        type="text"
                                        name="category_name"
                                        value={formData.category_name}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <button type="button" onClick={handleAddCategory}>Add Category</button>
                            </>
                        )}

                        {/* Update/Delete Category Form */}
                        {actionType === "Update" && (
                            <>
                                <label>
                                    Select Category to Update:
                                    <select
                                        name="selectedCategoryToUpdate"
                                        value={formData.selectedCategoryToUpdate}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map(category => (
                                            <option key={category.category_id} value={category.category_id}>
                                                {category.category_name}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label>
                                    New Category Name:
                                    <input
                                        type="text"
                                        name="category_name"
                                        value={formData.category_name}
                                        onChange={handleInputChange}
                                    />
                                </label>

                                <button type="button" onClick={handleUpdateCategory}>Update Category</button>
                            </>
                        )}

                        {actionType === "Delete" && (
                            <>
                                <label>
                                    Select Category to Delete:
                                    <select
                                        name="selectedCategoryToUpdate"
                                        value={formData.selectedCategoryToUpdate}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map(category => (
                                            <option key={category.category_id} value={category.category_id}>
                                                {category.category_name}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <button type="button" onClick={handleDeleteCategory}>Delete Category</button>
                            </>
                        )}
                    </form>
                )}

                {/* Track Form */}
                {modalType === "Track" && actionType && (
                    <form>
                        {actionType === "Add" && (

                            <>
                                <label>
                                    Track Name:
                                    <input
                                        type="text"
                                        name="Track_Name"
                                        value={formData.Track_Name || ''}
                                        onChange={handleInputChange}
                                    />
                                </label>

                                {/* Category Dropdown */}
                                <label>
                                    Select Category:
                                    <select
                                        name="category_id"
                                        value={formData.category_id || ""}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((category) => (
                                            <option key={category.category_id} value={category.category_id}>
                                                {category.category_name}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                {/* Multi-select dropdown for departments */}
                                <label>
                                    Select Departments:
                                    <select
                                        multiple
                                        value={formData.selectedDepartments || []}
                                        onChange={handleDepartmentSelect}
                                        style={{ width: '100%', height: '120px' }}
                                    >
                                        {departments.map((department) => (
                                            <option key={department.department_id} value={department.department_id}>
                                                {department.department_name}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <button type="button" onClick={handleAddTrack}>Add Track</button>
                            </>
                        )}
                    </form>
                )}

                {modalType === "Elective" && actionType && (
                    <form>
                        {/* Add Elective Form */}
                        {actionType === "Add" && (
                            <>
                                <label>
                                    Select Track:
                                    <select
                                        name="Track_id"
                                        value={formData.Track_id}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Track</option>
                                        {tracks.map(track => (
                                            <option key={track.Track_id} value={track.Track_id}>
                                                {track.Track_Name}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label>
                                    Elective Name:
                                    <input
                                        type="text"
                                        name="Elective_Name"
                                        value={formData.Elective_Name}
                                        onChange={handleInputChange}
                                    />
                                </label>

                                <label>
                                    Course Code:
                                    <input
                                        type="text"
                                        name="Course_Code"
                                        value={formData.Course_Code}
                                        onChange={handleInputChange}
                                    />
                                </label>

                                <label>
                                    Credits:
                                    <input
                                        type="number"
                                        name="Credits"
                                        value={formData.Credits}
                                        onChange={handleInputChange}
                                    />
                                </label>

                                <label>
                                    Semester:
                                    <input
                                        type="text"
                                        name="Semester"
                                        value={formData.Semester}
                                        onChange={handleInputChange}
                                    />
                                </label>

                                <button type="button" onClick={handleAddElective}>Add Elective</button>
                            </>
                        )}

                        {/* Update/Delete Elective Form */}
                        {actionType === "Update" && (
                            <>
                                <label>
                                    Select Track:
                                    <select
                                        name="Track_id"
                                        value={formData.Track_id}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Track</option>
                                        {tracks.map(track => (
                                            <option key={track.Track_id} value={track.Track_id}>
                                                {track.Track_Name}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                {formData.Track_id && (
                                    <>
                                        <label>
                                            Select Elective to Update:
                                            <select
                                                name="selectedElectiveToUpdate"
                                                value={formData.selectedElectiveToUpdate}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select Elective</option>
                                                {electives
                                                    .filter(elective => elective.Track_id === formData.Track_id)
                                                    .map(elective => (
                                                        <option key={elective.Elective_Number} value={elective.Elective_Number}>
                                                            {elective.Elective_Name} - {elective.Course_Code}
                                                        </option>
                                                    ))}
                                            </select>
                                        </label>

                                        <label>
                                            Elective Name:
                                            <input
                                                type="text"
                                                name="Elective_Name"
                                                value={formData.Elective_Name}
                                                onChange={handleInputChange}
                                            />
                                        </label>

                                        <label>
                                            Course Code:
                                            <input
                                                type="text"
                                                name="Course_Code"
                                                value={formData.Course_Code}
                                                onChange={handleInputChange}
                                            />
                                        </label>

                                        <label>
                                            Credits:
                                            <input
                                                type="number"
                                                name="Credits"
                                                value={formData.Credits}
                                                onChange={handleInputChange}
                                            />
                                        </label>

                                        <label>
                                            Semester:
                                            <input
                                                type="text"
                                                name="Semester"
                                                value={formData.Semester}
                                                onChange={handleInputChange}
                                            />
                                        </label>

                                        <button type="button" onClick={handleUpdateElective}>Update Elective</button>
                                    </>
                                )}
                            </>
                        )}

                        {actionType === "Delete" && (
                            <>
                                <label>
                                    Select Elective to Delete:
                                    <select
                                        name="selectedElectiveToUpdate"
                                        value={formData.selectedElectiveToUpdate}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Elective</option>
                                        {electives
                                            .filter(elective => elective.Track_id === formData.Track_id)
                                            .map(elective => (
                                                <option key={elective.Elective_Number} value={elective.Elective_Number}>
                                                    {elective.Elective_Name} - {elective.Course_Code}
                                                </option>
                                            ))}
                                    </select>
                                </label>

                                <button type="button" onClick={handleDeleteElective}>Delete Elective</button>
                            </>
                        )}
                    </form>
                )}

                <div className="modal-footer">
                    <button type="button" onClick={onClose}>Close</button>
                </div>
            </div>
        </div >
    );
};

export default EditModal;

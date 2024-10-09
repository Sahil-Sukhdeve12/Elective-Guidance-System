import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/category.css'; // Import the CSS file for custom styles

const Category = ({ setSelectedCategory, setTracks }) => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/categories');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Failed to load categories. Please try again later.');
            }
        };

        fetchCategories();
    }, []);
    
    const handleCategoryChange = async (event) => {
        const categoryId = event.target.value;
        setSelectedCategory(categoryId); // Set the selected category ID

        // Fetch tracks for the selected category
        try {
            const response = await fetch(`http://localhost:5000/api/tracks?categoryId=${categoryId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTracks(data); // Update the tracks state in the parent component
        } catch (error) {
            console.error('Error fetching tracks:', error);
            setError('Failed to load tracks. Please try again later.');
        }
    };


    return (
        <div>
            <div className="category-container">
                <h1 className="text-center mb-4 no-margin category-title">Select the Elective Category</h1>
                {error && <div className="alert alert-danger text-center">{error}</div>}
                <form className="text-center">
                    <div className="form-group">
                        <label htmlFor="categorySelect">Choose a Category:</label>
                        <select
                            id="categorySelect"
                            className="form-control"
                            onChange={handleCategoryChange}
                        >
                            <option value="" disabled>Select a Category</option>
                            {categories.length > 0 ? (
                                categories.map((category) => (
                                    <option key={category.category_id} value={category.category_id}>
                                        {category.category_name}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No categories available</option>
                            )}
                        </select>
                    </div>
                    <Link to="/domain">
                        <button type="button" className="btn btn-primary mt-4" disabled={!selectedCategoryId}>
                            Next
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};
Category.propTypes = {
    setSelectedCategory: PropTypes.func.isRequired,
};

export default Category;

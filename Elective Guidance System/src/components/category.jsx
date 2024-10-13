import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styling/category.css'; // Ensure you import your CSS file

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSelect = () => {
        navigate(`/domain/${selectedCategory}`);
    };

    return (
        <div className="category-container">
            <h1 className="category-title">Select a Category</h1>
            <select
                className="form-select custom-select" // Add a custom class for styling
                onChange={(e) => setSelectedCategory(e.target.value)}
                value={selectedCategory}
            >
                <option value="">--Select a Category--</option>
                {categories.map((category) => (
                    <option key={category.category_id} value={category.category_id}>
                        {category.category_name}
                    </option>
                ))}
            </select>
            <button className="btn btn-primary" onClick={handleSelect} disabled={!selectedCategory}>
                Go to Domain
            </button>
        </div>
    );
};

export default Category;

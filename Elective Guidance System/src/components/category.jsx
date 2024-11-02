import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styling/category.css'; // Import your CSS file

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
            <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory} className="custom-select">
                <option value="">--Select a Category--</option>
                {categories.map((category) => (
                    <option key={category.category_id} value={category.category_id}>
                        {category.category_name}
                    </option>
                ))}
            </select>
            <button onClick={handleSelect} disabled={!selectedCategory} className="btn-primary">
                Go to Domain
            </button>
        </div>
    );
};

export default Category;

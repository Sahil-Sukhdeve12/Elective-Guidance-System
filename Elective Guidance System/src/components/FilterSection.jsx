import React from 'react';

const FilterSection = ({ filters, setFilters, uniqueDegrees, uniqueCollegeNames, uniqueDepartments, uniqueSemesters, uniqueSections, applyFilters }) => {
    return (
        <div className="filter-section">
            <label>
                Degree:
                <select value={filters.degree} onChange={(e) => setFilters({ ...filters, degree: e.target.value })}>
                    <option value="">All</option>
                    {uniqueDegrees.map((degree, index) => (
                        <option key={index} value={degree}>{degree}</option>
                    ))}
                </select>
            </label>

            <label>
                College Name:
                <select value={filters.collegeName} onChange={(e) => setFilters({ ...filters, collegeName: e.target.value })}>
                    <option value="">All</option>
                    {uniqueCollegeNames.map((college, index) => (
                        <option key={index} value={college}>{college}</option>
                    ))}
                </select>
            </label>

            <label>
                Department:
                <select value={filters.department} onChange={(e) => setFilters({ ...filters, department: e.target.value })}>
                    <option value="">All</option>
                    {uniqueDepartments.map((department, index) => (
                        <option key={index} value={department}>{department}</option>
                    ))}
                </select>
            </label>

            <label>
                Semester:
                <select value={filters.sem} onChange={(e) => setFilters({ ...filters, sem: e.target.value })}>
                    <option value="">All</option>
                    {uniqueSemesters.map((sem, index) => (
                        <option key={index} value={sem}>{sem}</option>
                    ))}
                </select>
            </label>

            <label>
                Section:
                <select value={filters.section} onChange={(e) => setFilters({ ...filters, section: e.target.value })}>
                    <option value="">All</option>
                    {uniqueSections.map((section, index) => (
                        <option key={index} value={section}>{section}</option>
                    ))}
                </select>
            </label>

            {/* Class Roll Number Range Filters */}
            <label>
                Class Roll No Range:
                <input type="number" placeholder="Min" 
                    value={filters.classRollNoRange.min} 
                    onChange={(e) => setFilters({ ...filters, classRollNoRange: { ...filters.classRollNoRange, min: e.target.value } })} 
                />
                <input type="number" placeholder="Max" 
                    value={filters.classRollNoRange.max} 
                    onChange={(e) => setFilters({ ...filters, classRollNoRange: { ...filters.classRollNoRange, max: e.target.value } })} 
                />
            </label>

            <button onClick={applyFilters}>Apply Filters</button>
        </div>
    );
};

export default FilterSection;

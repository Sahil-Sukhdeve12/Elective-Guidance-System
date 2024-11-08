import React from 'react';

const FilterSection = ({ filters, setFilters, clearFilters, getDepartmentName, uniqueDepartments, uniqueSemesters, uniqueSections, applyFilters, tracks,  }) => {

    const handleDepartmentChange = (e) => {
        try {
            const department = e.target.value;
            setFilters({ ...filters, department: department });
        } catch (error) {
            console.error('Error handling department change:', error);
        }
    };

    const handleSemesterChange = (e) => {
        try {
            const semester = e.target.value;
            setFilters({ ...filters, semester: semester });
        } catch (error) {
            console.error('Error handling semester change:', error);
        }
    };

    const handleSectionChange = (e) => {
        try {
            const section = e.target.value;
            setFilters({ ...filters, section: section });
        } catch (error) {
            console.error('Error handling section change:', error);
        }
    };

    const handleClassRollNoRangeChange = (minMax, value) => {
        try {
            setFilters({
                ...filters,
                classRollNoRange: {
                    ...filters.classRollNoRange,
                    [minMax]: value
                }
            });
        } catch (error) {
            console.error(`Error handling class roll no range change (${minMax}):`, error);
        }
    };

    const handleElectiveTrackChange = (e, trackType) => {
        try {
            const trackValue = e.target.value;
            setFilters({ ...filters, [trackType]: trackValue });
        } catch (error) {
            console.error(`Error handling elective track change for ${trackType}:`, error);
        }
    };

    const handleElectiveChange = (e, electiveType) => {
        try {
            const electiveValue = e.target.value;
            setFilters({ ...filters, [electiveType]: electiveValue });
        } catch (error) {
            console.error(`Error handling elective change for ${electiveType}:`, error);
        }
    };

    return (
        <div className="filter-section">
            <div className="inputs-container">
                <label>
                    Department:
                    <select value={filters.department} onChange={handleDepartmentChange}>
                        <option value="">All</option>
                        {uniqueDepartments.length > 0 ? (
                            uniqueDepartments.map((departmentId, index) => (
                                <option key={index} value={departmentId}>
                                    {getDepartmentName(departmentId)} {/* Show the department name */}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>No departments available</option>
                        )}
                    </select>
                </label>

                <label>
                    Semester:
                    <select value={filters.semester} onChange={handleSemesterChange}>
                        <option value="">All</option>
                        {uniqueSemesters.length > 0 ? (
                            uniqueSemesters.map((sem, index) => (
                                <option key={index} value={sem}>{sem}</option>
                            ))
                        ) : (
                            <option value="" disabled>No semesters available</option>
                        )}
                    </select>
                </label>

                <label>
                    Section:
                    <select value={filters.section} onChange={handleSectionChange}>
                        <option value="">All</option>
                        {uniqueSections.length > 0 ? (
                            uniqueSections.map((section, index) => (
                                <option key={index} value={section}>{section}</option>
                            ))
                        ) : (
                            <option value="" disabled>No sections available</option>
                        )}
                    </select>
                </label>

                {/* Class Roll Number Range Filters */}
                <label>
                    Class Roll No Range:
                    <input 
                        type="number" 
                        placeholder="Min" 
                        value={filters.classRollNoRange.min}
                        onChange={(e) => handleClassRollNoRangeChange('min', e.target.value)}
                    />
                    <input 
                        type="number" 
                        placeholder="Max" 
                        value={filters.classRollNoRange.max}
                        onChange={(e) => handleClassRollNoRangeChange('max', e.target.value)}
                    />
                </label>

                {/* Elective Filters 
                    Open Elective:
                    <select value={filters.openElective} onChange={(e) => handleElectiveChange(e, 'openElective')}>
                        <option value="">All</option>
                        {electives.openElectives ? (
                            electives.openElectives.map((elective, index) => (
                                <option key={index} value={elective}>{elective}</option>
                            ))
                        ) : (
                            <option value="" disabled>No Open Electives available</option>
                        )}
                    </select>
                </label>

                <label>
                    Humanities Elective:
                    <select value={filters.humanitiesElective} onChange={(e) => handleElectiveChange(e, 'humanitiesElective')}>
                        <option value="">All</option>
                        {electives.humanitiesElectives ? (
                            electives.humanitiesElectives.map((elective, index) => (
                                <option key={index} value={elective}>{elective}</option>
                            ))
                        ) : (
                            <option value="" disabled>No Humanities Electives available</option>
                        )}
                    </select>
                </label>

                <label>
                    Department Elective:
                    <select value={filters.departmentElective} onChange={(e) => handleElectiveChange(e, 'departmentElective')}>
                        <option value="">All</option>
                        {electives.departmentElectives ? (
                            electives.departmentElectives.map((elective, index) => (
                                <option key={index} value={elective}>{elective}</option>
                            ))
                        ) : (
                            <option value="" disabled>No Department Electives available</option>
                        )}
                    </select>
                </label>
                */}
            </div>

            <div className="buttons-container">
                <button onClick={applyFilters}>Apply Filters</button>
                <button onClick={clearFilters}>Clear Filters</button>
            </div>
        </div>
    );
};

export default FilterSection;

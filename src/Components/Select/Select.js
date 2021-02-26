import React from 'react';
import Select from 'react-select';

export const MySelect = ({
    label,
    options = [],
    defaultValue = "",
    handleChange,
    handleBlur
}) => (
        <div style={{ margin: '1rem 0' }}>
            <label htmlFor="color">{label}</label>
            <Select
                className="editable-select"
                classNamePrefix="select"
                defaultValue={defaultValue}
                isClearable={true}
                isSearchable={true}
                name="select"
                options={options}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </div>)
import React from 'react';
import Select from 'react-select';

export const SingleSelect = ({ onChange, onBlur, defaultValue, options, type }) => {
    const handleChange = value => {
        if (value === defaultValue) { return }
        // this is going to call setFieldValue and manually update values.topcis
        onChange(type, value);
    };

    const handleBlur = (value) => {
        if (value === defaultValue) { return }
        // this is going to call setFieldTouched and manually update touched.topcis
        onBlur(type, true);
    };

    return (
        <div style={{ margin: '1rem 0' }}>
            <label htmlFor="color">Topics (select at least 3) </label>
            <Select
                className="editable-select"
                classNamePrefix="select"
                defaultValue={defaultValue}
                isClearable={true}
                isSearchable={true}
                name="assignee"
                options={options}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </div>
    );
}

export const MultiSelect = ({ onChange, onBlur, options, type }) => {
    const handleChange = value => {
        if (options.length === value.length &&
            options.every((val, index) => val === value[index])) { return }
        // this is going to call setFieldValue and manually update values.topcis
        onChange(type, value);
    };

    const handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched.topcis
        onBlur(type, true);
    };

    return (
        <div style={{ margin: '1rem 0' }}>
            <label htmlFor="color">Topics (select at least 3) </label>
            <Select
                className="editable-select"
                classNamePrefix="select"
                defaultValue={options.length > 0 ? options : []}
                isClearable={true}
                isSearchable={true}
                name="assignee"
                options={options}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </div>
    );
}
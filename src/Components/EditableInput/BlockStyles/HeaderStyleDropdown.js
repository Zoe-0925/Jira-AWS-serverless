import React from "react";
const HeaderStyleDropdown = ({ onToggle, active, headerOptions }) => {



    return (
        <select value={active} onChange={e => onToggle(e.target.value)}>
            <option value="">Header Levels</option>
            {headerOptions.map(heading => {
                return (
                    <option key={heading.label} value={heading.style}>
                        {heading.label}
                    </option>
                )
            })}
        </select>
    )
}

export default HeaderStyleDropdown
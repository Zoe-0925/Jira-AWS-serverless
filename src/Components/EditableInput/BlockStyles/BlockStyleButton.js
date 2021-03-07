import React from "react"

const BlockStyleButton = ({ onToggle, style, active, label }) => {
    const handleToggle = (e) => {
        e.preventDefault()
        onToggle(style)
    }

    let className = "RichEditor-styleButton"
    if (active) {
        className += " RichEditor-activeButton"
    }

    return (
        <button>
            <span className={className} onClick={handleToggle}>
                {label}
            </span>
        </button>
    );
}

export default BlockStyleButton
import React from "react"
import Button from "@material-ui/core/Button"

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
        <Button className="rich-text-editor-btn">
            <span className={className} onClick={handleToggle}>
                {label}
            </span>
        </Button>
    );
}

export default BlockStyleButton
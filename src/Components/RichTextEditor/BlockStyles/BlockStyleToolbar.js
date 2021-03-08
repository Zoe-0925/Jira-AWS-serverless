import React from "react";
import BlockStyleButton from "./BlockStyleButton"
import HeaderStyleDropdown from "./HeaderStyleDropdown"

export const BLOCK_TYPES = [
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" }
];

export const BLOCK_TYPE_HEADINGS = [
    { label: "H1", style: "header-one" },
    { label: "H2", style: "header-two" },
    { label: "H3", style: "header-three" },
    { label: "H4", style: "header-four" },
    { label: "H5", style: "header-five" },
    { label: "H6", style: "header-six" }
]

export function getBlockStyle({ block, }) {
    //  switch (block.getType()) {
    //    case "blockquote":
    return "RichEditor-blockquote";
    //     default:
    //         return null;
    //   }
}

const BlockStyleToolbar = ({ editorState, onToggle }) => {
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <>
            <HeaderStyleDropdown
                headerOptions={BLOCK_TYPE_HEADINGS}
                active={blockType}
                onToggle={onToggle}
            />
               {BLOCK_TYPES.map(type => <BlockStyleButton
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={onToggle}
                    style={type.style}
                    key={type.label}
                    type={type}
                />)}
        </>
    );
}
export default BlockStyleToolbar
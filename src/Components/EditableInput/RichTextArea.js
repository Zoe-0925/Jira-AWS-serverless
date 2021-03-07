import React from "react"
import { Editor, RichUtils } from "draft-js";
import { Row, Col } from 'reactstrap';
import BlockStyleToolbar, { getBlockStyle } from "./BlockStyles/BlockStyleToolbar";

const RichTextArea = ({ editorState, setEditorState }) => {

    const handleKeyCommand = command => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState)
            return "handled";
        }
        return "not-handled";
    };

    const onUnderlineClick = () => {
        setEditorState(
            RichUtils.toggleInlineStyle(editorState, "UNDERLINE")
        );
    };

    const onBoldClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
    };

    const onItalicClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
    };

    const onStrikeThroughClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH"));
    };

    const toggleBlockType = (blockType) => {
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    };


    return (
        <div className="rich-text-editor">
            <Row>
                <button className="rich-text-editor-btn" onClick={onUnderlineClick}>U</button>
                <button className="rich-text-editor-btn" onClick={onBoldClick}><b>B</b></button>
                <button className="rich-text-editor-btn" onClick={onItalicClick}><em>I</em></button>
                <button className="strikethrough" onClick={onStrikeThroughClick}> Strike through</button>
                <BlockStyleToolbar
                    editorState={editorState}
                    onToggle={toggleBlockType}
                />
            </Row>

            <Editor
                editorState={editorState}
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
                blockStyleFn={getBlockStyle}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
            />
        </div>)
}

export default RichTextArea


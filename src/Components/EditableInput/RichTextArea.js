import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const RichTextEditor = ({ editorState, onClick, setEditorState, readOnly = true, onBlur }) => (
    <div className="rich-text-editor" onClick={onClick}>
        <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={setEditorState}
            readOnly={readOnly}
            toolbarHidden={readOnly}
            onBlur={onBlur}
        />
        
    </div>
)

export default RichTextEditor
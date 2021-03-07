import { Editor, EditorState, RichUtils } from "draft-js";

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
        setEditorState(
            RichUtils.toggleInlineStyle(editorState, "ITALIC")
        );
    };

    return (
        <>
            <Editor editorState={editorState} onChange={setEditorState} />
        </>)
}

export default RichTextArea


/**
    const [editorState, setEditorState] = useState(
        () => {
            if (text === "") { EditorState.createEmpty() }
            else { EditorState.createWithContent(convertFromRaw(JSON.parse(text))) }
        });


 */
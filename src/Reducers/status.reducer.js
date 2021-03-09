import {
    CREATE_STATUS, DELETE_STATUS,
    APPEND_STATUS, MOVE_ISSUE, APPEND_NEW_ISSUE,
    DELETE_ISSUE_FROM_STATUS, UPDATE_STATUS_ATTRIBUTE
} from "../Actions/status.actions"

const initialState = {
    status: []
}

export default function StatusReducer(state = initialState, action) {
    let newState = { ...state }
    let status
    switch (action.type) {
        case CREATE_STATUS:
            newState.status = [...newState.status, action.data]
            return { status: [...newState.status] }
        case UPDATE_STATUS_ATTRIBUTE:
            status = newState.status.find(aStatus => aStatus._id === action._id)
            status[action.attribute] = action.value
            return { status: [...newState.status] }
        case APPEND_NEW_ISSUE:
            status = newState.status.find(aStatus => aStatus._id === action.status)
            status.issues = [...status.issues, action.issue]
            return { status: [...newState.status] }
        case MOVE_ISSUE:
            let sourceIssues = newState.status[action.sourceIndex].issues
            let destinationIssues = newState.status[action.destinationIndex].issues
            const [removedToMove] = sourceIssues.splice(action.startIndex, 1);
            destinationIssues.splice(action.sendIndex, 0, removedToMove)
            return { status: [...newState.status] }
        case APPEND_STATUS:
            return { status: action.data }
        case DELETE_ISSUE_FROM_STATUS:
            newState.status.find(aStatus => aStatus._id === action.statusId).issues.filter(id => id !== action.issueId)
            return { status: [...newState.status] }
        case "CLEAR_STATUS":
            return initialState
        default:
            return state;
    }
};


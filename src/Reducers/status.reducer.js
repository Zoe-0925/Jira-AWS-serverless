import {
    CREATE_STATUS, DELETE_STATUS,
   UPDATE_STATUS_NAME, APPEND_STATUS, MOVE_ISSUES,
    DELETE_ISSUE_FROM_STATUS,  UPDATE_ISSUE_ORDER
} from "../Actions/status.actions"

/** 
const status = new Map()
status.set("1", { _id: "1", name: "TO DO", issues: ["hdkahdjaskdh"] })
status.set("2", { _id: "2", name: "IN PROGRESS", issues: [] })
status.set("3", { _id: "3", name: "DONE", issues: [] })
status.set("4", { _id: "4", name: "TEST", issues: [] })

const testState = {
    status: status,
}*/

const initialState = {
    status: new Map(),
}

export default function StatusReducer(state = initialState, action) {
    let newState = Object.assign({}, state)
    let status
    switch (action.type) {
        case CREATE_STATUS:
            newState.status.set(action.data._id, action.data)
            return newState
        case DELETE_STATUS:
            newState.status.detele(action.id)
            return newState
        case UPDATE_STATUS_NAME:
            status = newState.status.get(action.data._id)
            status.name = action.data.name
            newState.status.set(action.data._id, status)
            return newState
        case UPDATE_ISSUE_ORDER:
            status = newState.status.get(action._id)
            status.issues = action.value
            newState.status.set(action._id, status)
            return newState
        case MOVE_ISSUES:
            let sourceStatus = newState.status.get(action.source._id)
            sourceStatus.issues = action.source.value
            let destinationStatus = newState.status.get(action.destination._id)
            destinationStatus.issues = action.destination.value
            newState.status.set(action.source._id, sourceStatus)
            newState.status.set(action.destination._id, destinationStatus)
            return newState
        case APPEND_STATUS:
            action.data.map(each => newState.status.set(each._id, each))
            return newState
        case DELETE_ISSUE_FROM_STATUS:
            const newIssueList = newState.status.get(action.statusId).issues.filter(id => id !== action.issueId)
            newState.status.get(action.statusId).issues = newIssueList
            return newState
        case "DELETE_PROJECT":
            return initialState
        case "CLEAR":
            return initialState
        default:
            return state;
    }
};


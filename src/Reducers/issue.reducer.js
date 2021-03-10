import {
    DELETE_TASK,  DELETE_EPIC, UPDATE_EPIC, ADD_TASK_TO_EPIC, REMOVE_TASK_FROM_EPIC, APPEND_ISSUES, CREATE_ISSUE,
    UPDATE_TASK_ATTRIBUTE

} from "../Actions/issue.actions"
const { Map } = require('immutable');

const initialState = {
    tasks: Map(), //Map()
    epics: []
}

export default function IssueReducer(state = initialState, action) {
    let newState = { ...state }
    let task
    switch (action.type) {
        case APPEND_ISSUES:
            newState.tasks = Map(action.data.tasks.map(each => [each._id, each])) || Map()
            newState.epics = action.data.epics || []
            return {
                tasks: newState.tasks, //Map()
                epics: newState.epics
            }
        case CREATE_ISSUE:
            if (action.data.issueType === "task") {
                newState.tasks = newState.tasks.merge({ [action.data._id]: [action.data] })
            }
            if (action.data.issueType === "epic") {
                newState.epics.push(action.data)
            }
            return {
                tasks: newState.tasks, //Map()
                epics: newState.epics
            }
        case DELETE_TASK:
            newState.tasks.delete(action.id)
            return {
                tasks: newState.tasks, //Map()
                epics: newState.epics
            }
        case DELETE_EPIC:
            newState.epics.filter(item => item._id !== action.id)
            return {
                tasks: newState.tasks, //Map()
                epics: newState.epics
            }
        case UPDATE_TASK_ATTRIBUTE:
            task = newState.tasks.get(action.id)
            task[action.key] = action.value
            task.updatedAt = action.updatedAt
            newState.tasks.set(action.id, task)
            return {
                tasks: newState.tasks, //Map()
                epics: newState.epics
            }
        /** 
    case UPDATE_ISSUE_AFTER_DELETE_STATUS:
        newState.tasks.forEach((value, key) => {
            if (action.data.includes(key)) {
                const newValue = { ...value, status: action.id }
                newState.tasks.set(key, newValue)
            }
        })
        return newState*/
        case UPDATE_EPIC:
            newState.epics.filter(item => item._id !== action.data._id)
            newState.epics.push(action.data)
            return {
                tasks: newState.tasks, //Map()
                epics: newState.epics
            }

        case "CLEAR":
            return initialState
        default:
            return state;
    }
};


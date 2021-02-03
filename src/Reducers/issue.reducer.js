import {
    DELETE_TASK, UPDATE_TASK, DELETE_EPIC,
    UPDATE_EPIC, UPDATE_ISSUE_GROUP, DELETE_SUB_TASK,
    ADD_TASK_TO_EPIC, REMOVE_TASK_FROM_EPIC, ADD_SUBTASK_TO_TASK, REMOVE_SUBTASK_FROM_TASK,
    APPEND_ISSUES, CREATE_ISSUE,
    UPDATE_TASK_ATTRIBUTE, UPDATE_ISSUE_AFTER_DELETE_STATUS, REMOVE_LABEL_FROM_ISSUE

} from "../Actions/issue.actions"
const { Map } = require('immutable');

/**
 * 
const issues = new Map()
issues.set("hdkahdjaskdh", {
    _id: "hdkahdjaskdh", summary: "test 1", key: "test key 1", labels: ["test"], assignee: "testUserId",
    issueType: "task", flag: false, reportee: "testUserId", project: "test id", status: "1"
})

const testState = {
    tasks: issues, //Map()
    epics: [],
    subtasks: [],
} */

const initialState = {
    tasks: Map(), //Map()
    epics: [],
    subtasks: [],
}

export default function IssueReducer(state = initialState, action) {
    let newState = { ...state }
    let task
    switch (action.type) {
        case APPEND_ISSUES:
            newState.tasks = Map(action.data.tasks.map(each => [each._id, each])) || Map()
            newState.epics = action.data.epics || []
            newState.subtasks = action.data.subtasks || []
            return newState
        case CREATE_ISSUE:
            //TODO bug
            if (action.data.issueType === "task") {
                newState.tasks = newState.tasks.merge({[action.data._id]: [action.data]})
            }
            if (action.data.issueType === "epic") {
                newState.epics.push(action.data)
            }
            if (action.data.issueType === "subtask") {
                newState.subtasks.push(action.data)
            }
            return newState
        case DELETE_TASK:
            newState.tasks.delete(action.id)
            newState.subtasks.filter(item => item.parent !== action.id)
            return newState
        case DELETE_EPIC:
            //delete the epic
            newState.epics.filter(item => item._id !== action.id)
            return newState
        case DELETE_SUB_TASK:
            //delete the subtask
            newState.subtasks.filter(item => item._id !== action.id)
            // remove the subtask's id from the task
            let parentEpic = newState.issues.find(item => item.subtasks.includes(action.id))
            parentEpic.filter(id => id !== action.id)
            return newState
        case UPDATE_TASK:
            newState.issues.set(action.data._id, action.data)
            return newState
        case UPDATE_TASK_ATTRIBUTE:
            task = newState.issues.get(action._id)
            task[action.key] = action.value
            task.updatedAt = action.updatedAt
            newState.issues.set(action._id, task)
            return newState
        case UPDATE_ISSUE_AFTER_DELETE_STATUS:
            newState.tasks.forEach((value, key) => {
                if (action.data.includes(key)) {
                    const newValue = { ...value, status: action.id }
                    newState.tasks.set(key, newValue)
                }
            })
            return newState
        case REMOVE_LABEL_FROM_ISSUE:
            newState.tasks.forEach((value, key) => {
                if (action.data.includes(key)) {
                    const newValue = { ...value, labels: value.labels.filter(item => item === action.id) }
                    newState.tasks.set(key, newValue)
                }
            })
            return newState
        case ADD_TASK_TO_EPIC:



            return newState
        case REMOVE_TASK_FROM_EPIC:


            return newState

        case ADD_SUBTASK_TO_TASK:



            return newState

        case REMOVE_SUBTASK_FROM_TASK:

            //TODO update the issue and update the epic
            // task = newState.issues.get(action.id)
            //task.epic = action.data
            // newState.issues.set(action.id, issue)
            return newState
        case UPDATE_EPIC:
            newState.epics.filter(item => item._id !== action.data._id)
            newState.epics.push(action.data)
            return newState
        case UPDATE_ISSUE_GROUP:
            const change = newState.issues.get(action.id)
            newState.splice(newState.indexOf(change), 1, action.data);
            return newState




        case "DELETE_PROJECT":
            return initialState
        case "CLEAR":
            return initialState
        default:
            return state;
    }
};

